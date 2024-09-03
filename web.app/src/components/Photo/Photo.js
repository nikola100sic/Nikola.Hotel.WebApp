import React, { useState, useEffect } from 'react';
import { photos } from '../../assets/images'; 
import PhotoGallery from './PhotoGallery'; 

export const Photo = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMoving, setIsMoving] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsMoving(true);
      setCurrentIndex(prevIndex => {
        let newIndex = prevIndex + 1;
        if (newIndex >= photos.length) {
            newIndex = 0;
        }
            return newIndex;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  

  return (
    <div className="containerImage">
      <div className="fullscreen-backgroundImage"></div>
      <div className="gallery">
        <img 
          src={photos[currentIndex]} 
          alt="Hotel" 
        />
      </div>
      <PhotoGallery /> 
    </div>
  );
};
