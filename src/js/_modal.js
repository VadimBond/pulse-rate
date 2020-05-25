// modalConsultation
function modalConsultation(e) {
  e.preventDefault();
  const overlay = document.querySelector(".overlay");
  overlay.classList.toggle("hidden");

  const modalName = e.target.dataset.modal;
  const modal = document.querySelector(`#${modalName}`);
  modal.classList.toggle("hidden");
}

const btnsConsultation = document.querySelectorAll("[data-modal=consultation]");

for (let i = 0; i < btnsConsultation.length; i++) {
  btnsConsultation[i].addEventListener("click", modalConsultation);
}

// modalClose
function modalClose(e) {
  const modals = document.querySelectorAll(".modal");
  for (let i = 0; i < modals.length; i++) {
    if (!modals[i].matches(".hidden")) {
      modals[i].classList.toggle("hidden");
    }
  }

  const overlay = document.querySelector(".overlay");
  overlay.classList.toggle("hidden");
}

const btnsClose = document.querySelectorAll(".modal-close");

for (let i = 0; i < btnsClose.length; i++) {
  btnsClose[i].addEventListener("click", modalClose);
}

// modalOrder
function modalOrder(e) {
  e.preventDefault();
  const overlay = document.querySelector(".overlay");
  overlay.classList.toggle("hidden");

  const modal = document.querySelector("#order");
  modal.classList.toggle("hidden");
}

const btnsOrder = document.querySelectorAll(".product-buy__btn");

for (let i = 0; i < btnsOrder.length; i++) {
  btnsOrder[i].addEventListener("click", modalOrder);
}
