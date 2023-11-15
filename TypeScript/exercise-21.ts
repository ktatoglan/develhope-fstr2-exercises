interface Country {
  name: string;
  code: string;
  languages: string[];
  currency?: string;
  population: number;
}

type PartialCountry = Country;

const countryA: Partial<PartialCountry> = {
  code: "CN",
  population: 1_412_600_000,
};
type CompleteCountry = Country;

const countryB: Required<CompleteCountry> = {
  name: "Greece",
  code: "GR",
  languages: ["Greek"],
  currency: "Euro",
  population: 10_678_632,
};

type ReadonlyCountry = Country;

const countryC: Readonly<ReadonlyCountry> = {
  name: "Italy",
  code: "IT",
  languages: ["Italian"],
  population: 60_317_116,
};

console.log(countryC);

type CountryWithPopulation = Country;

const countryD: Pick<CountryWithPopulation, "name" | "code" | "population"> = {
  name: "New Zealand",
  code: "NZ",
  population: 5_135_300,
};

type CountryWithoutPopulation = Country;

const countryE: Omit<CountryWithoutPopulation, "population"> = {
  name: "Thailand",
  code: "TH",
  languages: ["Thai", "Isan", "Kam Mueang", "Pak Tai", "Malay"],
  currency: "Baht",
};

export {};
