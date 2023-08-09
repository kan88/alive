export class ModelAlive {
  #size = 50;
  #amount = 0;
  #maxWidth = 500;
  #maxAmount = 1000;

  getSize() {
    return this.#size;
  }

  setSize(size) {
    this.#size = size;
  }

  getMaxWidth() {
    return this.#maxWidth;
  }

  setMaxWidth(width) {
    this.#maxWidth = width;
  }

  getMaxAmount() {
    return this.#maxAmount;
  }

  setMaxAmount(amount) {
    this.#maxAmount = amount;
  }

  getAmount() {
    return this.#amount;
  }

  setAmount(amount, arg = false) {
    if (amount <= this.#maxAmount) {
      this.#amount = amount;
    }
  }
}
