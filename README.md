# Gym Reservations Frontend
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)]()
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)]()
[![Tailwind](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)]()

Este proyecto es el Frontend de una aplicación de reservas de gimnasio, construido con el objetivo de aprender a conectar una SPA (Single Page Application) con una API REST backend usando buenas prácticas.

> **⚠️ Importante:** Este proyecto requiere su respectiva API para funcionar. Puedes encontrar el código del Backend (Node.js + Prisma) en este repositorio: https://github.com/marbobe/gym-reservation-api


<img width="1274" height="453" alt="image" src="https://github.com/user-attachments/assets/d6a4d6d7-d883-4617-9512-f9a5d67c2ea6" />
<img width="1554" height="694" alt="image" src="https://github.com/user-attachments/assets/82782d1a-ddd0-4e1d-bfff-5212233eafed" />
<img width="1554" height="694" alt="image" src="https://github.com/user-attachments/assets/73146c34-eb50-4ec6-b305-5b97a3d83b8a" />
<img width="1554" height="694" alt="image" src="https://github.com/user-attachments/assets/7e66ff43-6870-4f80-9dc4-e4cdac6b49ea" />
<img width="1554" height="694" alt="image" src="https://github.com/user-attachments/assets/6b1112e9-7af8-4db3-8785-42fecabd822d" />


## Características Principales

- **Dashboard Estadístico:** Visualización en tiempo real de métricas (reservas totales, activas, salas más demandadas).
- **Gestión de Reservas:** Sistema completo para crear, editar, y cancelar reservas evitando conflictos de horarios.
- **Directorio de Espacios:** Vista detallada de las salas disponibles.
- **Diseño UI/UX:** Interfaz limpia, minimalista y 100% responsive construida con Tailwind CSS.
- **Manejo de Errores:** Intercepción de respuestas de la API para mostrar feedback visual al usuario.

## Stack Tecnológico
- **Framework:** React (Vite)
- **Lenguaje:** TypeScript
- **Estilos:** Tailwind CSS
- **Cliente HTTP:** Axios
- **Navegación:** React Router DOM
- **Iconos:** Lucide React

## Estructura del Proyecto
Se ha seguido un enfoque de separación por capas de responsabilidad:
- `src/api`: Configuración del cliente HTTP y baseURL.
- `src/components`: Componentes visuales puros y reutilizables (Botones, Badges, etc).
- `src/hooks`: Lógica de gestión de estado e interacción con servicios.
- `src/pages`: Vistas completas que ensamblan los componentes.
- `src/services`: Capa de abstracción para las llamadas directas a la API.
- `src/types`: Definiciones de interfaces (TypeScript) basadas en los modelos del backend.

## Cómo Empezar

1. Clona este repositorio.
2. Instala las dependencias:```npm install```
3. Inicia el servidor de desarrollo: ```npm run dev```
