export class ViewAlive {
  form = document.querySelector(".form");
  sizeSpan = this.form.querySelector(".form__info--size");
  sizeInput = this.form.querySelector(".form__input--size");
  amountSpan = this.form.querySelector(".form__info--amount");
  amountInput = this.form.querySelector(".form__input--amount");

  constructor(controller) {
    this.controller = controller;
    this.sizeHandler();
    this.amountHandler();
  }
  sizeHandler() {
    this.sizeInput.addEventListener("input", (evt) =>
      this.controller.changeSize(evt.target.value)
    );
  }
  amountHandler() {
    this.amountInput.addEventListener("input", (evt) =>
      this.controller.changeAmount(evt.target.value)
    );
  }
  getSize() {
    return this.sizeInput.value;
  }

  getAmount() {
    return this.amountInput.value;
  }

  renderSize(size) {
    this.sizeSpan.textContent = size;
  }

  renderAmount(amount) {
    this.amountSpan.textContent = amount;
  }
}
