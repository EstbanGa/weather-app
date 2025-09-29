'use client';

import { useState, useEffect, useRef } from 'react';
import { City } from '@/lib/types';
import { searchCities } from '@/lib/api';

interface SearchBarProps {
  onSelectCity: (city: City) => void;
}

export default function SearchBar({ onSelectCity }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<City[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const debounceTimer = useRef<NodeJS.Timeout | null>(null);

  // Búsqueda con debounce
  useEffect(() => {
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    if (query.trim().length < 2) {
      setSuggestions([]);
      return;
    }

    setIsLoading(true);

    debounceTimer.current = setTimeout(async () => {
      try {
        const response = await searchCities(query);
        setSuggestions(response.results || []);
      } catch (error) {
        console.error('Error buscando ciudades:', error);
        setSuggestions([]);
      } finally {
        setIsLoading(false);
      }
    }, 300);

    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, [query]);

  const handleSelectCity = (city: City) => {
    onSelectCity(city);
    setQuery('');
    setSuggestions([]);
    setShowSuggestions(false);
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setShowSuggestions(true);
          }}
          onFocus={() => setShowSuggestions(true)}
          placeholder="Buscar ciudad... (ej: Medellín, Bogotá)"
          className="w-full px-4 py-3 text-lg border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-gray-900"
        />
        
        {isLoading && (
          <div className="absolute right-3 top-3.5">
            <div className="animate-spin h-6 w-6 border-2 border-blue-500 border-t-transparent rounded-full"></div>
          </div>
        )}
      </div>

      {/* Lista de sugerencias */}
      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute z-10 w-full mt-2 bg-white border-2 border-gray-300 rounded-lg shadow-lg max-h-80 overflow-y-auto">
          {suggestions.map((city) => (
            <button
              key={city.id}
              onClick={() => handleSelectCity(city)}
              className="w-full px-4 py-3 text-left hover:bg-blue-50 border-b border-gray-200 last:border-b-0 transition-colors"
            >
              <div className="font-semibold text-gray-900">{city.name}</div>
              <div className="text-sm text-gray-600">
                {city.admin1 && `${city.admin1}, `}{city.country}
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Sin resultados */}
      {showSuggestions && query.trim().length >= 2 && !isLoading && suggestions.length === 0 && (
        <div className="absolute z-10 w-full mt-2 bg-white border-2 border-gray-300 rounded-lg shadow-lg p-4 text-center text-gray-600">
          No se encontraron ciudades con ese nombre
        </div>
      )}
    </div>
  );
}