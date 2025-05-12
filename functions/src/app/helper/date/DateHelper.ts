export const toString = (date?: Date | null, locale?: string) =>
    date && Intl.DateTimeFormat(locale ?? 'en-US', { year: 'numeric', day: 'numeric', month: 'long' }).format(date);

export const getDifference = (dateTo?: string, dateFrom?: string) => {
    const diff = (dateFrom ? new Date(dateFrom).getTime() : new Date().getTime()) - new Date(dateTo ?? "").getTime();
    const time = (diff + 1000) / 1000;
    const days = +(`0${Math.floor(time / (3600 * 24))}`).slice(-2);
    const years = Math.round(Math.floor(time / (3600 * 24)) / 365);
    const months = Math.floor(days / 30);
    return {
        years, days, months
    };
};

export const getDifferenceString = (dateTo?: string, dateFrom?: string) => {
    const diff = getDifference(dateTo, dateFrom);
    const yearWording = diff.years > 1 ? "years " : "year";
    const yearComma = diff.months ? ", " : "";
    const yearMsg = diff.years ? `${diff.years} ${yearWording}${yearComma}` : "";
    const monthWording = diff.months > 1 ? "months" : "month";
    const monthMsg = diff.months ? ` ${diff.months} ${monthWording}` : "";
    return `(${yearMsg}${monthMsg})`
}

export const getFullMessage = (dateTo?: string, dateFrom?: string) => `${dateTo} ${getDifferenceString(dateTo, dateFrom)}`;