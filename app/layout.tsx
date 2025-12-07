import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'AlivIA - Gestión de Dolor',
  description: 'Aplicación completa de gestión de dolor con seguimiento, adherencia a medicamentos y análisis',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className="bg-gray-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 transition-colors duration-300">
        {children}
      </body>
    </html>
  )
}

