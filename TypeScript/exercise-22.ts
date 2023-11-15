const currency: Record<string, string> = {
  name: "United States dollar",
  code: "USD",
  symbol: "$",
};

interface Currency {
  name: string;
  code: string;
  symbol: string;
}

const currencies: Record<string, Currency> = {
  france: {
    name: "Euro",
    code: "EUR",
    symbol: "€",
  },
  china: {
    name: "Renminbi",
    code: "CNY",
    symbol: "¥",
  },
  colombia: {
    name: "Colombian peso",
    code: "COP",
    symbol: "$",
  },
};

export {};
