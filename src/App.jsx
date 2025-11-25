// src/App.jsx

import React, { useState, useCallback } from 'react';
import SearchBar from './components/SearchBar';
import ResultsList from './components/ResultsList';
import Pagination from './components/Pagination'; 
import Banner from './components/Banner';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:5001';
const ITEMS_PER_PAGE = 20;

function App() {
  const [allResults, setAllResults] = useState([]); 
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [currentPage, setCurrentPage] = useState(1); 

  const handleSearch = useCallback(async (formData) => {
    setIsLoading(true);
    setError(null);
    setAllResults([]); 
    setHasSearched(true);

    const params = new URLSearchParams();
    Object.entries(formData).forEach(([key, value]) => {
      if (value) {
        params.append(key, value);
      }
    });
    
    const queryString = params.toString();
    
    const cleanBaseUrl = API_BASE_URL.replace(/\/$/, '');
    const url = `${cleanBaseUrl}/scrape-all?${queryString}`;
    
    console.log("Llamando a la API:", url);

    try {
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`Error del servidor: ${response.status} (${response.statusText}).`);
      }
      
      const data = await response.json();
      
      setAllResults(data); 
      setCurrentPage(1); 
      console.log("Resultados recibidos:", data);

    } catch (err) {
      console.error("Error al hacer fetch:", err);
      // Damos un mensaje más útil en caso de que sea un error de red
      setError(err.message || 'Error de red: No se pudo conectar con la API de Render. El servicio puede estar inactivo o agotando memoria.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // --- Lógica de Paginación ---
  const totalPages = Math.ceil(allResults.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentResults = allResults.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  // ------------------------------

  // Función para cambiar de página y hacer scroll-top
  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0); 
  };

  // Renderizado
  return (
    <>
      <Banner />

      <SearchBar onSearch={handleSearch} isLoading={isLoading} />
      
      {error && (
        <div className="error-message">{error}</div>
      )}
      
      {!isLoading && !error && hasSearched && (
        <>
          {allResults.length === 0 ? (
            <div className="status-message">No se encontraron resultados para tu búsqueda.</div>
          ) : (
            <>
              <p className="status-message">
                Mostrando {currentResults.length} de {allResults.length} resultados totales (Página {currentPage} de {totalPages}).
              </p>
              <ResultsList results={currentResults} /> 
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </>
          )}
        </>
      )}

      {!isLoading && !error && !hasSearched && (
        <div className="status-message">Ingresa tus criterios y presiona "Buscar" para comenzar.</div>
      )}
    </>
  );
}

export default App;