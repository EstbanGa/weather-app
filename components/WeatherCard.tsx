'use client';

import { City, WeatherResponse } from '@/lib/types';
import { getWeatherDescription } from '@/lib/api';
import { addFavorite, removeFavorite, isFavorite } from '@/lib/favorites';
import { useState, useEffect } from 'react';

interface WeatherCardProps {
  city: City;
  weather: WeatherResponse;
  onFavoriteChange?: () => void;
}

export default function WeatherCard({ city, weather, onFavoriteChange }: WeatherCardProps) {
  const [favorite, setFavorite] = useState(false);

  useEffect(() => {
    setFavorite(isFavorite(city.id));
  }, [city.id]);

  const handleToggleFavorite = () => {
    if (favorite) {
      removeFavorite(city.id);
      setFavorite(false);
    } else {
      addFavorite(city);
      setFavorite(true);
    }
    onFavoriteChange?.();
  };

  const { current_weather } = weather;
  const description = getWeatherDescription(current_weather.weathercode);

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 border-2 border-gray-200">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">{city.name}</h2>
          <p className="text-gray-600">{city.country}</p>
        </div>
        
        <button
          onClick={handleToggleFavorite}
          className="text-3xl hover:scale-110 transition-transform"
          title={favorite ? 'Quitar de favoritos' : 'Agregar a favoritos'}
        >
          {favorite ? '⭐' : '☆'}
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-6">
        <div className="bg-blue-50 rounded-lg p-4">
          <p className="text-sm text-gray-600">Temperatura</p>
          <p className="text-4xl font-bold text-blue-600">
            {Math.round(current_weather.temperature)}°C
          </p>
        </div>

        <div className="bg-blue-50 rounded-lg p-4">
          <p className="text-sm text-gray-600">Estado</p>
          <p className="text-lg font-semibold text-gray-900 mt-2">
            {description}
          </p>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-200">
        <p className="text-sm text-gray-600">
          Viento: <span className="font-semibold">{current_weather.windspeed} km/h</span>
        </p>
      </div>
    </div>
  );
}