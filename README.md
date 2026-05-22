# VetApp - Sistema de Citas Veterinarias

Sistema web para gestión de citas veterinarias desarrollado con ASP.NET Core y React.

## Tecnologías
- .NET 8
- Entity Framework Core 8 (SQLite)
- ASP.NET Core Web API
- React + Vite
- React Router DOM
- Axios

## Requisitos
- .NET 8 SDK
- Node.js

## Instalación

### Backend
```bash
dotnet restore
dotnet ef database update
dotnet run
```

### Frontend
```bash
cd vista
npm install
npm run dev
```

## Endpoints principales
- GET/POST /api/Veterinario
- GET/POST /api/Mascota
- GET/POST /api/Cita

## Autor
Jose Medina
