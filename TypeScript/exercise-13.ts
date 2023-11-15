const countryPopulation: [string, number] = ["China", 1_412_600_000];

type CountryWithCurrency = [string, string, string];

const countryCurrency: CountryWithCurrency = ["Italy", "Euro", "EUR"];

const countryLanguage: readonly [string, string] = ["Greece", "Greek"];

console.log(countryLanguage);

export {};