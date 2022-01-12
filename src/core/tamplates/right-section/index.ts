import './right-section.scss';
import BaseComponent from '../base-component';
import Loader from '../../controller/loader';
import { IresponseData } from '../../../interfaces/interfaces';
import { choosedToys, choosedAmount } from '../toy-card/toy-card';

export let currentElement: HTMLElement;

class RightSection extends BaseComponent {
  title: BaseComponent;

  imageContainer: BaseComponent;

  loader: Loader;

  toysArray: IresponseData[];

  resetLocalBtn: BaseComponent;

  constructor() {
    super('section', ['right-section']);
    this.title = new BaseComponent('h2', ['right-section__toys-title']);
    this.title.element.textContent = 'Игрушки';
    this.element.append(this.title.element);
    this.imageContainer = new BaseComponent('div', ['right-section__toys-wrapper']);
    this.element.append(this.imageContainer.element);
    this.loader = new Loader('https://raw.githubusercontent.com/lena-r-a/christmas/master/toys.json');
    this.toysArray = [];
    this.resetLocalBtn = new BaseComponent('button', ['reset-localstorage']);
    this.resetLocalBtn.element.textContent = 'Сбросить LocalStorage';
    this.element.append(this.resetLocalBtn.element);
    this.resetLocalBtn.element.addEventListener('click', () => localStorage.clear());
  }

  loadToysToStack(): void {
    if (choosedAmount) {
      choosedToys.forEach((toy, index) => {
        if (toy) {
          const imageTreeContainer = document.createElement('div');
          imageTreeContainer.classList.add('favourite-toy');
          const amountP = document.createElement('p');
          amountP.classList.add('toy-amount');
          amountP.id = `favourite-toy-${index}-p`;
          amountP.innerText = String(this.toysArray[index - 1].count);
          imageTreeContainer.classList.add('favourite-toy');
          imageTreeContainer.id = `favourite-toy-${index}-div`;
          imageTreeContainer.append(amountP);
          for (let i = 0; i < this.toysArray[index - 1].count; i++) {
            const image = new Image();
            const SRC = `https://raw.githubusercontent.com/lena-r-a/christmas/master/asset/toys/${index}.webp`;
            image.src = SRC;
            image.onload = () => {
              const toyImage = document.createElement('img');
              toyImage.src = SRC;
              toyImage.classList.add('toy-image');
              toyImage.setAttribute('draggable', 'true');
              toyImage.classList.add('free-toy');
              toyImage.id = `favourite-toy-${index}`;
              toyImage.addEventListener('dragstart', (e) => {
                e.dataTransfer?.setData('text/html', 'dragstart');
                this.returnCurrentElement(toyImage);
              });
              imageTreeContainer.append(toyImage);
            };
          }
          this.imageContainer.element.append(imageTreeContainer);
        }
      });
    } else {
      for (let i = 1; i <= 20; i++) {
        const imageTreeContainer = document.createElement('div');
        const amountP = document.createElement('p');
        amountP.classList.add('toy-amount');
        amountP.id = `favourite-toy-${i}-p`;
        amountP.innerText = String(this.toysArray[i - 1].count);
        imageTreeContainer.classList.add('favourite-toy');
        imageTreeContainer.id = `favourite-toy-${i}-div`;
        imageTreeContainer.append(amountP);
        for (let j = 0; j < this.toysArray[i - 1].count; j++) {
          const image = new Image();
          const SRC = `https://raw.githubusercontent.com/lena-r-a/christmas/master/asset/toys/${i}.webp`;
          image.src = SRC;
          image.onload = () => {
            const toyImage = document.createElement('img');
            toyImage.src = SRC;
            toyImage.classList.add('toy-image');
            toyImage.classList.add('free-toy');
            toyImage.id = `favourite-toy-${i}`;
            toyImage.setAttribute('draggable', 'true');
            toyImage.addEventListener('dragstart', (e) => {
              e.dataTransfer?.setData('text/html', 'dragstart');
              this.returnCurrentElement(toyImage);
            });
            imageTreeContainer.append(toyImage);
          };
        }
        this.imageContainer.element.append(imageTreeContainer);
      }
    }
  }

  returnCurrentElement(elem: HTMLElement): void {
    currentElement = elem;
  }

  loadToysArray() {
    this.loader.load('GET', (data: IresponseData[]) => {
      this.toysArray = data;
      this.loadToysToStack();
      return this.toysArray;
    });
  }
}

export default RightSection;
