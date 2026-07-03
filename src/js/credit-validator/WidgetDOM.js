import CardValidator from './CardValidator.js';

import visaImg from '../../img/visa.png';
import mastercardImg from '../../img/mc.png';
import mirImg from '../../img/mir.png';

export default class WidgetDOM {
  constructor() {
    this.container = null;
    this.form = null;
    this.input = null;
    this.button = null;
    this.validator = new CardValidator();
  }

  render() {
    this.container = document.getElementById("credit-card-validator-widget");

    this.container.innerHTML = `
      <form class="credit-validator">
        <div class="credit-validator__cards">
          <img class="credit-validator__card credit-validator__card--visa" src="${visaImg}" alt="VISA">
          <img class="credit-validator__card credit-validator__card--mastercard" src="${mastercardImg}" alt="MASTERCARD">
          <img class="credit-validator__card credit-validator__card--mir" src="${mirImg}" alt="MIR">
        </div>
        <input class="credit-validator__input" type="text" placeholder="Enter card number...">
        <button class="credit-validator__button" type="submit">Click to validate</button>
      </form>
    `;

    this.form = this.container.querySelector(".credit-validator");
    this.input = this.container.querySelector(".credit-validator__input");
    this.button = this.container.querySelector(".credit-validator__button");
  }

  registerEvents() {
    this.input.addEventListener("input", () => {
      const value = this.input.value;
      const cardType = this.validator.getCardType(value);

      const allCards = this.container.querySelectorAll('.credit-validator__card');
      allCards.forEach(card => card.classList.remove('credit-validator__card--active'));

      if (cardType !== 'unknown') {
        const activeCard = this.container.querySelector(`.credit-validator__card--${cardType}`);
        if (activeCard) {
          activeCard.classList.add('credit-validator__card--active');
        }
      }
    });

    this.form.addEventListener("submit", (event) => {
      event.preventDefault();

      const value = this.input.value;
      const isValid = this.validator.validate(value);

      if (isValid) {
        alert("Карта валидна!");
      } else {
        alert("Ошибка: неверный номер карты!");
      }
    });
  }
}
