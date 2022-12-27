import axios from 'axios'

export const BASE_URL = 'https://localhost:7185/api/farms';

export const ENDPOINTS = {
    farm: 'farm'
}

export const createAPIEndpoint = endpoint => {

    let url = BASE_URL + 'api/' + endpoint + '/';
    return {
        fetch: () => axios.get(url),
        fetchById: id => axios.get(url + id)
    }
}