import './toy-field.scss';
import BaseComponent from '../base-component';
import Loader from '../../controller/loader';
import { ToyCard } from '../toy-card/toy-card';
import { IresponseData, FilterData } from '../../../interfaces/interfaces';
import { choosedToys } from '../toy-card/toy-card';

export default class ToyField extends BaseComponent {
  loader: Loader;

  resultArray: IresponseData[];

  filteredCards: IresponseData[];

  searchedCards: IresponseData[];

  constructor() {
    super('div', ['toy-field']);
    this.loader = new Loader('https://raw.githubusercontent.com/lena-r-a/christmas/master/toys.json');
    this.resultArray = [];
    this.filteredCards = [];
    this.searchedCards = [];
  }

  renderCardList(data: IresponseData[]) {
    this.element.innerHTML = '';
    data.forEach((item) => {
      const card = new ToyCard(item);
      card.addToChoosed();
      if (choosedToys[+card.element.id] == 1) card.element.classList.add('active');
      this.element.append(card.element);
    });
    if (data.length == 0) this.element.innerHTML = 'Извините, совпадений не обнаружено';
  }

  addCards() {
    this.element.innerHTML = '';
    this.loader.load('GET', (data: IresponseData[]) => {
      this.resultArray = data;
      this.filteredCards = [...this.resultArray];
      // this.renderCardList(data);
      return this.resultArray;
    });
  }

  sortCards(id: string) {
    const sorted = [...this.filteredCards];
    if (id === '3') sorted.sort((a, b) => a.year - b.year);
    if (id === '4') sorted.sort((a, b) => b.year - a.year);
    if (id === '2') sorted.sort((a, b) => (a.name > b.name ? -1 : 1));
    if (id === '1') sorted.sort((a, b) => (a.name > b.name ? 1 : -1));
    this.filteredCards = sorted;
  }

  filterCards(filterValues: FilterData) {
    this.filteredCards = Array.from(this.resultArray);
    if (filterValues.shape.length) {
      this.filteredCards = this.filteredCards.filter((el) => filterValues.shape.includes(el.shape));
    }
    if (filterValues.color.length) {
      this.filteredCards = this.filteredCards.filter((el) => filterValues.color.includes(el.color));
    }
    if (filterValues.size.length) {
      this.filteredCards = this.filteredCards.filter((el) => filterValues.size.includes(el.size));
    }
    if (filterValues.favorite == true) {
      this.filteredCards = this.filteredCards.filter((el) => el.favorite == true);
    }
    if (filterValues.count.length) {
      this.filteredCards = this.filteredCards.filter((el) => +el.count >= +filterValues.count[0] && +el.count <= +filterValues.count[1]);
    }
    if (filterValues.year.length) {
      this.filteredCards = this.filteredCards.filter((el) => +el.year >= +filterValues.year[0] && +el.year <= +filterValues.year[1]);
    }
  }

  searchCards(value: string) {
    const searchVal: string = value;
    this.searchedCards = [...this.filteredCards];
    this.searchedCards = this.searchedCards.filter((elem) => elem.name.toLowerCase().indexOf(searchVal) >= 0);
  }
}
