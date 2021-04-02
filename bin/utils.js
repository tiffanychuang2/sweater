import axios from 'axios';

export async function getWeather() {
    return await axios({
        method: 'get',
        url: endpoint
    });
}