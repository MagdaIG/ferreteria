<template>
  <section v-if="!loading && !errorMessage">
    <nav class="navbar navbar-expand-lg navbar-dark custom-navbar">
      <div class="container-fluid">
        <!-- Nombre de la ferretería con el logo -->
        <router-link to="/" class="navbar-brand d-flex align-items-center">
          <img src="@/assets/logo.png" alt="Logo Ferretería" class="logo me-2" />
          {{ homeInfo?.paginaHome?.nombre || "Cargando..." }}
        </router-link>
        <!-- Botón toggler para dispositivos pequeños -->
        <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <!-- Menú de navegación -->
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav ms-auto align-items-center">
            <li class="nav-item">
              <router-link to="/" class="nav-link">Home</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/productos" class="nav-link">Productos</router-link>
            </li>
            <li class="nav-item" v-if="isAuthenticated">
              <router-link to="/proveedores" class="nav-link">Proveedores</router-link>
            </li>
            <li class="nav-item" v-if="isAuthenticated">
              <span class="nav-link text-highlight">Hola, {{ user.name }}!</span>
            </li>
            <li class="nav-item" v-if="!isAuthenticated">
              <span class="badge guest-badge">Navegando como Invitado</span>
            </li>
            <li class="nav-item" v-if="!isAuthenticated">
              <router-link to="/login" class="nav-link">Iniciar Sesión</router-link>
            </li>
            <li class="nav-item" v-else>
              <button class="btn btn-outline-danger btn-sm" @click="logout">Cerrar Sesión</button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </section>
</template>

<script>
import { useMainStore } from "@/stores";
import { computed, onMounted } from "vue";

export default {
  name: "Navbar",
  setup() {
    const store = useMainStore();

    // Accedemos a las propiedades reactivas del store
    const homeInfo = computed(() => store.homeInfo);
    const isAuthenticated = computed(() => store.isAuthenticated);
    const user = computed(() => store.user);
    const loading = computed(() => store.loading);
    const errorMessage = computed(() => store.errorMessage);

    // Cargamos los datos de home al montar el componente
    onMounted(() => {
      if (!homeInfo.value || Object.keys(homeInfo.value).length === 0) {
        store.fetchHomeData();
      }
    });

    return {
      homeInfo,
      isAuthenticated,
      user,
      loading,
      errorMessage,
      logout: store.logout,
    };
  },
};
</script>

<style scoped>
/* Estilos personalizados (igual que antes) */
.custom-navbar {
  background-color: rgb(0, 0, 0);
  padding: 1rem 1.5rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  color: white;
}

.navbar-brand {
  font-size: 1.5rem;
  color: rgb(255, 255, 255);
  font-weight: bold;
  display: flex;
  align-items: center;
}

.navbar-brand:hover {
  color: #f8f9fa;
}

.logo {
  height: 40px;
}

.nav-link {
  color: #f8f9fa;
  font-size: 1rem;
  font-weight: 500;
  margin-right: 1rem;
  transition: color 0.3s ease-in-out;
}

.nav-link:hover {
  color: #d07622;
}

.text-highlight {
  color: #d07622;
  font-weight: bold;
}

.guest-badge {
  background-color: #731111;
  font-size: 0.9rem;
  padding: 0.3rem 0.6rem;
  border-radius: 8px;
  font-weight: 500;
  color: white;
}

.btn-outline-danger {
  font-size: 0.9rem;
  padding: 0.4rem 0.8rem;
  border: 1px solid #d07622;
  color: #d07622;
  transition: all 0.3s ease-in-out;
}

.btn-outline-danger:hover {
  background-color: #d07622;
  color: #ffffff;
}
</style>