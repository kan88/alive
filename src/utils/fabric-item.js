class FactoryItem {
  constructor() {
    this.template = document
      .querySelector(".template")
      .content.querySelector(".alive__item");
  }

  renderOne(id) {
    const item = this.template.cloneNode(true);
    item.dataset.id = id;
    return item;
  }
}

export const factory = new FactoryItem();
