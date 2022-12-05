// function prepares readable date
import {intlFormatDistance} from "date-fns";

export const preparedDate = (date: string): string => {
    const dateObject = new Date(date);
    const humanWord = intlFormatDistance(
        dateObject,
        new Date(),
        {
            unit: 'day',
            locale: "ru"
        }
    );

    // add hours, minutes and timezone to date
    return humanWord.charAt(0).toUpperCase() + humanWord.slice(1) +
        ', ' + dateObject.toLocaleTimeString('ru-RU', {hour: '2-digit', minute: '2-digit'}) +
        ' i-' + dateObject.toLocaleTimeString('ru-RU', {timeZoneName: 'short'}).split(' ')[1];
}
