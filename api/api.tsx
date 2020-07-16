import axios from 'axios';

const api = axios.create({
    baseURL: `api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={9f569381e0460afaf9bb9aa983bbb18b}`
})

export default api