# SaloSaaS - Sistema de Gestión de Ajolotes

Sistema integral para la gestión, reproducción y cuidado de ajolotes.

## Características principales

- ✨ **Interfaz moderna**: Diseño limpio y minimalista inspirado en Notion
- 🌙 **Modo claro/oscuro**: Switch global para cambiar entre temas
- 🔐 **Autenticación completa**: Login, signup y logout con NextAuth.js
- 📱 **Responsive**: Diseño optimizado para móvil y desktop
- 🎨 **Componentes reutilizables**: UI components con Tailwind CSS
- 📊 **Gráficos interactivos**: Dashboards con Recharts
- 🔔 **Notificaciones**: Sistema de alertas con react-toastify
- 🗂️ **Gestión de estado**: Redux Toolkit para state management

## Tecnologías utilizadas

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Redux Toolkit
- **Authentication**: NextAuth.js
- **Forms**: React Hook Form + Zod
- **Charts**: Recharts
- **Icons**: Lucide React
- **Notifications**: React Toastify

## Estructura del proyecto

```
src/
├── app/                 # App Router (Next.js 14)
│   ├── api/            # API routes
│   ├── dashboard/      # Dashboard pages
│   ├── login/         # Login page
│   ├── signup/        # Signup page
│   └── layout.tsx     # Global layout
├── components/         # Reusable components
│   ├── ui/            # Basic UI components
│   └── layout/        # Layout components
├── lib/               # Utilities and configurations
├── redux/             # State management
│   ├── reducers/      # Redux slices
│   └── thunks/        # Async actions
├── types/             # TypeScript interfaces
└── styles/            # Global styles
```

## Instalación

1. Clonar el repositorio
2. Instalar dependencias:
   ```bash
   npm install
   ```
3. Configurar variables de entorno (crear `.env.local`)
   ```bash
   cp .env.example .env.local
   ```
4. Ejecutar el servidor de desarrollo:
   ```bash
   npm run dev
   ```
5. Abrir en el navegador: `http://localhost:3000`

## Desarrollo

- `npm run dev`: Iniciar servidor de desarrollo
- `npm run build`: Construir para producción
- `npm run start`: Iniciar servidor de producción
- `npm run lint`: Ejecutar linter
- `npm run type-check`: Verificar tipos TypeScript

## Próximos pasos

1. Configurar base de datos (Prisma)
2. Implementar middleware de autenticación
3. Crear API endpoints para CRUD operations
4. Implementar sistema de roles y permisos
5. Agregar tests unitarios e integración
# salo-frontend
