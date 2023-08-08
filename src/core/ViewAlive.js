import { factory } from "../utils/fabric-item";

export class ViewAlive {
  form = document.querySelector(".form");
  sizeSpan = this.form.querySelector(".form__info--size");
  sizeInput = this.form.querySelector(".form__input--size");
  amountSpan = this.form.querySelector(".form__info--amount");
  amountInput = this.form.querySelector(".form__input--amount");
  randomButton = document.querySelector(".footer__button--random");
  aliveList = document.querySelector(".alive__list");
  templateLive = document
    .querySelector(".template")
    .content.querySelector(".alive__item");

  constructor(controller) {
    this.controller = controller;
    this.sizeHandler();
    this.amountHandler();
    this.randomHandler();
  }

  sizeHandler() {
    this.sizeInput.addEventListener("input", (evt) =>
      this.controller.changeSize(evt.target.value)
    );
  }

  randomHandler() {
    this.randomButton.addEventListener("click", () =>
      this.controller.changeRandom()
    );
  }

  amountHandler() {
    this.amountInput.addEventListener("input", (evt) =>
      this.controller.changeAmount(evt.target.value)
    );
  }

  changeMaxAmount(max) {
    this.amountInput.max = max;
  }

  renderSize(size) {
    this.sizeSpan.textContent = size;
    size > 50
      ? (this.aliveList.style.maxWidth = `300px`)
      : (this.aliveList.style.maxWidth = `30px`);
  }

  renderAmount(amount) {
    this.amountSpan.textContent = amount;
  }

  renderAmountInput(value) {
    this.amountInput.value = value;
  }

  renderSizeInput(value) {
    this.sizeInput.value = value;
  }

  renderList(count) {
    for (let i = 0; i < count; i++) {
      this.aliveList.appendChild(factory.renderOne(i));
    }
  }
}
