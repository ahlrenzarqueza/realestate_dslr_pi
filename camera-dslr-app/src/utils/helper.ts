import React, { useEffect, useRef } from 'react';
import { baseURL } from './api';
import * as t from '../ducks/types';

export const getImageURL = (filepath: string) => {
    return baseURL + '/staticfile?file=' + encodeURIComponent(filepath);
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
    else if(exception.message.includes('Network Error')) {
        code = 0;
        message = 'Server error. Please check if Raspberry Pi server is up and running.';
    }

    return {
        code,
        message: message ? message : exception.message
    }
}

export const usePrevious = (value: any) => {
    const ref = useRef();
    useEffect(() => {
        ref.current = value;
    });
    return ref.current;
}

export default {
    getImageURL,
    getErrorReturn,
}