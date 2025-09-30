    // src/components/client/ImageGallery.jsx
    import React, { useState, useEffect } from 'react';
    import '../../style/ImageGallery.css';

    const ImageGallery = ({ images }) => {
    const [mainImage, setMainImage] = useState(null);

    useEffect(() => {
        if (images && images.length > 0 && images[0]) {
        setMainImage(images[0]); // ✅ ya son URLs absolutas
        } else {
        setMainImage('https://placehold.co/600x600/EFEFEF/8B8B8B?text=Sin+Imagen');
        }
    }, [images]);

    return (
        <div className="image-gallery-redesign">
        <div className="thumbnail-list">
            {images &&
            images.map(
                (img, index) =>
                img && (
                    <div
                    key={index}
                    className={`thumbnail-wrapper ${mainImage === img ? 'active' : ''}`}
                    onClick={() => setMainImage(img)}
                    >
                    <img src={img} alt={`Vista previa ${index + 1}`} className="thumbnail-image" />
                    </div>
                )
            )}
        </div>
        <div className="main-image-wrapper">
            {mainImage && (
            <img src={mainImage} alt="Vista principal del producto" className="main-image" />
            )}
        </div>
        </div>
    );
    };

    export default ImageGallery;
