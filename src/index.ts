import './normolize.scss';
import './global.scss';
import './filters.scss';
import './core/filters';
import App from './pages/app';
import './core/range/range';
import './core/range/range.scss';
import { filterData, idSelect } from './pages/toys';
import { choosedAmount, choosedToys } from './core/tamplates/toy-card/toy-card';

const app = new App();
app.run();

window.addEventListener('beforeunload', () => {
  localStorage.setItem('idSelect', JSON.stringify(idSelect));
  localStorage.setItem('filterData', JSON.stringify(filterData));
  localStorage.setItem('choosedAmount', JSON.stringify(choosedAmount));
  localStorage.setItem('choosedToys', JSON.stringify(choosedToys));
});

console.log('самооценка https://docs.google.com/document/d/1_3qzoiDhNq-MjACkfBdaAMQsHTcd_7ssMhFyvpmDYJU/edit');
