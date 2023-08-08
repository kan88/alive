import { mathRandomWithMin } from "../utils/math";
import { MAX } from "../utils/consts";

export class ControllerAlive {
  constructor(model, view) {
    this.model = new model();
    this.view = new view(this);
    this.init();
  }

  changeRandom() {
    this.model.setAmount(mathRandomWithMin(this.model.getSize() * MAX));
    this.view.renderAmount(this.model.getAmount());
    this.view.renderAmountInput(this.model.getAmount());
  }

  changeSize(size) {
    this.model.setSize(size);
    this.view.renderSize(size);
    this.model.setMaxAmount(size * 20);
    this.view.changeMaxAmount(size * 20);
    if (this.model.getAmount() > this.model.getMaxAmount()) {
      this.changeAmount(size * 20);
    }
    this.view.rerenderList(
      this.model.getSize() * this.model.getSize(),
      (flag) => this.incrementDecrement(flag)
    );
  }

  changeAmount(amount) {
    this.model.setAmount(amount);
    this.view.renderAmount(this.model.getAmount());
    this.view.renderAmountInput(this.model.getAmount());
  }

  getAmount() {
    return this.model.getAmount();
  }

  incrementDecrement(flag) {
    flag
      ? this.changeAmount(1 + this.model.getAmount())
      : this.changeAmount(this.model.getAmount() - 1);
  }

  init() {
    this.view.renderSizeInput(this.model.getSize());
    this.view.renderSize(this.model.getSize());
    this.view.renderAmountInput(this.model.getAmount());
    this.view.renderAmount(this.model.getAmount());
    this.view.changeMaxAmount(this.model.getMaxAmount());
    this.view.renderList(this.model.getSize() * this.model.getSize(), (flag) =>
      this.incrementDecrement(flag)
    );
  }
}
