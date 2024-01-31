export interface CurrencyItem {
  id: string;
  name: string;
  min_size: string;
}

export interface CurrenciesResponse {
  data: CurrencyItem[];
}
