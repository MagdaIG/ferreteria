# Proyecto: Ferretería

Este proyecto fue desarrollado por **Magdalena Inalaf González**. Es una aplicación construida con Vue 3 y tecnologías relacionadas.

## Tecnologías utilizadas

### Dependencias principales
- **[@fortawesome/fontawesome-free](https://fontawesome.com/):** Iconos para la interfaz.
- **[@pinia/testing](https://pinia.vuejs.org/):** Herramientas de prueba para Pinia.
- **[axios](https://axios-http.com/):** Cliente HTTP para consumir APIs.
- **[bootstrap](https://getbootstrap.com/):** Framework CSS para diseño responsivo.
- **[pinia](https://pinia.vuejs.org/):** Manejo del estado centralizado.
- **[vue-router](https://router.vuejs.org/):** Enrutador oficial de Vue.

### Dependencias de desarrollo
- **[@babel/core](https://babeljs.io/):** Compilador JavaScript.
- **[@testing-library/vue](https://testing-library.com/docs/vue-testing-library/):** Biblioteca para pruebas unitarias.
- **[@vitejs/plugin-vue](https://vitejs.dev/):** Soporte de Vue para Vite.
- **[@vue/test-utils](https://vue-test-utils.vuejs.org/):** Herramientas de prueba para Vue.
- **[sass](https://sass-lang.com/):** Preprocesador CSS.
- **[vite](https://vitejs.dev/):** Herramienta de construcción rápida.
- **[vitest](https://vitest.dev/):** Framework de pruebas unitarias.
- **[jest](https://jestjs.io/):** Framework de pruebas con soporte para JSDOM.

## Scripts

- `dev`: Inicia el entorno de desarrollo con Vite.
- `build`: Construye la aplicación para producción.
- `preview`: Previsualiza la aplicación construida.
- `test`: Ejecuta las pruebas utilizando Vitest.

## Instalación y configuración

1. Clona el repositorio:
   ```bash
   git clone <URL_DEL_REPOSITORIO>
   cd ferreteria
   ```
2. Instala las dependencias:
   ```bash
   npm install
   ```
3. Ejecuta el proyecto en modo desarrollo:
   ```bash
   npm run dev
   ```

## Estructura del proyecto

```plaintext
├── public/              # Archivos estáticos
├── src/
│   ├── assets/         # Recursos (imágenes, estilos)
│   ├── components/     # Componentes reutilizables
│   ├── router/         # Configuración de Vue Router
│   ├── store/          # Configuración de Pinia o Vuex
│   ├── views/          # Vistas principales
│   └── App.vue         # Componente raíz
├── package.json        # Configuración de dependencias y scripts
└── vite.config.js      # Configuración de Vite
```

## Pruebas

1. Ejecuta las pruebas unitarias:
   ```bash
   npm run test
   ```

## Autor

**Magdalena Inalaf González**

¡Gracias por revisar este proyecto! Si tienes alguna sugerencia o mejora, no dudes en contactarme en [magda.inalaf@gmail.com](mailto:magda.inalaf@gmail.com).
