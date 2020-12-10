import { baseURL } from './api';
import * as t from '../ducks/types';

export const getImageURL = (filepath: string) => {
    return baseURL + '/staticfile/' + encodeURIComponent(filepath);
}

export const getErrorReturn : ((code: number, exception?: any) => t.IAppError) = (code, exception) => {
    let message;
    console.log('Exception object', exception);
    console.log('Exception status', exception.status);
    console.log('Exception message', exception.message);
    if(exception.response) {
        code = exception.response.status;
        message = exception.response.data && exception.response.data.message
                    ? exception.response.data.message : exception.response.data;
    }
    return {
        code,
        message: message ? message : 'Generic error'
    }
}

export default {
    getImageURL,
    getErrorReturn,
}