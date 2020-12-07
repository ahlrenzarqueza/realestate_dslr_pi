import { baseURL } from './api';

export const getImageURL = (filepath: string) => {
    return baseURL + '/staticfile/' + encodeURIComponent(filepath);
}

export default {
    getImageURL
}