<template>
  <div class="background">
    <!-- Spinner mientras se cargan los datos -->
    <LoadingSpinner :show="loading" />

    <!-- Mensaje de error -->
    <div v-if="!loading && errorMessage" class="alert alert-danger text-center">
      {{ errorMessage }}
    </div>

    <!-- Sección Proveedores -->
    <section v-if="!loading && !errorMessage">
      <header class="hero-header">
        <div class="header-content">
          <img src="@/assets/hero-tools.png" alt="Herramientas" class="header-image" />
          <div class="header-text">
            <img src="@/assets/logo.png" alt="Logo Ferretería" class="logo mb-3" />
            <h1 class="title">{{ homeInfo?.paginaHome?.nombre || "Cargando..." }}</h1>
            <p class="tagline">Todo lo que necesitas para tus proyectos al mejor precio</p>
          </div>
        </div>
      </header>

      <section class="main-section py-5">
        <div class="container text-center mb-5">
          <div class="row">
            <div class="col-md-4">
              <div class="feature-card hero-text">
                <img src="@/assets/productos-populares.png" alt="Productos Populares" />
                <h3>Productos Populares</h3>
                <p>Explora los productos más vendidos en nuestra tienda.</p>
                <router-link to="/productos" class="btn">Ver más</router-link>
              </div>
            </div>
            <div class="col-md-4">
              <div class="feature-card hero-text">
                <img src="@/assets/ofertas.png" alt="Ofertas" />
                <h3>Ofertas</h3>
                <p>No te pierdas nuestras promociones y descuentos.</p>
                <router-link to="/productos" class="btn">Ver Ofertas</router-link>
              </div>
            </div>
            <div class="col-md-4">
              <div class="feature-card hero-text">
                <img src="@/assets/contactos.png" alt="Contáctanos" />
                <h3>Contáctanos</h3>
                <p>¿Tienes consultas? Estamos aquí para ayudarte.</p>
                <router-link to="/contacto" class="btn">Contáctanos</router-link>
              </div>
            </div>
          </div>
        </div>

        <div class="container hero-section">
          <div class="row align-items-start">
            <div class="col-md-6">
              <img src="@/assets/hero-promotion.png" alt="Promoción" class="hero-image" />
            </div>
            <div class="col-md-6 d-flex flex-column gap-3">
              <div
                  class="hero-text"
                  v-for="(promocion, index) in homeInfo?.paginaHome?.promocionesActuales || []"
                  :key="index"
              >
                <h2>{{ promocion.descripcion }}</h2>
                <p>Desde {{ promocion.fechaInicio }} hasta {{ promocion.fechaFin }}.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </section>
  </div>
</template>

<script>
import LoadingSpinner from "@/components/shared/LoadingSpinner.vue";
import { useMainStore } from "@/stores"; // Asegúrate de que el store esté correctamente configurado
import { computed, onMounted } from "vue";

export default {
  name: "Home",
  components: { LoadingSpinner },
  setup() {
    const store = useMainStore();

    // Propiedades reactivas del store
    const homeInfo = computed(() => store.homeInfo);
    const loading = computed(() => store.loading);
    const errorMessage = computed(() => store.errorMessage);

    // Llamar a la acción para cargar los datos al montar el componente
    onMounted(() => {
      if (!homeInfo.value || Object.keys(homeInfo.value).length === 0) {
        store.fetchHomeData();
      }
    });

    return {
      homeInfo,
      loading,
      errorMessage,
    };
  },
};
</script>

<style scoped>
/* Fondo General */
.background {
  background: white;
  color: #050000;
  min-height: 100vh;
  padding-bottom: 2rem;
}

/* Encabezado */
.hero-header {
  position: relative;
  height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}
.header-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 1;
  filter: brightness(0.6);
}
.header-text {
  position: relative;
  z-index: 2;
  text-align: center;
  color: #ffffff;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);
}
.logo {
  max-height: 80px;
  margin-bottom: 1rem;
}
.title {
  font-size: 3rem;
  font-weight: bold;
  margin: 0.5rem 0;
  color: #ffcc33;
}
.tagline {
  font-size: 1.2rem;
  color: #f0f0f0;
}

/* Contenedores destacados */
.feature-card {
  border: 2px solid #e0e0e0;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
  background-color: #f7f7f7;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.feature-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2);
}
.feature-card img {
  max-height: 150px;
  object-fit: cover;
  margin-bottom: 1rem;
  border-radius: 8px; /* Para mayor armonía */
}
.feature-card h3 {
  color: #000000;
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  text-align: center;
}
.feature-card p {
  text-align: center;
  margin-bottom: 1rem;
}
.feature-card .btn {
  background-color: rgba(0, 0, 0, 0.99);
  color: #ffffff;
  font-size: 1rem;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  border: none;
  transition: all 0.3s ease-in-out;
  width: 80%;
}
.feature-card .btn:hover {
  background-color: #731111;
  transform: scale(1.05);
}

/* Hero Section */
.hero-section {
  margin-top: 2rem;
}
.hero-image {
  width: 100%;
  max-height: 550px;
  object-fit: cover;
  border: 2px solid #e0e0e0;
  border-radius: 12px;
}
.hero-text {
  background-color: #ffffff;
  color: #000000;
  padding: 1.5rem;
  border-radius: 12px;
  border: 10px solid #000000;
  text-align: center;
}
.hero-text:hover {
  background-color: rgba(246, 139, 0, 0.86);
}
.hero-text h2 {
  font-size: 1.8rem;
  margin-bottom: 1rem;
}
.hero-text p {
  font-size: 1rem;
}

/* Responsividad */
@media (max-width: 768px) {
  .hero-section .row {
    flex-direction: column;
  }
  .hero-image {
    margin-bottom: 1.5rem;
  }
}
</style>