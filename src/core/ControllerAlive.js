import { mathRandom } from "../utils/math-random";

export class ControllerAlive {
  constructor(model, view) {
    this.model = new model();
    this.view = new view(this);
    this.init();
  }

  changeRandom() {
    this.model.setAmount(mathRandom(this.model.getSize() / 2));
    this.view.renderAmount(this.model.getAmount());
    this.view.renderAmountInput(this.model.getAmount());
  }

  changeSize(size) {
    this.model.setSize(size);
    this.view.renderSize(size);
    this.model.setMaxAmount(size * 2);
    this.view.changeMaxAmount(size * 2);
    if (this.model.getAmount() > this.model.getMaxAmount()) {
      this.changeAmount(size * 2);
    }
  }

  changeAmount(amount) {
    this.model.setAmount(amount);
    this.view.renderAmount(amount);
    this.view.renderAmountInput(amount);
  }

  init() {
    this.view.renderSizeInput(this.model.getSize());
    this.view.renderSize(this.model.getSize());
    this.view.renderAmountInput(this.model.getAmount());
    this.view.renderAmount(this.model.getAmount());
    this.view.changeMaxAmount(this.model.getMaxAmount());
    this.view.renderList(this.model.getMaxAmount());
  }
}
