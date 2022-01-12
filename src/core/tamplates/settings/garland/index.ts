import BaseComponent from '../../base-component';
import './garland.scss';

const colors = ['multicolor', 'yellow', 'red', 'green', 'blue'];
let currentGarlannd = 'multicolor';

class Garland extends BaseComponent {
  title: BaseComponent;

  switchGarlandCheckbox: BaseComponent;

  checkBoxLabel: HTMLLabelElement;

  checkBox: HTMLInputElement;

  garlandColorContainer: BaseComponent;

  garlandContaineer: HTMLElement;

  constructor() {
    super('div', ['settings-section__garland']);
    this.title = new BaseComponent('h2', ['settings-section__garland-title']);
    this.title.element.textContent = 'Гирлянда';
    this.element.append(this.title.element);
    this.garlandColorContainer = new BaseComponent('div', ['garland__buttons-container']);
    this.element.append(this.garlandColorContainer.element);
    this.switchGarlandCheckbox = new BaseComponent('div', ['switch-garland']);
    this.checkBoxLabel = document.createElement('label');
    this.checkBoxLabel.htmlFor = 'toggle-button';
    this.checkBoxLabel.classList.add('toggle-text');
    this.checkBoxLabel.textContent = 'Выкл';
    this.checkBox = document.createElement('input');
    this.checkBox.type = 'checkBox';
    this.checkBox.id = 'toggle-button';
    this.checkBox.classList.add('toggle-button');
    this.switchGarlandCheckbox.element.append(this.checkBoxLabel);
    this.switchGarlandCheckbox.element.append(this.checkBox);
    this.element.append(this.switchGarlandCheckbox.element);
    this.loadGarlandCircles();
    this.garlandContaineer = document.createElement('div');
    this.garlandContaineer.classList.add('garland-container');
    this.switchGarlandCheckbox.element.addEventListener('change', (e) => this.switchOnOffGarland(e, this.checkBoxLabel));
  }

  loadGarlandCircles(): void {
    colors.forEach((color) => {
      const buttonColor = document.createElement('div');
      buttonColor.dataset.color = color;
      buttonColor.classList.add('button-color');
      buttonColor.classList.add(color);
      this.garlandColorContainer.element.append(buttonColor);
    });
  }

  addGarlandToTree(colorStyle: string): HTMLElement {
    currentGarlannd = colorStyle;
    this.garlandContaineer.innerHTML = '';
    let minWidth = 120;
    for (let i = 0; i < 10; i++) {
      const row = document.createElement('ul');
      row.style.width = `${minWidth}px`;
      row.style.height = `${minWidth + 40}px`;
      const amountinRow = +(minWidth / 25).toFixed(0);
      row.classList.add('garland-row');
      for (let j = 1; j < amountinRow; j++) {
        const angle = 90 / amountinRow;
        const garlandItem = document.createElement('li');
        garlandItem.classList.add('garland-item');
        garlandItem.classList.add(colorStyle);
        garlandItem.style.transform = `rotate(${45 + angle * j}deg) translate(${minWidth / 2}px) rotate(${-45 - angle * j}deg)`;
        row.append(garlandItem);
      }
      minWidth = minWidth + 40 + i * 5;
      this.garlandContaineer.append(row);
    }
    return this.garlandContaineer;
  }

  switchOnOffGarland(e: Event, label: HTMLLabelElement): void {
    const checkbox = e.target as HTMLInputElement;
    if (checkbox.checked) {
      label.textContent = 'Вкл';
      this.addGarlandToTree(currentGarlannd);
    } else label.textContent = 'Выкл';
  }
}

export default Garland;
