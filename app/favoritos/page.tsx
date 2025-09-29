'use client';

import { useState, useEffect } from 'react';
import { FavoriteCity, WeatherResponse } from '@/lib/types';
import { getFavorites, removeFavorite } from '@/lib/favorites';
import { getWeather, getWeatherDescription } from '@/lib/api';

export default function FavoritosPage() {
  const [favorites, setFavorites] = useState<FavoriteCity[]>([]);
  const [weatherData, setWeatherData] = useState<Record<number, WeatherResponse>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    setLoading(true);
    const favs = getFavorites();
    setFavorites(favs);

    // Cargar clima de cada favorito
    const weatherPromises = favs.map(async (fav) => {
      try {
        const weather = await getWeather(fav.latitude, fav.longitude);
        return { id: fav.id, weather };
      } catch (error) {
        console.error(`Error cargando clima de ${fav.name}:`, error);
        return null;
      }
    });

    const results = await Promise.all(weatherPromises);
    const weatherMap: Record<number, WeatherResponse> = {};
    
    results.forEach((result) => {
      if (result) {
        weatherMap[result.id] = result.weather;
      }
    });

    setWeatherData(weatherMap);
    setLoading(false);
  };

  const handleRemove = (cityId: number) => {
    removeFavorite(cityId);
    setFavorites(favorites.filter(fav => fav.id !== cityId));
    const newWeatherData = { ...weatherData };
    delete newWeatherData[cityId];
    setWeatherData(newWeatherData);
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-center py-12">
          <div className="animate-spin h-16 w-16 border-4 border-blue-500 border-t-transparent rounded-full mb-4"></div>
          <p className="text-gray-600 text-lg">Cargando favoritos...</p>
        </div>
      </div>
    );
  }

  if (favorites.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Mis Favoritos</h1>
        
        <div className="text-center py-12">
          <div className="text-6xl mb-4">⭐</div>
          <p className="text-gray-500 text-lg mb-4">
            Aún no tienes ciudades favoritas
          </p>
          <p className="text-gray-400">
            Busca una ciudad y agrégala a favoritos con la estrella
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">Mis Favoritos</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {favorites.map((fav) => {
          const weather = weatherData[fav.id];
          
          return (
            <div
              key={fav.id}
              className="bg-white rounded-lg shadow-lg p-6 border-2 border-gray-200 hover:shadow-xl transition-shadow"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{fav.name}</h2>
                  <p className="text-gray-600">{fav.country}</p>
                </div>
                
                <button
                  onClick={() => handleRemove(fav.id)}
                  className="text-2xl hover:scale-110 transition-transform"
                  title="Quitar de favoritos"
                >
                  ❌
                </button>
              </div>

              {weather ? (
                <div className="space-y-3">
                  <div className="bg-blue-50 rounded-lg p-4">
                    <p className="text-3xl font-bold text-blue-600">
                      {Math.round(weather.current_weather.temperature)}°C
                    </p>
                    <p className="text-gray-700 mt-1">
                      {getWeatherDescription(weather.current_weather.weathercode)}
                    </p>
                  </div>
                  
                  <p className="text-sm text-gray-600">
                    Viento: {weather.current_weather.windspeed} km/h
                  </p>
                </div>
              ) : (
                <div className="text-center py-4">
                  <div className="animate-spin h-8 w-8 border-2 border-blue-500 border-t-transparent rounded-full mx-auto"></div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}