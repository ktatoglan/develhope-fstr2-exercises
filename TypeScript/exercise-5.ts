let currency: any = { name: "Indian rupee" };

currency.code = "THB";

currency = "Baht";
function countryNameLength(value: unknown) {
  if (typeof value === "string") {
    console.log(value.length);
  }
}

countryNameLength("United States of America");

function throwCountryError(message: string): never {
  throw new Error(`Could not find country: ${message}`);
}

throwCountryError("Narnia");

export {};
