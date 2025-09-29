import { GeocodingResponse, WeatherResponse } from './types';
const GEOCODING_URL = 'https://geocoding-api.open-meteo.com/v1/search';
const WEATHER_URL = 'https://api.open-meteo.com/v1/forecast';

//  Busca ciudades por nombre
export async function searchCities(cityName: string): Promise<GeocodingResponse> {
  if (!cityName || cityName.trim().length < 2) {
    return { results: [] };
  }

  try {
    const params = new URLSearchParams({
      name: cityName.trim(),
      count: '5',
      language: 'es',
      format: 'json'
    });

    const response = await fetch(`${GEOCODING_URL}?${params}`);
    
    if (!response.ok) {
      throw new Error('Error al buscar ciudades');
    }

    const data: GeocodingResponse = await response.json();
    return data;
  } catch (error) {
    console.error('Error en searchCities:', error);
    throw error;
  }
}

//  Obtiene el clima actual y pronóstico por hora para una ubicación dada
export async function getWeather(
  latitude: number,
  longitude: number
): Promise<WeatherResponse> {
  try {
    const params = new URLSearchParams({
      latitude: latitude.toString(),
      longitude: longitude.toString(),
      current_weather: 'true',
      hourly: 'temperature_2m,relativehumidity_2m,weathercode',
      forecast_days: '3',
      timezone: 'auto'
    });

    const response = await fetch(`${WEATHER_URL}?${params}`);
    
    if (!response.ok) {
      throw new Error('Error al obtener el clima');
    }

    const data: WeatherResponse = await response.json();
    return data;
  } catch (error) {
    console.error('Error en getWeather:', error);
    throw error;
  }
}

// Mapea códigos de clima a descripciones en español
export function getWeatherDescription(code: number): string {
  const weatherCodes: Record<number, string> = {
    0: 'Despejado',
    1: 'Principalmente despejado',
    2: 'Parcialmente nublado',
    3: 'Nublado',
    45: 'Neblina',
    48: 'Niebla con escarcha',
    51: 'Llovizna ligera',
    53: 'Llovizna moderada',
    55: 'Llovizna intensa',
    56: 'Llovizna helada ligera',
    57: 'Llovizna helada intensa',
    61: 'Lluvia ligera',
    63: 'Lluvia moderada',
    65: 'Lluvia intensa',
    71: 'Nevada ligera',
    73: 'Nevada moderada',
    75: 'Nevada intensa',
    77: 'Granizo',
    80: 'Chubascos ligeros',
    81: 'Chubascos moderados',
    82: 'Chubascos intensos',
    85: 'Chubascos de nieve ligeros',
    86: 'Chubascos de nieve intensos',
    95: 'Tormenta',
    96: 'Tormenta con granizo ligero',
    99: 'Tormenta con granizo intenso'
  };

  return weatherCodes[code] || 'Desconocido';
}