import * as axios from "axios";


const instance = axios.create({
    baseURL: `https://api.openweathermap.org/data/2.5/`
});

const API_KEY = '85132d4ddae160c1f8dcd7eea2cb7f41';


export const currentWeatherApi = {
    getCurrentData(name) {
        return instance.get(`weather?appid=${API_KEY}&units=metric&q=${name}`)
            .then(res => res.data)
    },
    getCurrentWeatherByAsk(citiesId) {
        return instance.get(`group?id=${citiesId}&appid=${API_KEY}&units=metric`)
            .then(res => res.data)
    },
    getWeatherByHours(lat, lon) {
        return instance.get(`onecall?lat=${lat}&lon=${lon}&exclude=daily,alerts,minutely&appid=${API_KEY}&units=metric`)
            .then(res => res.data)
    }
}

export const getImage = (icon)=>{
    return `https://openweathermap.org/img/wn/${icon}@2x.png`
}

export const getFlag = (country) => {
    return `https://openweathermap.org/images/flags/${country}.png`
}