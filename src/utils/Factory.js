class Factory {
  #template = document
    .querySelector(".template")
    .content.querySelector(".alive__item");

  renderOne(id, cb) {
    const item = this.#template.cloneNode(true);
    item.dataset.id = id;
    item.addEventListener("click", (evt) => cb(evt));
    return item;
  }
}

export const factory = new Factory();
