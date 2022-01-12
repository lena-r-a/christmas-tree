import BaseComponent from '../base-component';
import './popup.scss';

export default class Popup extends BaseComponent {
  constructor() {
    super('div', ['popup-div']);
    this.element.innerHTML = 'Извините, все слоты заполнены!';
  }
}
