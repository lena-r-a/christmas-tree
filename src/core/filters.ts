import { filterData } from '../pages/toys';
import { choosedAmount } from './tamplates/toy-card/toy-card';

(<HTMLElement>document.querySelector('.choosed-amount span')).innerHTML = String(choosedAmount);
document.querySelectorAll('.shape-button').forEach((el) => {
  if (filterData.shape.indexOf((<HTMLInputElement>el).dataset.id!) >= 0) el.classList.add('activeFilter');
});
document.querySelectorAll('.color-button').forEach((el) => {
  if (filterData.color.indexOf((<HTMLInputElement>el).dataset.id!) >= 0) el.classList.add('activeFilter');
});
document.querySelectorAll('.size-button').forEach((el) => {
  if (filterData.size.indexOf((<HTMLInputElement>el).dataset.id!) >= 0) el.classList.add('activeFilter');
});
(<HTMLInputElement>document.querySelector('.favorite-checkbox')).checked = filterData.favorite;
if (filterData.count.length) {
  (<HTMLElement>document.querySelector('.amount-from')).innerHTML = String(filterData.count[0]).split('.')[0];
  (<HTMLElement>document.querySelector('.amount-to')).innerHTML = String(filterData.count[1]).split('.')[0];
}
if (filterData.year.length) {
  (<HTMLElement>document.querySelector('.year-from')).innerHTML = String(filterData.year[0]).split('.')[0];
  (<HTMLElement>document.querySelector('.year-to')).innerHTML = String(filterData.year[1]).split('.')[0];
}

document.querySelector('.filters__value-container')!.addEventListener('click', (e) => {
  filterData.favorite = (<HTMLInputElement>document.querySelector('.favorite-checkbox')).checked;
  const element = e.target as HTMLElement;
  const { type } = element.dataset;
  const { id } = element.dataset;
  if (type === 'shape') {
    if (element.classList.contains('activeFilter')) {
      element.classList.remove('activeFilter');
      filterData.shape.splice(filterData.shape.indexOf(id!), 1);
    } else {
      element.classList.add('activeFilter');
      filterData.shape.push(id!);
    }
  }
  if (type === 'color') {
    if (element.classList.contains('activeFilter')) {
      element.classList.remove('activeFilter');
      filterData.color.splice(filterData.color.indexOf(id!), 1);
    } else {
      element.classList.add('activeFilter');
      filterData.color.push(id!);
    }
  }
  if (type === 'size') {
    if (element.classList.contains('activeFilter')) {
      element.classList.remove('activeFilter');
      filterData.size.splice(filterData.size.indexOf(id!), 1);
    } else {
      element.classList.add('activeFilter');
      filterData.size.push(id!);
    }
  }
});
