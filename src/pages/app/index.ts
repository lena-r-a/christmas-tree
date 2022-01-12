import MainPage from '../main';
import Page from '../../core/tamplates/page';
import ToysPage from '../toys';
import { Header } from '../../core/tamplates/header';
import TreePage from '../tree';

export const enum PageIds {
  mainPage = 'main-page',
  toysPage = 'toys-page',
  treePage = 'tree-page',
}

class App {
  private static container: HTMLElement = document.querySelector('#app')!;

  private initialPage: MainPage;

  private header: Header;

  private enableRouteChange() {
    window.addEventListener('hashchange', () => {
      const hash = window.location.hash.slice(1);
      App.renderNewPage(hash);
    });
  }

  static renderNewPage(idPage: string) {
    App.container.innerHTML = '';
    let page: Page | null;

    if (idPage == PageIds.mainPage) {
      page = new MainPage(idPage);
      (<HTMLElement>document.querySelector('.filters')).classList.add('displaynone');
    } else if (idPage == PageIds.toysPage) {
      page = new ToysPage(idPage);
      (<HTMLElement>document.querySelector('.filters')).classList.remove('displaynone');
      (<HTMLInputElement>document.querySelector('.search-input')).focus();
    } else if (PageIds.treePage) {
      page = new TreePage(idPage);
      (<HTMLElement>document.querySelector('.filters')).classList.add('displaynone');
    }

    if (page!) {
      const pageHtml = page.render();
      App.container.append(pageHtml);
    }
  }

  constructor() {
    this.initialPage = new MainPage('main-page');
    this.header = new Header('header', ['header']);
  }

  run() {
    const mainPageHTML = this.initialPage.render();
    document.querySelector('body')?.prepend(this.header.render());
    App.container.append(mainPageHTML);
    if (window.location.hash.slice(1)) {
      App.renderNewPage(window.location.hash.slice(1));
    } else App.renderNewPage('main-page');
    this.enableRouteChange();
  }
}

export default App;
