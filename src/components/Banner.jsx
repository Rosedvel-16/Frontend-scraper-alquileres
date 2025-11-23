// src/components/Banner.jsx

import React, { useState, useEffect } from 'react';

// Lista de imágenes para el slideshow
const images = [
  'https://www.arqmoarquitectos.com/wp-content/uploads/2020/03/casa-de-campo_chincha_01.jpg',
  'https://modulhaus.pe/wp-content/uploads/modulhaus-slider-1-1500x630.jpg',
  'https://www.rubi.com/es/blog/wp-content/uploads/2024/10/shutterstock_2478836439_11zon.jpg',
  'https://imgix.cosentino.com/es/wp-content/uploads/2023/07/Lumire-70-Facade-MtWaverley-vic-1.jpg?auto=format%2Ccompress&ixlib=php-3.3.0'
];

// Duración de cada foto (1000ms = 1 segundo, como pediste)
// Nota: 1 segundo es muy rápido. Si quieres, prueba cambiarlo a 3000 o 5000.
const DURATION = 4000;

function Banner() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // Creamos un intervalo que se ejecuta cada 'DURATION' milisegundos
    const interval = setInterval(() => {
      // Pasamos al siguiente índice de imagen
      // El '%' (módulo) hace que vuelva al inicio (0) cuando llega al final
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, DURATION);

    // Es importante limpiar el intervalo cuando el componente se destruye
    // para evitar problemas de memoria.
    return () => clearInterval(interval);
  }, []); // El array vacío [] significa que este efecto se ejecuta 1 vez (al inicio)

  return (
    <div className="banner-container">
      {/* Renderizamos todas las imágenes, una encima de otra.
        La magia del CSS (opacity) se encarga de mostrar solo la activa.
      */}
      {images.map((imgUrl, index) => (
        <img
          key={imgUrl}
          src={imgUrl}
          alt="Banner background"
          className={`banner-image ${index === currentIndex ? 'active' : ''}`}
        />
      ))}
      <div className="banner-overlay"></div>
      {/* Este es el título que va encima del slideshow */}
      <h1 className="banner-title">Buscador de Propiedades 5-en-1</h1>
    </div>
  );
}

export default Banner;