'use client';

import { WeatherResponse } from '@/lib/types';
import { getWeatherDescription } from '@/lib/api';

interface ForecastTableProps {
  weather: WeatherResponse;
}

export default function ForecastTable({ weather }: ForecastTableProps) {
  const { hourly } = weather;

  // Agrupar datos por día
  const dailyData: Record<string, any[]> = {};

  // Proceso de 3 dias de pronostico
  hourly.time.forEach((time, index) => {
    const date = new Date(time);
    const dayKey = date.toLocaleDateString('es-ES', { 
      weekday: 'long',
      day: 'numeric', 
      month: 'long' 
    });

    if (!dailyData[dayKey]) {
      dailyData[dayKey] = [];
    }

    // Solo considera cada 3 horas para no saturar
    if (date.getHours() % 3 === 0) {
      dailyData[dayKey].push({
        time: date.toLocaleTimeString('es-ES', { 
          hour: '2-digit', 
          minute: '2-digit' 
        }),
        temp: Math.round(hourly.temperature_2m[index]),
        humidity: hourly.relativehumidity_2m[index],
        description: getWeatherDescription(hourly.weathercode[index])
      });
    }
  });

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 border-2 border-gray-200">
      <h3 className="text-2xl font-bold text-gray-900 mb-4">
        Pronóstico de 3 Días
      </h3>
      
      <div className="space-y-6">
        {Object.entries(dailyData).map(([day, hours], dayIndex) => (
          <div key={dayIndex} className="border-b border-gray-200 last:border-b-0 pb-6 last:pb-0">
            <h4 className="text-xl font-semibold text-gray-800 mb-3 capitalize">
              {day}
            </h4>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b-2 border-gray-300">
                    <th className="py-2 px-4 font-semibold text-gray-700">Hora</th>
                    <th className="py-2 px-4 font-semibold text-gray-700">Temp.</th>
                    <th className="py-2 px-4 font-semibold text-gray-700">Humedad</th>
                    <th className="py-2 px-4 font-semibold text-gray-700">Estado</th>
                  </tr>
                </thead>
                <tbody>
                  {hours.map((item, index) => (
                    <tr 
                      key={index}
                      className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
                    >
                      <td className="py-2 px-4 font-semibold text-gray-900">{item.time}</td>
                      <td className="py-2 px-4">
                        <span className="text-lg font-bold text-blue-600">
                          {item.temp}°C
                        </span>
                      </td>
                      <td className="py-2 px-4 text-gray-600">{item.humidity}%</td>
                      <td className="py-2 px-4 text-gray-700">{item.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>

      <p className="text-sm text-gray-500 mt-4">
        Pronóstico cada 3 horas para los próximos 3 días
      </p>
    </div>
  );
}