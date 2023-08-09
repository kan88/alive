import { factory } from "../utils/Factory";
import { mathRandom } from "../utils/math";
import { debounce } from "../utils/debounce";

export class ViewAlive {
  form = document.querySelector(".form");
  sizeSpan = this.form.querySelector(".form__info--size");
  sizeInput = this.form.querySelector(".form__input--size");
  amountSpan = this.form.querySelector(".form__info--amount");
  amountInput = this.form.querySelector(".form__input--amount");
  randomButton = document.querySelector(".footer__button--random");
  playButton = document.querySelector(".footer__button--play");
  reloadButton = document.querySelector(".footer__button--reload");
  aliveList = document.querySelector(".alive__list");
  templateLive = document
    .querySelector(".template")
    .content.querySelector(".alive__item");

  constructor(controller) {
    this.controller = controller;
    this.sizeHandler();
    this.amountHandler();
    this.randomHandler();
    this.playHandler();
    this.reloadHandler();
  }

  sizeHandler() {
    this.sizeInput.addEventListener(
      "input",
      debounce((evt) => {
        this.clearLiveList();
        this.controller.changeAmount(0);
        this.controller.changeSize(+evt.target.value);
      }, 300)
    );
  }

  engine(timerId) {
    const neighbors = [];
    const liveArr = [...this.aliveList.querySelectorAll(".alive__item--live")];
    const size = this.controller.getSize();
    this.controller.setMaxAmount();
    const length = size * size;

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
        indexes.map((index) => neighbors.push(index));

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
        indexes.map((index) => neighbors.push(index));

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
        indexes.map((index) => neighbors.push(index));
        //left column
      } else if ((id - 1) % size && id != 1 && id != length - size + 1) {
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
        indexes.map((index) => neighbors.push(index));
        neighbors.push(id - 1);
        neighbors.push(id + 1);
        neighbors.push(id - size);
        neighbors.push(id + size);
        neighbors.push(id - size + 1);
        neighbors.push(id + size + 1);
        neighbors.push(id + size - 1);
        neighbors.push(id + size + size - 1);
        //right column
      } else if (id % size && id != size && id != length) {
        neighbors.push(id - 1);
        neighbors.push(id + 1);
        neighbors.push(id - size);
        neighbors.push(id + size);
        neighbors.push(id - size - 1);
        neighbors.push(id - size + 1);
        neighbors.push(id + size - 1);
        neighbors.push(id - size - size + 1);
        //top left
      } else if (id == 1) {
        neighbors.push(id + 1);
        neighbors.push(id + size);
        neighbors.push(id + size + 1);
        neighbors.push(length - size + 1);
        neighbors.push(length - size + 2);
        neighbors.push(length);
        neighbors.push(size);
        neighbors.push(size + size);
        //top right
      } else if (id == size) {
        neighbors.push(size - 1);
        neighbors.push(size + 1);
        neighbors.push(size + size);
        neighbors.push(size + size - 1);
        neighbors.push(length);
        neighbors.push(length - size + 1);
        neighbors.push(length - 1);
        neighbors.push(1);
        //bottom left
      } else if (id == length - size + 1) {
        neighbors.push(1);
        neighbors.push(2);
        neighbors.push(id + 1);
        neighbors.push(id - 1);
        neighbors.push(id - size);
        neighbors.push(id - size + 1);
        neighbors.push(length - size);
        neighbors.push(length);
      } else if (id == length) {
        neighbors.push(id - 1);
        neighbors.push(id - size);
        neighbors.push(id - size - 1);
        neighbors.push(size - 1);
        neighbors.push(size);
        neighbors.push(1);
        neighbors.push(id - size + 1);
        neighbors.push(id - size - size + 1);
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
        // console.log(amount);
      });
    this.clearLiveList();
    Object.entries(amount).map((live) => {
      console.log(live);
      if (live[1] >= 3 && live[1] < 4) {
        this.aliveList
          .querySelector(`[data-id='${live[0]}']`)
          .classList.add("alive__item--live");
      }
    });
    // console.log(world);
    const newAmount =
      this.aliveList.querySelectorAll(".alive__item--live").length;
    this.controller.changeAmount(
      this.aliveList.querySelectorAll(".alive__item--live").length
    );
    if (!newAmount) {
      clearInterval(timerId);
      alert("Directed By Robert B. Weide");
      setTimeout(() => location.reload(), 200);
    }
  }

  startAlive() {
    if (this.aliveList.querySelectorAll(".alive__item--live").length == 0) {
      this.playHandler();
      alert("add live on the table");
    } else {
      let timerId = setInterval(() => this.engine(timerId), 1000);

      this.playButton.removeEventListener("click", () => this.startAlive);
    }
  }

  playHandler() {
    this.playButton.addEventListener("click", this.startAlive.bind(this), {
      once: true,
    });
  }

  reloadHandler() {
    this.reloadButton.addEventListener("click", () => {
      location.reload();
    });
  }

  randomHandler() {
    this.randomButton.addEventListener("click", () => {
      this.controller.changeRandom();
      this.clearLiveList();
      this.renderOneAlive(true, this.controller.getAmount());
    });
  }

  amountHandler() {
    this.amountInput.addEventListener(
      "input",
      debounce((evt) => {
        if (+evt.target.value > this.controller.getAmount()) {
          const count = +evt.target.value - this.controller.getAmount();
          this.renderOneAlive(true, count);
        } else {
          const count = this.controller.getAmount() - +evt.target.value;
          this.renderOneAlive(false, count);
        }

        this.controller.changeAmount(+evt.target.value);
      }, 300)
    );
  }

  changeMaxAmount(max) {
    this.amountInput.max = max;
  }

  renderSize(size) {
    this.sizeSpan.textContent = size;
    this.aliveList.style.width = `${size * 10}px`;
    this.aliveList.style.height = `${size * 10}px`;
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

  async renderList(count, cb) {
    for (let i = 1; i <= count; i++) {
      this.aliveList.appendChild(factory.renderOne(i, cb));
    }
  }

  async rerenderList(count, cb) {
    if (count > this.aliveList.childNodes.length) {
      const amount = count - (this.aliveList.childNodes.length - 1);
      for (let i = 0; i < amount; i++) {
        this.aliveList.appendChild(
          factory.renderOne(this.aliveList.childNodes.length, cb)
        );
      }
    } else {
      while (this.aliveList.childNodes.length - 1 > count) {
        this.aliveList.removeChild(this.aliveList.lastChild);
      }
    }
  }

  clearLiveList() {
    [...this.aliveList.querySelectorAll(".alive__item--live")].map((item) =>
      item.classList.remove("alive__item--live")
    );
  }

  renderOneAlive(flag, count) {
    if (flag) {
      for (let i = 0; i < count; i++) {
        this.aliveList
          .querySelectorAll(":not(.alive__item--live)")
          [
            mathRandom(
              this.aliveList.querySelectorAll(":not(.alive__item--live)").length
            )
          ].classList.add("alive__item--live");
      }
    } else {
      for (let i = 0; i < count; i++) {
        const index = mathRandom(
          document.querySelectorAll(".alive__item--live").length
        );

        this.aliveList
          .querySelectorAll(".alive__item--live")
          [index].classList.remove("alive__item--live");
      }
    }
  }
}
