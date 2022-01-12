import './settings.scss';
import BaseComponent from '../base-component';
import Media from './media';
import ChooseTree from './choose-tree';
import ChooseBackground from './background';
import Garland from './garland';

class Settings extends BaseComponent {
  mediaSettings: Media;

  chooseTreeSettings: ChooseTree;

  chooseBackground: ChooseBackground;

  garland: Garland;

  constructor() {
    super('section', ['settings-section']);
    this.mediaSettings = new Media();
    this.chooseTreeSettings = new ChooseTree();
    this.chooseBackground = new ChooseBackground();
    this.garland = new Garland();
    this.chooseTreeSettings.loadImages();
    this.chooseBackground.loadImages();
    this.element.append(this.mediaSettings.element);
    this.element.append(this.chooseTreeSettings.element);
    this.element.append(this.chooseBackground.element);
    this.element.append(this.garland.element);
  }
}

export default Settings;
