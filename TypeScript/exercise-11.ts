interface Country {
  name: string;
  code: string;
  population: number;
}

const countries1: Country[] = [
  {
    name: "China",
    code: "CN",
    population: 1_412_600_000,
  },
  {
    name: "Italy",
    code: "IT",
    population: 60_317_116,
  },
];

const countries2: Array<Country> = [
  {
    name: "Thailand",
    code: "TH",
    population: 69_950_850,
  },
  {
    name: "Greece",
    code: "GR",
    population: 10_678_632,
  },
];

export {};
