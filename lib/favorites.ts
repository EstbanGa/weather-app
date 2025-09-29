import { FavoriteCity, City } from './types';

const FAVORITES_KEY = 'weather-app-favorites';

// Obtiene la lista de favoritos desde localStorage
export function getFavorites(): FavoriteCity[] {
  if (typeof window === 'undefined') {
    return [];
  }

  try {
    const stored = localStorage.getItem(FAVORITES_KEY);
    if (!stored) {
      return [];
    }
    return JSON.parse(stored) as FavoriteCity[];
  } catch (error) {
    console.error('Error al leer favoritos:', error);
    return [];
  }
}


// Guarda una ciudad en favoritos
export function addFavorite(city: City): boolean {
  try {
    const favorites = getFavorites();
    
    // Verificar si ya existe
    const exists = favorites.some(fav => fav.id === city.id);
    if (exists) {
      return false;
    }

    const newFavorite: FavoriteCity = {
      id: city.id,
      name: city.name,
      country: city.country,
      latitude: city.latitude,
      longitude: city.longitude,
      addedAt: new Date().toISOString()
    };

    const updated = [...favorites, newFavorite];
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
    return true;
  } catch (error) {
    console.error('Error al agregar favorito:', error);
    return false;
  }
}


// Elimina una ciudad de favoritos
export function removeFavorite(cityId: number): boolean {
  try {
    const favorites = getFavorites();
    const updated = favorites.filter(fav => fav.id !== cityId);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
    return true;
  } catch (error) {
    console.error('Error al eliminar favorito:', error);
    return false;
  }
}


// Verifica si una ciudad está en favoritos
export function isFavorite(cityId: number): boolean {
  const favorites = getFavorites();
  return favorites.some(fav => fav.id === cityId);
}


// Limpia todos los favoritos
export function clearFavorites(): void {
  try {
    localStorage.removeItem(FAVORITES_KEY);
  } catch (error) {
    console.error('Error al limpiar favoritos:', error);
  }
}