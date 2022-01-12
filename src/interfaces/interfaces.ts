export interface IresponseData {
  num: number;
  name: string;
  count: number;
  year: number;
  shape: string;
  color: string;
  size: string;
  favorite: boolean;
}

export interface FilterData {
  shape: string[];
  color: string[];
  size: string[];
  favorite: boolean;
  count:( number|string)[];
  year: (string | number)[];
}

export interface SortingData {
  sortby: string;
}

export interface SelectValues {
  id: string;
  value: string;
}
export interface SelectOptions {
  placeholder: string;
  data: SelectValues[];
}
