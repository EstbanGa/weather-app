import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navigation from '@/components/Navigation';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'El Clima - Consulta el clima en cualquier ciudad',
  description: 'Aplicación web para consultar el clima actual y pronóstico de 3 días en cualquier ciudad del mundo',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <Navigation />
        <main className="min-h-screen bg-gray-50">
          {children}
        </main>
        <footer className="bg-gray-800 text-white py-6 mt-12">
          <div className="container mx-auto px-4 text-center">
            <p>© 2025 El Clima - Datos proporcionados por Open-Meteo</p>
          </div>
        </footer>
      </body>
    </html>
  );
}