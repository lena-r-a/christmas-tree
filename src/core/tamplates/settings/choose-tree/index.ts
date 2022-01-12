import BaseComponent from '../../base-component';
import './choose-tree.scss';

const imageNames = ['1', '2', '3', '4', '5', '6'];

class ChooseTree extends BaseComponent {
  title: BaseComponent;

  imageContainer: BaseComponent;

  constructor() {
    super('div', ['settings-section__tree']);
    this.title = new BaseComponent('h2', ['settings-section__tree-title']);
    this.title.element.textContent = 'Выберите ёлку';
    this.element.append(this.title.element);
    this.imageContainer = new BaseComponent('div', ['settings-section__container']);
    this.element.append(this.imageContainer.element);
  }

  loadImages(): void {
    imageNames.forEach((img) => {
      const imageTree = document.createElement('div');
      imageTree.classList.add('settings-section__tree-image');
      imageTree.dataset.tree = img;
      const image = new Image();
      const SRC = `https://raw.githubusercontent.com/lena-r-a/christmas/master/asset/tree/${img}.webp`;
      image.src = SRC;
      image.onload = () => {
        imageTree.style.backgroundImage = `url(${SRC})`;
        this.imageContainer.element.append(imageTree);
      };
    });
  }
}

export default ChooseTree;
