# AlivIA - Gestión de Dolor

Aplicación completa de gestión de dolor con seguimiento de dolor, adherencia a medicamentos y análisis con un diseño minimalista y accesible.

## Características

- 📱 **Diseño Responsive**: Optimizado para móvil, tablet y escritorio
- 🎨 **Interfaz Moderna**: Diseño limpio con modo oscuro
- 📊 **Gráficos y Análisis**: Visualización de tendencias de dolor
- 💊 **Gestión de Medicamentos**: Seguimiento de dosis y stock
- 🗺️ **Mapa Corporal**: Selección visual de zonas de dolor
- 📝 **Registro Detallado**: Flujo completo de registro de episodios de dolor

## Tecnologías

- React 19
- Vite
- TypeScript
- Tailwind CSS
- Zustand (State Management)
- Framer Motion (Animaciones)
- Recharts (Gráficos)
- Lucide React (Iconos)
- date-fns (Fechas)

## Requisitos Previos

- Node.js (v18 o superior)

## Instalación

1. Instalar dependencias:
   ```bash
   npm install
   ```

2. Ejecutar en modo desarrollo:
   ```bash
   npm run dev
   ```

3. Abrir en el navegador:
   ```
   http://localhost:3000
   ```

## Scripts Disponibles

- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Construye la aplicación para producción
- `npm run preview` - Previsualiza la build de producción

## Estructura del Proyecto

```
gokualivia/
├── components/       # Componentes reutilizables
│   ├── UI.tsx       # Componentes de UI (Button, Card, etc.)
│   ├── Icons.tsx    # Iconos
│   └── BodyMap.tsx  # Mapa corporal interactivo
├── screens/          # Pantallas principales
│   ├── Tabs.tsx     # Tabs de navegación
│   └── PainFlow.tsx # Flujo de registro de dolor
├── App.tsx          # Componente principal
├── store.ts         # Estado global (Zustand)
├── types.ts         # Tipos TypeScript
└── utils.ts         # Utilidades y datos mock

```

## Licencia

Este proyecto es privado.

