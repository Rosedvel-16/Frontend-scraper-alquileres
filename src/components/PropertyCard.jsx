import React from 'react';

// Recibe la prop 'item' con los datos de una propiedad
function PropertyCard({ item }) {
  const placeholderImage = 'https://via.placeholder.com/300x200?text=Sin+Imagen';
  
  // Limpia detalles vacíos para no mostrarlos
  const details = [
    item.m2 && `${item.m2} m²`,
    item.dormitorios && `${item.dormitorios} dorm.`,
    item.baños && `${item.baños} baño(s)`,
  ].filter(Boolean); // filter(Boolean) elimina items vacíos

  return (
    <div className="property-card">
      <img 
        src={item.imagen_url || placeholderImage} 
        alt={item.titulo} 
        onError={(e) => { e.target.src = placeholderImage; }} // Fallback si la imagen falla
      />
      <div className="card-content">
        <h3>{item.titulo || 'Título no disponible'}</h3>
        <p className="card-price">{item.precio || 'Consultar precio'}</p>
        
        {details.length > 0 && (
          <div className="card-details">
            {details.map((detail) => (
              <span key={detail}>{detail}</span>
            ))}
          </div>
        )}
        
        <div className="card-footer">
          <span className="card-source" data-fuente={item.fuente}>
            {item.fuente}
          </span>
          <a 
            href={item.link} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="card-link"
          >
            Ver más
          </a>
        </div>
      </div>
    </div>
  );
}

export default PropertyCard;