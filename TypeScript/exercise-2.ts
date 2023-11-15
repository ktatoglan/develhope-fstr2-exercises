function doubleThePopulation(value: number): number {
  return value * 2;
}

doubleThePopulation(5);
doubleThePopulation(8_526);

function languagesSpoken(
  country: string,
  language1: string,
  language2?: string
): void {
  console.log(`The languages spoken in ${country} are:`);

  console.log(language1);

  if (language2 !== undefined) {
    console.log(language2);
  }
}

languagesSpoken("Colombia", "Spanish", "English");
languagesSpoken("Greece", "Greek");
languagesSpoken("New Zealand", "English", "Māori");

export {};
