import moment from "moment";

export function convertFarenheitTocelcius(farenheit) {
    return (farenheit - 32) * 5 / 9;
}

export function convertKelvinTocelcius(kelvin) {
    return kelvin - 273.15;
}

export function formatTime(datetime) {
    return moment(datetime).format("DD-MM-YYYY HH:mma")
}