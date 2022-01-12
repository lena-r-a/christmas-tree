import Page from '../../core/tamplates/page';
import ToyField from '../../core/tamplates/toy-field/toy-field';
import Select from '../../core/tamplates/select/select';
import { FilterData } from '../../interfaces/interfaces';
import { sliderAmount, sliderYear } from '../../core/range/range';
import { API } from 'nouislider';

export let idSelect = '';
const searchInput = document.querySelector('.search-input') as HTMLInputElement;

export let filterData: FilterData = {
  shape: [],
  color: [],
  size: [],
  favorite: false,
  count: [],
  year: [],
};
if (localStorage.getItem('idSelect')) idSelect = JSON.parse(localStorage.getItem('idSelect')!);
if (localStorage.getItem('filterData')) {
  filterData = JSON.parse(localStorage.getItem('filterData')!);
  if (filterData.count.length)
    sliderAmount.noUiSlider!.updateOptions(
      {
        start: [filterData.count[0], filterData.count[1]],
      },
      true,
    );
  if (filterData.year.length)
    sliderYear.noUiSlider!.updateOptions(
      {
        start: [filterData.year[0], filterData.year[1]],
      },
      true,
    );
}

class ToysPage extends Page {
  static TextObject = {};

  select: Select;

  private readonly toyfield: ToyField;

  constructor(id: string) {
    super(id);
    this.toyfield = new ToyField();
    this.container.append(this.toyfield.element);
    this.select = new Select('#select', {
      placeholder: 'Тип сортировки',
      data: [
        { id: '1', value: 'По названию от «А» до «Я»' },
        { id: '2', value: 'По названию от «Я» до «А»' },
        { id: '3', value: 'По году по возрастанию' },
        { id: '4', value: 'По году по убыванию' },
      ],
    });
  }

  render() {
    this.toyfield.addCards();

    document.querySelector('.filters__value-container')!.addEventListener('click', () => {
      this.toyfield.filterCards(filterData);
      if (idSelect) this.toyfield.sortCards(idSelect);
      if (searchInput.value) {
        this.toyfield.searchCards(searchInput.value);
        this.toyfield.renderCardList(this.toyfield.searchedCards);
      } else this.toyfield.renderCardList(this.toyfield.filteredCards);
    });

    (<API>sliderAmount.noUiSlider).on('slide', (arr) => {
      filterData.count = arr;
      this.toyfield.filterCards(filterData);
      if (idSelect) this.toyfield.sortCards(idSelect);
      if (searchInput.value) {
        this.toyfield.searchCards(searchInput.value);
        this.toyfield.renderCardList(this.toyfield.searchedCards);
      } else this.toyfield.renderCardList(this.toyfield.filteredCards);
      document.querySelector('.amount-from')!.innerHTML = String(filterData.count[0]).split('.')[0];
      document.querySelector('.amount-to')!.innerHTML = String(filterData.count[1]).split('.')[0];
    });

    (<API>sliderYear.noUiSlider).on('slide', (arr) => {
      filterData.year = arr;
      this.toyfield.filterCards(filterData);
      if (idSelect) this.toyfield.sortCards(idSelect);
      if (searchInput.value) {
        this.toyfield.searchCards(searchInput.value);
        this.toyfield.renderCardList(this.toyfield.searchedCards);
      } else this.toyfield.renderCardList(this.toyfield.filteredCards);
      this.toyfield.renderCardList(this.toyfield.filteredCards);
      document.querySelector('.year-from')!.innerHTML = String(filterData.year[0]).split('.')[0];
      document.querySelector('.year-to')!.innerHTML = String(filterData.year[1]).split('.')[0];
    });

    document.querySelector('.search-input')!.addEventListener('input', (e) => {
      this.toyfield.searchCards((<HTMLInputElement>e.target).value.toLowerCase());
      if (!(<HTMLInputElement>e.target).value.toLowerCase()) {
        this.toyfield.filterCards(filterData);
        if (idSelect) this.toyfield.sortCards(idSelect);
      }
      this.toyfield.renderCardList(this.toyfield.searchedCards);
    });

    document.querySelector('.select__dropdown')!.addEventListener('mouseup', (e) => {
      idSelect = (<HTMLInputElement>e.target).dataset.id!;
      this.toyfield.filterCards(filterData);
      this.toyfield.sortCards(idSelect);
      if (searchInput.value) {
        this.toyfield.searchCards(searchInput.value);
        this.toyfield.renderCardList(this.toyfield.searchedCards);
      } else this.toyfield.renderCardList(this.toyfield.filteredCards);
    });

    document.querySelector('.reset-button')!.addEventListener('click', () => {
      filterData.shape = [];
      filterData.color = [];
      filterData.size = [];
      filterData.favorite = false;
      filterData.count = [];
      filterData.year = [];
      searchInput.value = '';
      (<HTMLInputElement>document.querySelector('.favorite-checkbox')).checked = false;
      document.querySelectorAll('.button').forEach((elem) => {
        if (elem.classList.contains('activeFilter')) elem.classList.remove('activeFilter');
      });
      sliderAmount.noUiSlider!.updateOptions(
        {
          start: [1, 12],
        },
        true,
      );
      sliderYear.noUiSlider!.updateOptions(
        {
          start: [1940, 2021],
        },
        true,
      );
      document.querySelector('.amount-from')!.innerHTML = '1';
      document.querySelector('.amount-to')!.innerHTML = '12';
      document.querySelector('.year-from')!.innerHTML = '1940';
      document.querySelector('.year-to')!.innerHTML = '2021';
      this.toyfield.filterCards(filterData);
      this.toyfield.sortCards(idSelect);
      this.toyfield.renderCardList(this.toyfield.filteredCards);
    });

    if (localStorage.getItem('filterData')) {
      filterData = JSON.parse(localStorage.getItem('filterData')!);
      setTimeout(() => {
        this.toyfield.filterCards(filterData);
      }, 400);
    }
    if (localStorage.getItem('idSelect')) {
      idSelect = JSON.parse(localStorage.getItem('idSelect')!);
      setTimeout(() => {
        this.toyfield.sortCards(idSelect);
      }, 400);
    }
    setTimeout(() => {
      this.toyfield.renderCardList(this.toyfield.filteredCards);
    }, 400);
    // });
    if (idSelect) {
      this.select.select(idSelect);
    }
    return this.container;
  }
}

export default ToysPage;
