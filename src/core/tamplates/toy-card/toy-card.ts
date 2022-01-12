import './toy-card.scss';
import { IresponseData } from '../../../interfaces/interfaces';
import BaseComponent from '../base-component';
import Popup from '../popup';

export let choosedAmount = 0;
export let choosedToys: number[] = [];

if (localStorage.getItem('choosedAmount')) {
  choosedAmount = JSON.parse(localStorage.getItem('choosedAmount')!);
}
if (localStorage.getItem('choosedToys')) {
  choosedToys = JSON.parse(localStorage.getItem('choosedToys')!);
}

export class ToyCard extends BaseComponent {
  constructor(data: IresponseData) {
    super('div', ['toy-card']);

    this.element.innerHTML = `
      <h4 class="toy-card__title">${data.name}</h4>
      <img class="toy-card__image" src="https://raw.githubusercontent.com/lena-r-a/christmas/master/asset/toys/${data.num}.webp" alt="toy">
      <div class="choosed-mark"></div>
      <div class="toy-card__description">
        <p class="description-wrapper"><span>Количество: </span><span>${data.count}</span></p>
        <p class="description-wrapper"><span>Год покупки: </span><span>${data.year}</span></p>
        <p class="description-wrapper"><span>Форма: </span><span></span>${data.shape}</p>
        <p class="description-wrapper"><span>Цвет: </span><span>${data.color}</span></p>
        <p class="description-wrapper"><span>Размер: </span><span>${data.size}</span></p>
        <p class="description-wrapper"><span>Любимая: </span><span>${data.favorite == true ? 'да' : 'нет'}</span></p>
      </div>
    `;
    this.element.id = String(data.num);
  }

  addToChoosed() {
    this.element.addEventListener('click', () => {
      (<HTMLElement>document.querySelector('.choosed-amount span')).innerHTML = String(choosedAmount);
      if (this.element.classList.contains('active')) {
        choosedAmount--;
        choosedToys[+this.element.id] = 0;
        this.element.classList.remove('active');
        (<HTMLElement>document.querySelector('.choosed-amount span')).innerHTML = String(choosedAmount);
      } else {
        if (choosedAmount < 20) {
          choosedAmount++;
          choosedToys[+this.element.id] = 1;
          this.element.classList.add('active');
          (<HTMLElement>document.querySelector('.choosed-amount span')).innerHTML = String(choosedAmount);
        } else {
          // document.querySelector('.popup-div')?.classList.remove('displaynone');
          // setTimeout(() => {
          //   document.querySelector('.popup-div')?.classList.add('displaynone');
          // }, 1500);
          const popup = new Popup();
          document.querySelector('body')?.append(popup.element);
          setTimeout(() => {
            popup.element.classList.add('hide');
          }, 1200);
          setTimeout(() => {
            popup.element.remove();
          }, 1600);
        }
      }
    });
  }
}
