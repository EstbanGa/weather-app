// Tipos para la búsqueda de ciudades (Geocoding)
export interface City {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  country: string;
  admin1?: string;
}

export interface GeocodingResponse {
  results?: City[];
}

// Tipos para el clima actual
export interface CurrentWeather {
  temperature: number;
  weathercode: number;
  time: string;
  windspeed: number;
}

// Tipos para el pronóstico por hora
export interface HourlyForecast {
  time: string[];
  temperature_2m: number[];
  relativehumidity_2m: number[];
  weathercode: number[];
}

// Respuesta completa de la API de clima
export interface WeatherResponse {
  latitude: number;
  longitude: number;
  current_weather: CurrentWeather;
  hourly: HourlyForecast;
  timezone: string;
}

// Tipo para favoritos
export interface FavoriteCity {
  id: number;
  name: string;
  country: string;
  latitude: number;
  longitude: number;
  addedAt: string;
}