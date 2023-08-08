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
  aliveList = document.querySelector(".alive__list");
  templateLive = document
    .querySelector(".template")
    .content.querySelector(".alive__item");

  constructor(controller) {
    this.controller = controller;
    this.sizeHandler();
    this.amountHandler();
    this.randomHandler();
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

  renderList(count, cb) {
    for (let i = 0; i < count; i++) {
      this.aliveList.appendChild(factory.renderOne(i, cb));
    }
  }

  rerenderList(count, cb) {
    if (count > this.aliveList.childNodes.length) {
      const amount = count - (this.aliveList.childNodes.length - 1);
      for (let i = 0; i < amount; i++) {
        this.aliveList.appendChild(
          factory.renderOne(this.aliveList.childNodes.length, cb)
        );
      }
    } else {
      while (this.aliveList.childNodes.length > count) {
        this.aliveList.removeChild(this.aliveList.firstChild);
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
