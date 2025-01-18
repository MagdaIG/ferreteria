import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { createPinia } from 'pinia'; // Gestión de estado con Pinia

// Estilos globales
import './styles/main.scss'; // Tus estilos personalizados
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap estilos
import 'bootstrap'; // Bootstrap scripts
import "@fortawesome/fontawesome-free/css/all.css"; // Font Awesome para íconos

// Crear instancia de la aplicación
const app = createApp(App);

// Configurar plugins
app.use(router); // Agregar Vue Router
app.use(createPinia()); // Agregar Pinia (gestión de estado)
// Montar la aplicación
app.mount('#app');