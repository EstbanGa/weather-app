# Aplicación del Clima mas Chimba del Mundo

Aplicación web para consultar el clima actual y pronóstico. Desarrollada con Next.js 14, TypeScript y Tailwind CSS.

## Características

- Búsqueda de ciudades con sugerencias automáticas
- Visualización del clima actual (temperatura, estado del tiempo, viento)
- Pronóstico detallado de 3 días
- Sistema de favoritos

## Tecnologías Utilizadas

- Next.js 14+
- TypeScript
- Tailwind CSS
- Open-Meteo API

## Requisitos Previos

- Node.js 18.0 o superior
- npm o yarn

## Instalación

1. Clonar el repositorio:

```bash
git clone https://github.com/EstbanGa/weather-app.git
cd weather-app
```

2. Instalar dependencias:

```bash
npm install
```

3. Ejecutar en modo desarrollo:

```bash
npm run dev
```

4. Abrir en el navegador:

```
http://localhost:3000
```

## Estructura del Proyecto

```
weather-app/
├── app/                    # Páginas y rutas
│   ├── layout.tsx         # Layout principal
│   ├── page.tsx           # Página de inicio
│   ├── favoritos/         # Página de favoritos
│   └── sobre/             # Página informativa
├── components/            # Componentes reutilizables
│   ├── Navigation.tsx     # Menú de navegación
│   ├── SearchBar.tsx      # Buscador con sugerencias
│   ├── WeatherCard.tsx    # Tarjeta del clima actual
│   └── ForecastTable.tsx  # Tabla del pronóstico
├── lib/                   # Lógica de negocio
│   ├── types.ts          # Tipos TypeScript
│   ├── api.ts            # Funciones para la API
│   └── favorites.ts      # Gestión de favoritos
└── docs/
    └── api.md            # Documentación de la API
```

## Uso de la Aplicación

### Buscar una Ciudad

1. Ingresar el nombre de la ciudad en el campo de búsqueda
2. Esperar las sugerencias (mínimo 2 caracteres)
3. Seleccionar la ciudad deseada de la lista
4. Ver el clima actual y el pronóstico

### Agregar a Favoritos

1. Buscar y seleccionar una ciudad
2. Hacer clic en la estrella vacía para agregar a favoritos
3. Acceder a la página de Favoritos desde el menú superior

### Ver Favoritos

1. Navegar a la sección "Favoritos"
2. Ver todas las ciudades guardadas con su clima actualizado
3. Hacer clic en la X para eliminar una ciudad de favoritos

## API Utilizada

La aplicación consume los siguientes endpoints de Open-Meteo:

### Geocoding (Búsqueda de ciudades)

```
GET https://geocoding-api.open-meteo.com/v1/search
```

Parámetros:
- `name`: Nombre de la ciudad
- `count`: Número máximo de resultados
- `language`: Idioma de los resultados

### Forecast (Pronóstico del clima)

```
GET https://api.open-meteo.com/v1/forecast
```

Parámetros:
- `latitude`: Latitud de la ubicación
- `longitude`: Longitud de la ubicación
- `current_weather`: true
- `hourly`: temperature_2m, relativehumidity_2m, weathercode
- `forecast_days`: 3


## Funcionalidades Implementadas

- Búsqueda de ciudades con debounce de 300ms
- Máximo 5 sugerencias por búsqueda
- Manejo de estados: cargando, error, sin resultados, datos exitosos
- Almacenamiento de favoritos en localStorage
- Navegación entre páginas

