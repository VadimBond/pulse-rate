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
  // e.preventDefault();
  console.log(e);
  
  const contentName = e.target.dataset.tab;
  console.log(contentName);
  
  // const contents = document.querySelectorAll(`.${contentName}`);
  
  // for (let i = 0; i < contents.length; i++) {
  //   contents[i].classList.toggle("hidden");
  // }
}

const tabs = document.querySelectorAll(".catalog-tabs__tab");
console.log(tabs);


for (let i = 0; i < tabs.length; i++) {
  tabs[i].addEventListener("click", handlerTabs);
}