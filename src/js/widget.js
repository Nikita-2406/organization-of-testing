import mirLogo from "../img/mir.png";
import visaLogo from "../img/visa.png";
import mastercardLogo from "../img/mastercard.png";
import amexLogo from "../img/amex.png";
import jcbLogo from "../img/jcb.png";
import dinersLogo from "../img/diners.png";
import discoverLogo from "../img/discover.png";
import unionpayLogo from "../img/unionpay.png";

export class Widget {
  constructor(parentElement) {
    this.parentElement = parentElement;
    this.onSubmit = this.onSubmit.bind(this);
    this.showCard = this.showCard.bind(this);
    this.openCards = this.openCards.bind(this);
    this.showCardValidity = this.showCardValidity.bind(this);
  }

  static get markup() {
    return `
      <form class="container">
        <ul class="list_card_image">
          <li><img src="${mirLogo}" alt="mirpay"><div class="curtain"></div></li>
          <li><img src="${visaLogo}" alt="visa"><div class="curtain"></div></li>
          <li><img src="${mastercardLogo}" alt="mastercard"><div class="curtain"></div></li>
          <li><img src="${amexLogo}" alt="americanexp"><div class="curtain"></div></li>
          <li><img src="${jcbLogo}" alt="jcb"><div class="curtain"></div></li>
          <li><img src="${dinersLogo}" alt="diners"><div class="curtain"></div></li>
          <li><img src="${discoverLogo}" alt="discovery"><div class="curtain"></div></li>
          <li><img src="${unionpayLogo}" alt="unionpay"><div class="curtain"></div></li>
        </ul>
        <div class="valid">
          <input type="text" name="" id="" class="entry_field" placeholder="НОМЕР КАРТЫ">
          <input type="submit" value="ПРОВЕРИТЬ ВАЛИДНОСТЬ" class="btn">
        </div>
        <div class="card_validity">
        </div>
      </from>`;
  }

  static get selector() {
    return ".container";
  }

  static get inputSelector() {
    return ".entry_field";
  }

  static get buttonSelector() {
    return ".btn";
  }

  showCardValidity(check) {
    this.checkValidity = this.element.querySelector(".card_validity");
    if (check) {
      this.checkValidity.innerHTML = "Карта прошла валидацию";
    } else {
      this.checkValidity.innerHTML = "Карта не прошла валидацию";
    }
  }
  bindToDom() {
    this.parentElement.innerHTML = Widget.markup;
    this.element = this.parentElement.querySelector(Widget.selector);
    this.submit = this.parentElement.querySelector(Widget.buttonSelector);
    this.input = this.parentElement.querySelector(Widget.inputSelector);

    this.element.addEventListener("submit", this.onSubmit);
  }

  openCards() {
    const all_card = this.element.querySelectorAll(".curtain");
    for (const card of all_card) {
      card.classList.remove("hidden");
    }
  }

  showCard(name) {
    const all_card = this.element.querySelectorAll(".curtain");
    for (const card of all_card) {
      card.classList.add("hidden");
    }
    this.element
      .querySelector(`img[alt=${name}]`)
      .parentElement.lastElementChild.classList.remove("hidden");
  }
  onSubmit(e) {
    let count_num = 0;
    let sum_card_number = 0;
    e.preventDefault();
    for (let num of this.input.value) {
      num = Number(num);
      if (count_num === 0) {
        num *= 2;
        if (num > 9) {
          num -= 9;
        }
        sum_card_number += num;
      } else {
        sum_card_number += num;
      }
      count_num = (count_num + 1) % 2;
    }
    if (sum_card_number % 10 === 0 && this.input.value.length != 0) {
      this.showCardValidity(true);
    } else {
      this.showCardValidity(false);
    }
    if (this.input.value.slice(0, 1) == "4") {
      this.showCard("visa");
    } else if (
      this.input.value.slice(0, 2) == "51" ||
      this.input.value.slice(0, 2) == "52" ||
      this.input.value.slice(0, 2) == "53" ||
      this.input.value.slice(0, 2) == "54" ||
      this.input.value.slice(0, 2) == "55"
    ) {
      this.showCard("mastercard");
    } else if (
      this.input.value.slice(0, 2) == "34" ||
      this.input.value.slice(0, 2) == "37"
    ) {
      this.showCard("americanexp");
    } else if (this.input.value.slice(0, 2) == "35") {
      this.showCard("jcb");
    } else if (
      this.input.value.slice(0, 2) == "36" ||
      this.input.value.slice(0, 2) == "38"
    ) {
      this.showCard("diners");
    } else if (
      this.input.value.slice(0, 2) == "65" ||
      this.input.value.slice(0, 4) == "6011"
    ) {
      this.showCard("discovery");
    } else if (this.input.value.slice(0, 2) == "62") {
      this.showCard("unionpay");
    } else if (this.input.value.slice(0, 2) == "22") {
      this.showCard("mirpay");
    } else {
      this.openCards();
    }
  }
}
