const MONTHS_TEXT = [
    'Jan',
    'Fev',
    'Mar',
    'Abr',
    'Mai',
    'Jun',
    'Jul',
    'Ago',
    'Set',
    'Out',
    'Nov',
    'Dez',
];
const MONTHS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
const YEARS = [2019, 2020, 2021];
const PERIODS = [];

YEARS.forEach((year) => {
    MONTHS.forEach((month) => {
        const period = `${year}-${month.toString().padStart(2, '0')}`;
        PERIODS.push(period);
    });
});

function formatPeriod(period) {
    const year = period.slice(0, 4);
    const month = parseInt(period.slice(5, 7));
    return `${MONTHS_TEXT[month - 1]} / ${year}`;
}

export { PERIODS, formatPeriod };
