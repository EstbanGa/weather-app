# Documentación de API - Open-Meteo

Esta aplicación utiliza la API gratuita de Open-Meteo para obtener datos meteorológicos. No requiere autenticación ni API key.

## Base URLs

- Geocoding API: `https://geocoding-api.open-meteo.com/v1`
- Weather Forecast API: `https://api.open-meteo.com/v1`

---

## 1. Búsqueda de Ciudades (Geocoding)

### Endpoint

```
GET /v1/search
```

### URL Completa

```
https://geocoding-api.open-meteo.com/v1/search
```

### Ejemplo de Request

```
GET https://geocoding-api.open-meteo.com/v1/search?name=Medellin&count=5&language=es&format=json
```

### Ejemplo de Response (Exitoso)

```json
{
  "results": [
    {
      "id": 3674962,
      "name": "Medellín",
      "latitude": 6.25184,
      "longitude": -75.56359,
      "elevation": 1495.0,
      "feature_code": "PPLA",
      "country_code": "CO",
      "admin1_id": 3689815,
      "admin2_id": 3674961,
      "admin3_id": 0,
      "admin4_id": 0,
      "timezone": "America/Bogota",
      "population": 1999979,
      "postcodes": [
        "050001"
      ],
      "country_id": 3686110,
      "country": "Colombia",
      "admin1": "Antioquia",
      "admin2": "Medellín",
      "admin3": "",
      "admin4": ""
    },
    {
      "id": 3674961,
      "name": "Medellín",
      "latitude": 6.29056,
      "longitude": -75.57361,
      "elevation": 1554.0,
      "feature_code": "ADM2",
      "country_code": "CO",
      "country": "Colombia",
      "admin1": "Antioquia"
    }
  ],
  "generationtime_ms": 0.234
}
```

### Campos Relevantes de la Respuesta

- id: Identificador único de la ciudad
- name: Nombre de la ciudad
- latitude: Latitud geográfica
- longitude: Longitud geográfica
- country: Nombre del país
- admin1: Estado/Región/Provincia

---

## 2. Pronóstico del Clima (Weather Forecast)

### Endpoint

```
GET /v1/forecast
```

### URL Completa

```
https://api.open-meteo.com/v1/forecast
```

### Variables Horarias Disponibles

- `temperature_2m`: Temperatura a 2 metros de altura (°C)
- `relativehumidity_2m`: Humedad relativa (%)
- `weathercode`: Código WMO del clima
- `windspeed_10m`: Velocidad del viento a 10m (km/h)
- `precipitation`: Precipitación (mm)

### Ejemplo de Request

```
GET https://api.open-meteo.com/v1/forecast?latitude=6.2518&longitude=-75.5636&current_weather=true&hourly=temperature_2m,relativehumidity_2m,weathercode&forecast_days=3&timezone=auto
```

### Ejemplo de Response

```json
{
  "latitude": 6.25,
  "longitude": -75.5625,
  "generationtime_ms": 0.234,
  "utc_offset_seconds": -18000,
  "timezone": "America/Bogota",
  "timezone_abbreviation": "-05",
  "elevation": 1517.0,
  "current_weather": {
    "temperature": 22.5,
    "windspeed": 8.4,
    "winddirection": 245,
    "weathercode": 3,
    "is_day": 1,
    "time": "2025-09-29T14:00"
  },
  "hourly_units": {
    "time": "iso8601",
    "temperature_2m": "°C",
    "relativehumidity_2m": "%",
    "weathercode": "wmo code"
  },
  "hourly": {
    "time": [
      "2025-09-29T00:00",
      "2025-09-29T01:00",
      "2025-09-29T02:00",
      "2025-09-29T03:00"
    ],
    "temperature_2m": [
      20.5,
      20.1,
      19.8,
      19.5
    ],
    "relativehumidity_2m": [
      75,
      78,
      80,
      82
    ],
    "weathercode": [
      2,
      2,
      3,
      3
    ]
  }
}
```

### Campos de current_weather

- temperature: Temperatura actual en °C
- windspeed: Velocidad del viento en km/h
- winddirection: Dirección del viento en grados
- weathercode: Código WMO del estado del tiempo
- is_day: 1 si es de día, 0 si es de noche
- time: Timestamp de la medición

### Campos de hourly

- time: Array de timestamps en formato ISO8601
- temperature_2m: Array de temperaturas por hora
- relativehumidity_2m: Array de porcentajes de humedad
- weathercode: Array de códigos del clima

---

## 3. Códigos del Clima (WMO Weather Codes)

Los códigos siguen el estándar WMO (World Meteorological Organization):

| Código | Descripción                    |
|--------|--------------------------------|
| 0      | Despejado                      |
| 1      | Principalmente despejado       |
| 2      | Parcialmente nublado           |
| 3      | Nublado                        |
| 45     | Neblina                        |
| 48     | Niebla con escarcha            |
| 51     | Llovizna ligera                |
| 53     | Llovizna moderada              |
| 55     | Llovizna intensa               |
| 56     | Llovizna helada ligera         |
| 57     | Llovizna helada intensa        |
| 61     | Lluvia ligera                  |
| 63     | Lluvia moderada                |
| 65     | Lluvia intensa                 |
| 71     | Nevada ligera                  |
| 73     | Nevada moderada                |
| 75     | Nevada intensa                 |
| 77     | Granizo                        |
| 80     | Chubascos ligeros              |
| 81     | Chubascos moderados            |
| 82     | Chubascos intensos             |
| 85     | Chubascos de nieve ligeros     |
| 86     | Chubascos de nieve intensos    |
| 95     | Tormenta                       |
| 96     | Tormenta con granizo ligero    |
| 99     | Tormenta con granizo intenso   |

---

## 4. Manejo de Errores

### Errores Comunes

400 Bad Request
- Parámetros faltantes o inválidos
- Coordenadas fuera de rango

404 Not Found
- Endpoint incorrecto

429 Too Many Requests
- Límite de peticiones excedido

500 Internal Server Error
- Error del servidor de Open-Meteo

---

## 5. Referencias

- Documentación oficial: https://open-meteo.com/en/docs
- Geocoding API: https://open-meteo.com/en/docs/geocoding-api
- Weather Forecast API: https://open-meteo.com/en/docs

---

## Notas Adicionales

- Todos los datos de temperatura están en grados Celsius
- Las velocidades del viento están en km/h
- Los timestamps están en formato ISO8601