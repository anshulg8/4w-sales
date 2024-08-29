export interface SalesData {
  [month: string]: number;
}

export interface Model {
  name: string;
  sales: SalesData;
}

export interface Manufacturer {
  name: string;
  models: Model[];
  logo?: string;
}
