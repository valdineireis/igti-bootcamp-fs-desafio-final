const NUMBER_FORMAT = Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
});

function formatNumber(number) {
    return NUMBER_FORMAT.format(number);
}

export default formatNumber;
