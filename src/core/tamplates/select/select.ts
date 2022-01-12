import { SelectOptions, SelectValues } from '../../../interfaces/interfaces';

function getTemplate(plaseholder: string, data: SelectValues[]): string {
  const items = data.map((item) => {
    return `<li class="select__item" data-type="item" data-id="${item.id}">${item.value}</li>`;
  });
  return `
  <div class="select__backdrop" data-type="backdrop"></div>
  <div class="select__input" data-type="input">
    <span data-type="input" data-id="value">${plaseholder}</span>
    <i class="fas fa-chevron-down" data-type="arrow"></i>
    </div>
        <div class="select__dropdown">
          <ul class="select__list">
          ${items.join('')}
          </ul>
        </div>
  `;
}

export default class Select {
  el: HTMLElement;

  arrow: HTMLElement;

  value: HTMLElement;

  options: SelectOptions;

  selectedId: string | null;

  constructor(selector: string, options: SelectOptions) {
    this.el = document.querySelector(selector)!;
    this.options = options;
    this.#render();
    this.#setup();
    this.selectedId = null;
    this.arrow = this.el.querySelector('[data-type="arrow"]')!;
    this.value = this.el.querySelector('[data-id="value"]')!;
  }

  #render() {
    const { placeholder, data } = this.options;
    this.el.classList.add('select');
    this.el.innerHTML = getTemplate(placeholder, data);
  }

  #setup() {
    this.clickHandler = this.clickHandler.bind(this);
    this.el.addEventListener('click', this.clickHandler);
    this.arrow = this.el.querySelector('[data-type="arrow"]')!;
    this.value = this.el.querySelector('[data-id="value"]')!;
  }

  clickHandler(event: Event) {
    const { type } = (<HTMLInputElement>event.target).dataset;
    if (type === 'input') {
      this.toggle();
    } else if (type === 'item') {
      const id = (<HTMLInputElement>event.target).dataset.id;
      this.select(id!);
    } else if (type === 'backdrop') {
      this.close();
    }
  }

  select(id: string) {
    this.selectedId = id;
    this.value.textContent = this.current!.value;
    this.el.querySelectorAll('[data-type="item"]').forEach((elem) => {
      elem.classList.remove('selected');
    });
    this.el.querySelector(`[data-id="${id}"]`)!.classList.add('selected');
    this.close();
  }

  get current() {
    return this.options.data.find((item) => item.id === this.selectedId);
  }

  get isOpen() {
    return this.el.classList.contains('open');
  }

  toggle() {
    this.isOpen == true ? this.close() : this.open();
  }

  open() {
    this.el.classList.add('open');
    this.arrow.classList.remove('fa-chevron-down');
    this.arrow.classList.add('fa-chevron-up');
  }

  close() {
    this.el.classList.remove('open');
    this.arrow.classList.remove('fa-chevron-up');
    this.arrow.classList.add('fa-chevron-down');
  }

  destroy() {
    this.el.removeEventListener('click', this.clickHandler);
  }
}
