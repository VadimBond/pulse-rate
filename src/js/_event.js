// handler for products
function handlerProducts(e) {
  e.preventDefault();
  const blockName = e.target.dataset.block;
  const elements = document.querySelectorAll(`.${blockName}`);
  
  for (let i = 0; i < elements.length; i++) {
    elements[i].classList.toggle("hidden");
  }
}

const links = document.querySelectorAll(".product-info__link");
for (let i = 0; i < links.length; i++) {
  links[i].addEventListener("click", handlerProducts);
}

// handler for tabs
function handlerTabs(e) {
  const contentName = e.target.dataset.tab;
  const contentNumber = contentName[contentName.length - 1];
  const contents = document.querySelectorAll(".catalog-content");

  if (!contents[contentNumber-1].matches(".hidden")) {
    return;
  } else {

    tabs[contentNumber-1].classList.add("catalog-tabs__tab--active");
    for (let i = 0; i < tabs.length; i++) {
      if (i == contentNumber - 1) {
        continue;
      } else {
        if (tabs[i].matches(".catalog-tabs__tab--active")) {
          tabs[i].classList.remove("catalog-tabs__tab--active");
        }
      }
    }
        
    contents[contentNumber-1].classList.remove("hidden");
    for (let i = 0; i < contents.length; i++) {
      if (i == contentNumber - 1) {
        continue;
      } else {
        if (!contents[i].matches(".hidden")) {
          contents[i].classList.add("hidden");
        }
      }
    }
  }
}

const tabs = document.querySelectorAll(".catalog-tabs__tab");
for (let i = 0; i < tabs.length; i++) {
  tabs[i].addEventListener("click", handlerTabs);
}
