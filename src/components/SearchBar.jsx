import React, { useState } from 'react';

// Recibe la función 'onSearch' como prop desde App.jsx
function SearchBar({ onSearch, isLoading }) {
  const [formData, setFormData] = useState({
    zona: '',
    dormitorios: '',
    banos: '',
    price_min: '',
    price_max: '',
    palabras_clave: '',
  });

  // Manejador genérico para actualizar el estado de cualquier input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Al enviar el formulario, previene el refresco de la página
  // y llama a la función 'onSearch' con los datos del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(formData);
  };

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <input
        type="text"
        name="zona"
        placeholder="Zona (ej: miraflores)"
        value={formData.zona}
        onChange={handleChange}
      />
      <input
        type="number"
        name="dormitorios"
        placeholder="Dormitorios (ej: 2)"
        min="0"
        value={formData.dormitorios}
        onChange={handleChange}
      />
      <input
        type="number"
        name="banos"
        placeholder="Baños (ej: 1)"
        min="0"
        value={formData.banos}
        onChange={handleChange}
      />
      <input
        type="number"
        name="price_min"
        placeholder="Precio Mín. (ej: 1000)"
        min="0"
        value={formData.price_min}
        onChange={handleChange}
      />
      <input
        type="number"
        name="price_max"
        placeholder="Precio Máx. (ej: 2500)"
        min="0"
        value={formData.price_max}
        onChange={handleChange}
      />
      <input
        type="text"
        name="palabras_clave"
        placeholder="Keywords (ej: piscina)"
        value={formData.palabras_clave}
        onChange={handleChange}
      />
      
      {/* El botón se deshabilita si 'isLoading' es true */}
      <button type="submit" disabled={isLoading}>
        {isLoading ? 'Buscando...' : 'Buscar'}
      </button>
    </form>
  );
}

export default SearchBar;