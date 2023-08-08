class Factory {
  #template = document
    .querySelector(".template")
    .content.querySelector(".alive__item");

  renderOne(id, cb) {
    const item = this.#template.cloneNode(true);
    item.dataset.id = id;
    item.addEventListener("click", (evt) => {
      console.log("here");
      if (evt.target.classList.contains("alive__item--live")) {
        cb(false);
        evt.target.classList.remove("alive__item--live");
      } else {
        cb(true);
        evt.target.classList.add("alive__item--live");
      }
    });
    return item;
  }
}

export const factory = new Factory();
