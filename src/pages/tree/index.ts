import Page from '../../core/tamplates/page';
import './tree-page.scss';
import Settings from '../../core/tamplates/settings';
import TreeSection from '../../core/tamplates/tree-section';
import RightSection from '../../core/tamplates/right-section';
import { currentElement } from '../../core/tamplates/right-section/index';

let isSnow = localStorage.getItem('isSnow') ? JSON.parse(localStorage.getItem('isSnow')!) : false;
let snowFall: NodeJS.Timer;
export let defaultBackground = localStorage.getItem('treeBG') ? localStorage.getItem('treeBG') : '1';
export let defaultTreeImg = localStorage.getItem('treeImg') ? localStorage.getItem('treeImg') : '1';

class TreePage extends Page {
  settings: Settings;

  treeSection: TreeSection;

  rightSection: RightSection;

  constructor(id: string) {
    super(id);
    this.settings = new Settings();
    this.treeSection = new TreeSection();
    this.rightSection = new RightSection();
  }

  render(): HTMLElement {
    this.container.append(this.settings.element);
    this.container.append(this.treeSection.element);
    this.rightSection.loadToysArray();
    this.container.append(this.rightSection.element);

    this.settings.mediaSettings.snowButton.element.addEventListener('click', () => {
      if (isSnow) {
        this.settings.mediaSettings.snowButton.element.classList.remove('active');
        isSnow = false;
        clearInterval(snowFall);
      } else {
        isSnow = true;
        this.settings.mediaSettings.snowButton.element.classList.add('active');
        snowFall = setInterval(() => this.settings.mediaSettings.createSnowFlake(this.treeSection.element), 50);
      }
      localStorage.setItem('isSnow', JSON.stringify(isSnow));
    });

    this.settings.chooseTreeSettings.element.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      if (target.dataset.tree) {
        const { tree } = target.dataset;
        localStorage.setItem('treeImg', tree);
        defaultTreeImg = tree;
        this.treeSection.image.src = `https://raw.githubusercontent.com/lena-r-a/christmas/master/asset/tree/${tree}.webp`;
        document.querySelectorAll('.settings-section__tree-image')?.forEach((element) => {
          element.classList.remove('active');
        });
        target.classList.add('active');
      }
    });

    this.settings.chooseBackground.element.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      if (target.dataset.bg) {
        const { bg } = target.dataset;
        localStorage.setItem('treeBG', bg);
        defaultBackground = bg;
        this.treeSection.element.style.backgroundImage = `url("https://raw.githubusercontent.com/lena-r-a/christmas/master/asset/bg/${bg}.webp")`;
        document.querySelectorAll('.settings-section__background-image')?.forEach((element) => {
          element.classList.remove('active');
        });
        target.classList.add('active');
      }
    });
    window.addEventListener('load', () => {
      if (isSnow) {
        snowFall = setInterval(() => this.settings.mediaSettings.createSnowFlake(this.treeSection.element), 50);
        this.settings.mediaSettings.snowButton.element.classList.add('active');
      }
    });

    this.settings.garland.garlandColorContainer.element.addEventListener('click', (e) => {
      if ((<HTMLElement>e.target).classList.contains('button-color')) {
        const { color } = (<HTMLElement>e.target).dataset;
        this.treeSection.element.append(this.settings.garland.addGarlandToTree(color!));
        this.settings.garland.checkBox.checked = true;
      }
    });

    this.settings.garland.switchGarlandCheckbox.element.addEventListener('click', (e) => {
      const checkbox = e.target as HTMLInputElement;
      if (checkbox.checked) {
        this.treeSection.element.append(this.settings.garland.garlandContaineer);
      } else this.settings.garland.garlandContaineer.innerHTML = '';
    });

    this.treeSection.image.addEventListener('dragleave', () => {
      currentElement.removeAttribute('style');
      currentElement.classList.add('free-toy');
      const currElId = currentElement.id;
      document.querySelector(`.favourite-toy #${currElId}-p`)!.innerHTML = String(document.querySelectorAll(`#${currElId}-div .free-toy`).length);
    });
    this.treeSection.area.addEventListener('dragover', (e) => {
      e.preventDefault();
    });
    this.treeSection.area.addEventListener('drop', (e) => {
      currentElement.style.left = e.pageX - currentElement.offsetWidth / 2 + 'px';
      currentElement.style.top = e.pageY - currentElement.offsetHeight / 2 + 'px';
      const currElId = currentElement.id;
      currentElement.classList.remove('free-toy');
      document.querySelector(`.favourite-toy #${currElId}-p`)!.innerHTML = String(document.querySelectorAll(`#${currElId}-div .free-toy`).length);
    });

    this.rightSection.resetLocalBtn.element.addEventListener('click', () => {
      this.settings.mediaSettings.snowButton.element.classList.remove('active');
      isSnow = false;
      clearInterval(snowFall);
      this.settings.mediaSettings.offMusic();
      defaultTreeImg = '1';
      defaultBackground = '1';
      this.treeSection.element.style.backgroundImage = `url("https://raw.githubusercontent.com/lena-r-a/christmas/master/asset/bg/${defaultBackground}.webp")`;
      document.querySelectorAll('.settings-section__background-image')?.forEach((element) => {
        element.classList.remove('active');
      });
      this.treeSection.image.src = `https://raw.githubusercontent.com/lena-r-a/christmas/master/asset/tree/${defaultTreeImg}.webp`;
      document.querySelectorAll('.settings-section__tree-image')?.forEach((element) => {
        element.classList.remove('active');
      });
    });

    return this.container;
  }
}

export default TreePage;
