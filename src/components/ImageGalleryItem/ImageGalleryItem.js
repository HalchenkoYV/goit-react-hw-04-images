import s from './ImageGalleryItem.module.css';
import React from 'react';

function ImageGalleryItem({ dataOfPic: { webformatURL, tags, largeImageURL }, onClick }) {
    
    return (
        <img src={webformatURL} alt={tags} width={360} height={200} onClick={() => onClick(largeImageURL)} className={s.image} />
    );
};

export default ImageGalleryItem;



