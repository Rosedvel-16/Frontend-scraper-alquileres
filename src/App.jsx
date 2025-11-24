// src/App.jsx

import React, { useState, useCallback } from 'react';
import SearchBar from './components/SearchBar';
import ResultsList from './components/ResultsList';
import Pagination from './components/Pagination'; 
import Banner from './components/Banner';

const API_BASE_URL = 'https://backend-scraper-alguileres.onrender.com';
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
    const url = `${API_BASE_URL}/scrape-all?${queryString}`;
    
    console.log("Llamando a la API:", url);

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Error del servidor: ${response.statusText}`);
      }
      
      const data = await response.json();
      
      setAllResults(data); // 5. Guardar TODOS los resultados
      setCurrentPage(1); // 6. Resetear a la página 1 en cada nueva búsqueda
      console.log("Resultados recibidos:", data);

    } catch (err) {
      console.error("Error al hacer fetch:", err);
      setError(err.message || 'Ocurrió un error al conectar con la API.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // --- 7. Lógica de Paginación ---
  const totalPages = Math.ceil(allResults.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentResults = allResults.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  // ------------------------------

  // 8. Función para cambiar de página y hacer scroll-top
  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0); // Opcional: lleva al usuario al tope de la página
  };

  // 9. Actualizamos el renderizado
  return (
    <>
      <Banner />

      <SearchBar onSearch={handleSearch} isLoading={isLoading} />
      {/* Si no está cargando, no hay error, y ya se buscó */}
      {!isLoading && !error && hasSearched && (
        <>
          {allResults.length === 0 ? (
            <div className="status-message">No se encontraron resultados para tu búsqueda.</div>
          ) : (
            <>
              <p className="status-message">
                Mostrando {currentResults.length} de {allResults.length} resultados totales (Página {currentPage} de {totalPages}).
              </p>
              {/* Le pasamos solo los resultados de la página actual */}
              <ResultsList results={currentResults} /> 
              {/* Renderizamos el componente de paginación */}
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </>
          )}
        </>
      )}

      {/* Mensaje inicial antes de la primera búsqueda */}
      {!isLoading && !error && !hasSearched && (
        <div className="status-message">Ingresa tus criterios y presiona "Buscar" para comenzar.</div>
      )}
    </>
  );
}

export default App;