import BaseComponent from '../base-component';
import './tree-section.scss';
import { defaultBackground, defaultTreeImg } from '../../../pages/tree';

const coords = '22,614,106,672,183,669,267,674,363,672,459,653,433,528,383,370,350,272,315,183,283,108,252,72,206,136,159,265,101,416';
class TreeSection extends BaseComponent {
  image: HTMLImageElement;

  map: HTMLElement;

  area: HTMLElement;

  constructor() {
    super('section', ['tree-section']);
    this.element.style.backgroundImage = `url("https://raw.githubusercontent.com/lena-r-a/christmas/master/asset/bg/${defaultBackground}.webp")`;
    this.image = document.createElement('img');
    this.image.alt = 'tree';
    this.image.classList.add('tree-section__image');
    this.image.src = `https://raw.githubusercontent.com/lena-r-a/christmas/master/asset/tree/${defaultTreeImg}.webp`;
    this.map = document.createElement('map');
    this.area = document.createElement('area');
    this.area.setAttribute('coords', coords);
    this.area.setAttribute('shape', 'poly');
    this.map.setAttribute('name', 'tree-map');
    this.map.append(this.area);
    this.image.setAttribute('usemap', '#tree-map');
    this.element.append(this.map);
    this.element.append(this.image);
  }
}

export default TreeSection;
