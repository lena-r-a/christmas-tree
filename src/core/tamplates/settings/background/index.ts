import './background-settings.scss';
import './../choose-tree/choose-tree.scss';
import BaseComponent from '../../base-component';

const imageNames = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];

class ChooseBackground extends BaseComponent {
  title: BaseComponent;

  imageContainer: BaseComponent;

  constructor() {
    super('div', ['settings-section__background', 'settings-div']);
    this.title = new BaseComponent('h2', ['settings-section__background-title']);
    this.title.element.textContent = 'Выберите фон';
    this.element.append(this.title.element);
    this.imageContainer = new BaseComponent('div', ['settings-section__container']);
    this.element.append(this.imageContainer.element);
  }

  loadImages(): void {
    imageNames.forEach((img) => {
      const imageTree = document.createElement('div');
      imageTree.classList.add('settings-section__background-image');
      imageTree.dataset.bg = img;
      const image = new Image();
      const SRC = `https://raw.githubusercontent.com/lena-r-a/christmas/master/asset/bg/${img}.webp`;
      image.src = SRC;
      image.onload = () => {
        imageTree.style.backgroundImage = `url(${SRC})`;
        this.imageContainer.element.append(imageTree);
      };
    });
  }
}

export default ChooseBackground;
