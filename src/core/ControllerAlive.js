import { mathRandomWithMin } from "../utils/math";
import { MAX } from "../utils/consts";

export class ControllerAlive {
  #model;
  #view;

  constructor(model, view) {
    this.#model = new model();
    this.#view = new view(this);
    this.init();
  }

  setDelay() {
    return this.#model.getDelay();
  }

  changeRandom() {
    this.#model.setAmount(mathRandomWithMin(this.#model.getSize() * MAX));
    this.#view.renderAmount(this.#model.getAmount());
    this.#view.renderAmountInput(this.#model.getAmount());
  }

  getSize() {
    return this.#model.getSize();
  }

  setMaxAmount() {
    this.#model.setMaxAmount(this.#model.getSize() * this.#model.getSize());
  }

  changeSize(size) {
    this.#model.setSize(size);
    this.#view.renderSize(size);
    this.#model.setMaxAmount(size * 20);
    this.#view.changeMaxAmount(size * 20);
    if (this.#model.getAmount() > this.#model.getMaxAmount()) {
      this.changeAmount(size * 20);
    }
    this.#view.rerenderList(
      this.#model.getSize() * this.#model.getSize(),
      (flag) => this.incrementDecrement(flag)
    );
  }

  changeAmount(amount) {
    this.#model.setAmount(amount, true);
    this.#view.renderAmount(this.#model.getAmount());
    this.#view.renderAmountInput(this.#model.getAmount());
  }

  getAmount() {
    return this.#model.getAmount();
  }

  incrementDecrement(evt) {
    if (evt.target.classList.contains("alive__item--live")) {
      this.changeAmount(this.#model.getAmount() - 1);
      evt.target.classList.remove("alive__item--live");
    } else if (this.#model.getAmount() < this.#model.getMaxAmount()) {
      this.changeAmount(1 + this.#model.getAmount());
      evt.target.classList.add("alive__item--live");
    }
  }

  init() {
    this.#view.renderSizeInput(this.#model.getSize());
    this.#view.renderSize(this.#model.getSize());
    this.#view.renderAmountInput(this.#model.getAmount());
    this.#view.renderAmount(this.#model.getAmount());
    this.#view.changeMaxAmount(this.#model.getMaxAmount());
    this.#view.renderList(
      this.#model.getSize() * this.#model.getSize(),
      (flag) => this.incrementDecrement(flag)
    );
  }
  engine(timerId) {
    const neighbors = [];
    const liveArr = [
      ...this.#view.returnAliveList().querySelectorAll(".alive__item--live"),
    ];
    const size = this.getSize();
    this.setMaxAmount();
    const length = size * size;

    const dieAlive = (indexes, id) => {
      let count = 0;
      indexes.map((index) => {
        liveArr.some((item) => item.dataset.id == index) ? count++ : "";
        neighbors.push(index);
      });
      if (count < 2 || count > 3) {
        this.#view
          .returnAliveList()
          .querySelector(`[data-id='${id}']`)
          .classList.remove("alive__item--live");
      }
    };

    liveArr.map((item) => {
      const id = +item.dataset.id;
      //remove first row, last row, left column and right column
      if (id > size && id <= length - size && (id - 1) % size && id % size) {
        const indexes = [
          id - 1,
          id + 1,
          id - size,
          id + size,
          id + size + 1,
          id + size - 1,
          id - size + 1,
          id - size - 1,
        ];
        dieAlive(indexes, id);

        //first row
      } else if (id < size && id != 1) {
        const indexes = [
          id - 1,
          id + 1,
          length - size + id,
          id + size,
          id + size + 1,
          id + size - 1,
          length - size + id - 1,
          length - size + id + 1,
        ];
        dieAlive(indexes, id);

        //last row
      } else if (id > length - size + 1 && id < length) {
        const indexes = [
          id - 1,
          id + 1,
          id - size,
          id - size + 1,
          id - size - 1,

          length - id,
          length - id + 1,
          length - id + 1,
        ];
        dieAlive(indexes, id);
        //left column
      } else if (
        (id - 1) % size == false &&
        id != 1 &&
        id != length - size + 1
      ) {
        const indexes = [
          id - 1,
          id + 1,
          id - size,
          id + size,
          id - size + 1,
          id + size + 1,
          id + size - 1,
          id + size + size - 1,
        ];
        dieAlive(indexes, id);
        //right column
      } else if (id % size == false && id != size && id != length) {
        const indexes = [
          id - 1,
          id + 1,
          id - size,
          id + size,
          id - size + 1,
          id - size - 1,
          id + size - 1,
          id - size - size + 1,
        ];
        dieAlive(indexes, id);
        //top left
      } else if (id == 1) {
        const indexes = [
          id + 1,
          id + size,
          id + size + 1,
          length - size + 1,
          length - size + 2,
          length,
          size,
          size + size,
        ];
        dieAlive(indexes, id);

        //top right
      } else if (id == size) {
        const indexes = [
          size - 1,
          size + 1,
          size + size,
          size + size - 1,
          length,
          length - size + 1,
          length - 1,
          1,
        ];
        dieAlive(indexes, id);

        //bottom left
      } else if (id == length - size + 1) {
        const indexes = [
          1,
          2,
          id + 1,
          id - 1,
          id - size,
          id - size + 1,
          length - size,
          length,
        ];
        dieAlive(indexes, id);
      } else if (id == length) {
        const indexes = [
          id - 1,
          id - size,
          id - size - 1,
          size - 1,
          size,
          1,
          id - size + 1,
          id - size - size + 1,
        ];
        dieAlive(indexes, id);
      }
    });
    const amount = {};
    neighbors
      .sort((a, b) => a - b)
      .map((item) => {
        if (amount[item] != undefined) {
          ++amount[item];
        } else {
          amount[item] = 1;
        }
      });
    Object.entries(amount).map((live) => {
      if (live[1] >= 3 && live[1] < 4) {
        this.#view
          .returnAliveList()
          .querySelector(`[data-id='${live[0]}']`)
          .classList.add("alive__item--live");
      }
    });
    const newAmount = this.#view
      .returnAliveList()
      .querySelectorAll(".alive__item--live").length;
    this.changeAmount(
      this.#view.returnAliveList().querySelectorAll(".alive__item--live").length
    );
    if (!newAmount) {
      clearInterval(timerId);
      alert("Directed By Robert B. Weide");
      setTimeout(() => location.reload(), 200);
    }
  }
}
