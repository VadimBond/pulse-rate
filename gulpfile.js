// my-gulp
const project_folder = require("path").basename(__dirname),
    source_folder = "src";

const fs = require("fs");

const path = {
  dist: {
    html: project_folder + "/",
    css: project_folder + "/css/",
    js: project_folder + "/js/",
    img: project_folder + "/img/",
    fonts: project_folder + "/fonts/"
  },
  src: {
    html: [source_folder + "/*.html", "!" + source_folder + "/_*.html"],
    css: source_folder + "/scss/style.scss",
    js: source_folder + "/js/script.js",
    img: source_folder + "/img/**/*.{jpg,png,svg,gif,ico,webp}",
    fonts: source_folder + "/fonts/*.*"
  },
  watch: {
    html: source_folder + "/**/*.html",
    css: source_folder + "/scss/**/*.scss",
    js: source_folder + "/js/**/*.js",
    img: source_folder + "/img/**/*.{jpg,png,svg,gif,ico,webp}"
  },
  clean: "./" + project_folder + "/"
};

const { src, dest } = require("gulp"),
    gulp = require("gulp"),
    browser_sync = require("browser-sync").create(),
    file_include = require("gulp-file-include"),
    del = require("del"),
    scss = require("gulp-sass"),
    autoprefixer = require("gulp-autoprefixer"),
    group_media = require("gulp-group-css-media-queries"),
    clean_css = require("gulp-clean-css"),
    rename = require("gulp-rename"),
    uglify = require("gulp-uglify-es").default,
    imagemin = require("gulp-imagemin"),
    webp = require("gulp-webp"),
    webp_html = require("gulp-webp-html"),
    webp_css = require("gulp-webpcss"),
    svg_sprite = require("gulp-svg-sprite"),
    ttf2woff = require("gulp-ttf2woff"),
    ttf2woff2 = require("gulp-ttf2woff2"),
    fonter = require("gulp-fonter"),
    spritesmith = require('gulp.spritesmith');

function browserSync() {
  browser_sync.init({
    server: {
      baseDir: "./" + project_folder + "/"
    },
    port: 3000,
    notify: false
  });
}

function html() {
  return src(path.src.html)
    .pipe(file_include())
    .pipe(webp_html())
    .pipe(dest(path.dist.html))
    .pipe(browser_sync.stream());
}

function css() {
  return src(path.src.css)
    .pipe(
      scss({
        outputStyle: "expanded"
      }).on('error', sass.logError)
    )
    .pipe(group_media())
    .pipe(
      autoprefixer({
        overrideBrowserslist: ["last 2 versions"],
        cascade: true
      })
    )
    .pipe(
      webp_css({
        webpClass: '.webp',
        noWebpClass: '.no-webp'
    }))
    .pipe(dest(path.dist.css))
    .pipe(clean_css({compatibility: 'ie8'}))
    .pipe(
      rename({
        extname: ".min.css"
      })
    )
    .pipe(dest(path.dist.css))
    .pipe(browser_sync.stream());
}

function js() {
  return src(path.src.js)
    .pipe(file_include())
    .pipe(dest(path.dist.js))
    .pipe(uglify())
    .pipe(
      rename({
        extname: ".min.js"
      })
    )
    .pipe(dest(path.dist.js))
    .pipe(browser_sync.stream());
}

function img() {
  return src(path.src.img)
    .pipe(
      webp({
        quality: 70
      })
    )
    .pipe(dest(path.dist.img))
    .pipe(src(path.src.img))
    .pipe(
      imagemin({
        progressive: true,
        svgoPlugins: [{removeViewBox: false}],
        interlaced: true,
        optimizationLevel: 3  // 0 to 7
      })
    )
    .pipe(dest(path.dist.img))
    .pipe(browser_sync.stream());
}

function fonts() {
  src(path.src.fonts)
  .pipe(ttf2woff())
  .pipe(dest(path.dist.fonts))
  return src(path.src.fonts)
  .pipe(ttf2woff2())
  .pipe(dest(path.dist.fonts))
  .pipe(browser_sync.stream());
}

gulp.task("otf2ttf", function() {
  return src([source_folder + "/fonts/*.otf"])
    .pipe(
      fonter({
        formats: ["ttf"]
      })
    )
    .pipe(dest(path.src.fonts));
});

gulp.task('png_sprite', function (cb) {
  const spriteData = src([source_folder + "/img/icons/*.png"])
    .pipe(spritesmith({
      imgName: "sprite.png",
      imgPath: "../img/sprite.png",
      cssName: "_sprite.scss"
	  }));

	spriteData.img.pipe(dest(path.dist.img));
	spriteData.css.pipe(dest([source_folder + "/scss/base/"]));
	cb();
});

gulp.task("svg_sprite", function() {
  return src([source_folder + "/img/sprite/*.svg"])
    .pipe(
      svg_sprite({
        mode: {
          stack: {
            sprite: "../icons/icons.svg",
            // example: true
          }
        }
      })
    )
    .pipe(dest(path.dist.img));
});

function cb() {}

gulp.task("fontStyle", function() {
  let file_content = fs.readFileSync(source_folder + '/scss/_fonts.scss');
  if (file_content == '') {
    fs.writeFile(source_folder + '/scss/_fonts.scss', '', cb);
    return fs.readdir(path.dist.fonts, function (err, items) {
      if (items) {
        let c_fontname;
        for (let i = 0; i < items.length; i++) {
          let fontname = items[i].split('.');
          fontname = fontname[0];
          if (c_fontname != fontname) {
            fs.appendFile(source_folder + '/scss/_fonts.scss', '@include font("' + fontname + '", "' + fontname + '", "400", "normal");\r\n', cb);
          }
          c_fontname = fontname;
        }
      }
    });
  }
});

function watchFiles() {
  gulp.watch([path.watch.html], html);
  gulp.watch([path.watch.css], css);
  gulp.watch([path.watch.js], js);
  gulp.watch([path.watch.img], img);
}

function clean() {
  return del(path.clean);
}

let dist = gulp.series(clean, gulp.parallel(html, css, js, img, fonts));

let watch = gulp.parallel(dist, watchFiles, browserSync);

exports.fonts = fonts;
exports.img = img;
exports.js = js;
exports.css = css;
exports.html = html;
exports.clean = clean;
exports.dist = dist;
exports.watch = watch;
exports.default = watch;
