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

- Next.js 15
- React 19
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

   Nota: Next.js usa el puerto 3000 por defecto. Si está ocupado, usará el siguiente disponible.

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

## Configuración de GitHub

Para crear y subir el repositorio a GitHub:

1. Crea un nuevo repositorio en GitHub (sin inicializar con README, .gitignore o licencia)

2. Conecta el repositorio local con GitHub:
   ```bash
   git remote add origin https://github.com/TU_USUARIO/gokualivia.git
   ```

3. Renombra la rama principal si es necesario:
   ```bash
   git branch -M main
   ```

4. Sube el código:
   ```bash
   git push -u origin main
   ```

## Características Responsive

El proyecto está optimizado para:
- **Móvil**: Diseño base con ancho máximo móvil
- **Tablet** (md:): Adaptaciones para pantallas medianas
- **Escritorio** (lg:): Optimizaciones para pantallas grandes

Todos los componentes se adaptan automáticamente manteniendo el diseño móvil como base.

## Licencia

Este proyecto es privado.

