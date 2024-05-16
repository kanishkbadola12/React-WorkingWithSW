import { useEffect, useState } from "react";
import Images from "./Images";
import classes from './ImagesContainer.module.css';

const ImagesContainer = () => {
    const [imagesData, setImagesData] = useState([]);

    const registerServiceWorker = async () => {
        if('serviceWorker' in navigator) {
            navigator.serviceWorker.register('/ServiceWorker.js');
        }
    }
    
    const fetchData = async () => {
        const response = await fetch('https://picsum.photos/v2/list');

        if (!response.ok) {
            throw new Error('Something went wrong');
        }

        const data = await response.json();
        setImagesData(data);
    }

    useEffect(() => {
        registerServiceWorker();
        fetchData();
    }, []);

    return (
        <>
            <h3>Caching Images using Service Worker</h3>
            <ul className={classes['grid-container']}>
                {imagesData.map(image => (
                    <Images key={image.id} url={image.download_url}></Images>
                ))}
            </ul>
        </>
    )
}

export default ImagesContainer;