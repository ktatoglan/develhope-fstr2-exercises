interface Country {
  name: string;
  code: string;
  population: number;
}

type Currency = {
  name: string;
  code: string;
  symbol: string;
};

type CountryPopulationType = {
    code: string;
    population: number;
};

const countryPopulation: CountryPopulationType = {
  code: "NZ",
  population: 5_135_300,
};

const countryData: Country = {
  name: "India",
  code: "IN",
  population: 1_352_642_280,
};

const currencyData: Currency = {
  name: "Euro",
  code: "EUR",
  symbol: "€",
};

export {};
