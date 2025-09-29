export default function SobrePage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">Sobre la App</h1>

      <div className="bg-white rounded-lg shadow-lg p-8 space-y-6">
        <section>
          <h2 className="text-2xl font-bold text-gray-800 mb-3">
            ¿Qué es El Clima?
          </h2>
          <p className="text-gray-700 leading-relaxed">
            El Clima es una aplicación web que te permite consultar el estado del tiempo 
            actual y el pronóstico. Diseñada para ser rápida, simple y fácil de usar.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-800 mb-3">
            Características principales
          </h2>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">✓</span>
              <span>Búsqueda rápida de ciudades con sugerencias instantáneas</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">✓</span>
              <span>Información del clima actual: temperatura, humedad y estado del tiempo</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">✓</span>
              <span>Pronóstico detallado para las próximas 72 horas</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">✓</span>
              <span>Sistema de favoritos para acceso rápido a tus ciudades frecuentes</span>
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-800 mb-3">
            Tecnologías utilizadas
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="font-semibold text-gray-800">Next.js 14+</p>
              <p className="text-sm text-gray-600">Framework de React</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="font-semibold text-gray-800">TypeScript</p>
              <p className="text-sm text-gray-600">Tipado estático</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="font-semibold text-gray-800">Tailwind CSS</p>
              <p className="text-sm text-gray-600">Estilos modernos</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="font-semibold text-gray-800">Open-Meteo API</p>
              <p className="text-sm text-gray-600">Datos del clima</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-800 mb-3">
            Fuente de datos
          </h2>
          <p className="text-gray-700 leading-relaxed">
            Todos los datos meteorológicos son proporcionados por{' '}
            <a 
              href="https://open-meteo.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline font-semibold"
            >
              Open-Meteo
            </a>
            , una API gratuita y de código abierto que ofrece pronósticos meteorológicos 
            precisos para cualquier ubicación del mundo.
          </p>
        </section>

        <section className="pt-4 border-t border-gray-200">
          <p className="text-center text-gray-600">
            Lo Mejor de lo Mejor - 2025
          </p>
        </section>
      </div>
    </div>
  );
}