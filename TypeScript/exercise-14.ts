const populations = [
    1_412_600_000,
    60_317_116,
    69_950_850,
    10_678_632,
];

const sumOfPopulations = populations.reduce((total, population) => {
    return total + population;
}, 0);

console.log(sumOfPopulations);