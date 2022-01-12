import Page from '../../core/tamplates/page';
import './main-page.scss';
import BaseComponent from '../../core/tamplates/base-component';

class MainPage extends Page {
  static TextObject = {
    MainTitle: 'Новогодняя игра «Наряди ёлку»',
  };

  button: BaseComponent;

  divBall1: BaseComponent;

  divBall2: BaseComponent;

  constructor(id: string) {
    super(id);
    this.button = new BaseComponent('a', ['start-game']);
    (this.button.element as HTMLAnchorElement).href = '#toys-page';
    this.button.element.innerText = 'Начать';
    this.divBall1 = new BaseComponent('div', ['decoration-ball', 'ball1']);
    this.divBall2 = new BaseComponent('div', ['decoration-ball', 'ball2']);
  }

  private createHeaderTitle(text: string) {
    const headerTitle = document.createElement('h1');
    headerTitle.classList.add('main-title');
    headerTitle.innerHTML = text;
    return headerTitle;
  }

  render() {
    const title = this.createHeaderTitle(MainPage.TextObject.MainTitle);
    this.container.append(this.divBall1.element);
    this.container.append(this.divBall2.element);
    this.container.append(title);
    this.container.append(this.button.element);
    return this.container;
  }
}

export default MainPage;
