import { getImageURL } from './helper';
import { useState, useEffect } from 'react';

export const useImage = (imgUrl: string, placeholder: any) => {
    const [imgsrc, setImgsrc] = useState(placeholder);

    useEffect(() => {
        const img = new Image();
        const url = getImageURL(imgUrl);
        img.src = url;

        img.onload = () => {
            setImgsrc(url);
        }
        img.onerror = () => {
            setImgsrc(placeholder);
        }
    });

    return imgsrc;
}

export default useImage;