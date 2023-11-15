interface Country {
  name: string;
  code: string;
}

interface CountryStatistics {
  population: number;
}

interface CountryLanguages {
  languages: string[];
}

type CountryWithLanguages = Country & CountryLanguages;

const countryA: CountryWithLanguages = {
  name: "Greece",
  code: "GR",
  languages: ["Greek"],
};

type CountryWithStatistics = Country & CountryStatistics;

const countryB: CountryWithStatistics = {
  name: "China",
  code: "CN",
  population: 1_412_600_000,
};

export {};
