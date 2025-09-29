'use client';

import { useState } from 'react';
import SearchBar from '@/components/SearchBar';
import WeatherCard from '@/components/WeatherCard';
import ForecastTable from '@/components/ForecastTable';
import { City, WeatherResponse } from '@/lib/types';
import { getWeather } from '@/lib/api';

export default function HomePage() {
  const [selectedCity, setSelectedCity] = useState<City | null>(null);
  const [weather, setWeather] = useState<WeatherResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSelectCity = async (city: City) => {
    setSelectedCity(city);
    setIsLoading(true);
    setError(null);
    setWeather(null);

    try {
      const weatherData = await getWeather(city.latitude, city.longitude);
      setWeather(weatherData);
    } catch (err) {
      setError('No se pudo obtener el clima. Por favor intenta de nuevo.');
      console.error('Error obteniendo clima:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          ¿Cómo está el clima hoy?
        </h1>
        <p className="text-gray-600 text-lg">
          Busca cualquier ciudad para ver el clima actual y pronóstico
        </p>
      </div>

      {/* Buscador */}
      <div className="mb-8">
        <SearchBar onSelectCity={handleSelectCity} />
      </div>

      {/* Loading */}
      {isLoading && (
        <div className="flex flex-col items-center justify-center py-12">
          <div className="animate-spin h-16 w-16 border-4 border-blue-500 border-t-transparent rounded-full mb-4"></div>
          <p className="text-gray-600 text-lg">Cargando información del clima...</p>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="bg-red-100 border-2 border-red-400 text-red-700 px-6 py-4 rounded-lg mb-8">
          <p className="font-semibold">Error:</p>
          <p>{error}</p>
        </div>
      )}

      {/* Resultados del clima */}
      {weather && selectedCity && !isLoading && (
        <div className="space-y-6">
          <WeatherCard city={selectedCity} weather={weather} />
          <ForecastTable weather={weather} />
        </div>
      )}

      {/* Estado inicial */}
      {!weather && !isLoading && !error && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🌍</div>
          <p className="text-gray-500 text-lg">
            Busca una ciudad para comenzar
          </p>
        </div>
      )}
    </div>
  );
}