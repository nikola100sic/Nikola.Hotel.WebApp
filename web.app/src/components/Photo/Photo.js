import React, { useState, useEffect } from 'react';
import { photos } from '../../assets/images'; // Pravilna putanja
import PhotoGallery from './PhotoGallery'; // Importujte novu komponentu

export const Photo = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMoving, setIsMoving] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsMoving(true); // Aktivira pomeranje
      setCurrentIndex(prevIndex => {
        const newIndex = (prevIndex + 1) % photos.length;
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
          className={`header-image ${isMoving ? 'moving' : ''}`} 
        />
      </div>
      <PhotoGallery /> 
    </div>
  );
};
