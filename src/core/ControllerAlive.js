export class ControllerAlive {
  constructor(model, view) {
    this.model = new model();
    this.view = new view(this);
    this.init();
  }

  changeSize(size) {
    this.model.setSize(size);
    this.view.renderSize(size);
  }

  changeAmount(amount) {
    this.model.setAmount(amount);
    this.view.renderAmount(amount);
    console.log("here");
  }

  init() {
    this.model.setSize(this.view.getSize());
    this.view.renderSize(this.model.getSize());
    this.model.setAmount(this.view.getAmount());
    this.view.renderAmount(this.model.getAmount());
  }
}
