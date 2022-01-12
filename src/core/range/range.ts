import _default, { target } from 'nouislider';
const noUiSlider = _default;
import 'nouislider/dist/nouislider.css';

export const sliderAmount = <target>document.querySelector('#slider-amount');
export const sliderYear = <target>document.querySelector('#slider-year');

noUiSlider.create(sliderAmount, {
  range: {
    min: 1,
    max: 12,
  },

  step: 1,

  start: [1, 12],
  connect: true,
});

noUiSlider.create(sliderYear, {
  range: {
    min: 1940,
    max: 2021,
  },

  step: 1,

  start: [1940, 2021],
  connect: true,
});
