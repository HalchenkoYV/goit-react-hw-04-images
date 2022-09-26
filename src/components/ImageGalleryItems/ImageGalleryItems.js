import s from './ImageGalleryItems.module.css';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import React from 'react';

function ImageGalleryItems({responseWithPics ,onClick}) {
    
    return (
       <ul className={s.gallery}>
            {responseWithPics.map(pic => {
                return (
                    <li key={pic.id} className={s.item}>
                        <ImageGalleryItem dataOfPic={pic} onClick={onClick} />
                    </li>)
            })}
        </ul>
)};

export default ImageGalleryItems;