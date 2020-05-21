const slider = tns({
  container: '.my-slider',
  items: 1,
  slideBy: 1,
  mouseDrag: true,
  controls: false,
  nav: false,
});

document.querySelector(".arrow--prev").addEventListener("click", function () {
  slider.goTo("prev");
});

document.querySelector(".arrow--next").addEventListener("click", function () {
  slider.goTo("next");
});
