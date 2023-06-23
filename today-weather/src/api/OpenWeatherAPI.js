import $ from 'jquery';

const API_KEY = "350aa4c60f4c25e695bbfbf2f0c7c201";

// seems like the OpenWeatherMap SSL support isn't free. You have to either proxy your requests
export function geocoderUsingCityInfo(city) {
    return new Promise((resolve, reject) => {
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`;
        $.ajax({
            type: 'GET',
            url: url,
            dataType: 'json',
            cache: false,
            success: function (data) {
                // console.log(data);
                resolve(data);
            },
            error: function (xhr, status, err) {
                // console.error(status, err.toString());
                reject(err)
            }
        });
    });
}

export function geocoderUsingCityCountryInfo(city, country) {

    return new Promise((resolve, reject) => {
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}`;
        $.ajax({
            type: 'GET',
            url: url,
            dataType: 'json',
            cache: false,
            success: function (data) {
                // console.log(data);
                resolve(data);
            },
            error: function (xhr, status, err) {
                // console.error(status, err.toString());
                reject(err)
            }
        });
    });
}

export function getWeatherInfo(lat, lng) {
    return new Promise((resolve, reject) => {
        let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}`;
        $.ajax({
            type: 'GET',
            url: url,
            dataType: 'json',
            cache: false,
            success: function (data) {
                // console.log(data);
                resolve(data);
            },
            error: function (xhr, status, err) {
                // console.error(status, err.toString());
                reject(err)
            }
        });
    });
}