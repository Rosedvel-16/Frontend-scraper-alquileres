import React from 'react';
import PropertyCard from './PropertyCard';

// Recibe la lista de 'results' como prop
function ResultsList({ results }) {
  return (
    <div className="results-list">
      {results.map((item) => (
        // Usamos 'item.link' como key, ya que el backend lo hace único
        <PropertyCard key={item.link} item={item} />
      ))}
    </div>
  );
}

export default ResultsList;