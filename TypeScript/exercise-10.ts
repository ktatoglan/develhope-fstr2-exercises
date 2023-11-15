interface Country<LanguagesType> {
    name: string;
    languages: LanguagesType;
  }
  
  const languagesObj1: Country<string> = {
    name: "New Zealand",
    languages: "English, Māori",
  };
  
  console.log(languagesObj1.languages);
  
  const languagesObj2: Country<string[]> = {
    name: "Spain",
    languages: ["Spanish", "Catalan", "Galician", "Basque", "Valencian"],
  };
  
  console.log(languagesObj2.languages.join(", "));
  export {};
  