import BaseComponent from './base-component';
import { PageIds } from '../../pages/app/index';

const Buttons = [
  {
    id: PageIds.mainPage,
    text: '',
    className: 'header__nav-home',
  },
  {
    id: PageIds.toysPage,
    text: 'Игрушки',
    className: 'header__nav-item',
  },
  {
    id: PageIds.treePage,
    text: 'Ёлка',
    className: 'header__nav-item',
  },
];

export class Header extends BaseComponent {
  constructor(tagName: keyof HTMLElementTagNameMap, className: string[]) {
    super(tagName, className);
  }

  renderHeaderNav() {
    const headerNav = document.createElement('nav');
    headerNav.classList.add('header__nav');
    Buttons.forEach((button) => {
      const buttonHtml = document.createElement('a');
      buttonHtml.href = `#${button.id}`;
      buttonHtml.innerText = button.text;
      buttonHtml.classList.add(button.className);
      headerNav.append(buttonHtml);
      buttonHtml.onclick = () => {
        buttonHtml.classList.add('active-link');
        document.querySelectorAll('.header__nav a').forEach((el) => {
          if (el != buttonHtml) el.classList.remove('active-link');
        });
      };
    });
    this.element.append(headerNav);
  }

  render() {
    this.renderHeaderNav();
    return this.element;
  }
}
