# Gym Reservations Frontend

Este proyecto es el Frontend de una aplicación de reservas de gimnasio, construido con el objetivo de aprender a conectar una SPA (Single Page Application) con una API REST backend usando buenas prácticas.

## Objetivos del Proyecto

- Aprender y aplicar **Arquitectura Limpia** en el frontend.
- Implementar un diseño moderno y responsive usando **Tailwind CSS**.
- Gestionar las peticiones HTTP con **Axios**.
- Manejar la navegación de la aplicación con **React Router DOM**.
- Aprender las bases de **TypeScript** para tener un código más robusto y seguro.

## Stack Tecnológico

- **Framework:** React (usando Vite como bundler)
- **Lenguaje:** TypeScript
- **Estilos:** Tailwind CSS
- **Cliente HTTP:** Axios
- **Navegación:** React Router DOM
- **Iconos:** Lucide React

## Estructura del Proyecto

Se seguirá un enfoque de separación por capas de responsabilidad:

- `src/api`: Configuración del cliente HTTP.
- `src/components`: Componentes visuales reutilizables.
- `src/hooks`: Lógica de gestión de estado e interacción con servicios.
- `src/pages`: Vistas completas que ensamblan componentes.
- `src/services`: Funciones de llamada directa a la API.
- `src/types`: Definiciones de interfaces (TypeScript) basadas en el backend.

## Cómo Empezar

1. Clona este repositorio.
2. Instala las dependencias: \`npm install\`
3. Inicia el servidor de desarrollo: \`npm run dev\`
