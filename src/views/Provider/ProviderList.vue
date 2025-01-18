<template>
  <div class="providers-container">
    <h1 class="page-title">Proveedores y Promociones</h1>

    <!-- Spinner mientras se cargan los datos -->
    <LoadingSpinner :show="loading" />

    <!-- Mensaje de error -->
    <div v-if="!loading && errorMessage" class="alert alert-danger text-center">
      {{ errorMessage }}
    </div>

    <!-- Sección Proveedores -->
    <section v-if="!loading && !errorMessage" class="providers-section">
      <h2 class="section-title">Proveedores</h2>
      <table class="table table-striped table-bordered">
        <thead>
        <tr>
          <th>Nombre</th>
          <th>Contacto</th>
          <th>Teléfono</th>
          <th>Dirección</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="provider in providers" :key="provider.nombre">
          <td>{{ provider.nombre }}</td>
          <td>{{ provider.contacto }}</td>
          <td>{{ provider.telefono }}</td>
          <td>{{ provider.direccion }}</td>
        </tr>
        </tbody>
      </table>
    </section>

    <!-- Sección Promociones -->
    <section v-if="!loading && !errorMessage" class="promotions-section">
      <h2 class="section-title">Promociones Activas</h2>
      <div class="row">
        <div
            class="promotion-card col-md-6"
            v-for="promotion in promotions"
            :key="promotion.descripcion"
        >
          <div class="promotion-card-body">
            <h3>{{ promotion.descripcion }}</h3>
            <p>
              <strong>Desde:</strong> {{ promotion.fechaInicio }}<br />
              <strong>Hasta:</strong> {{ promotion.fechaFin }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Botón para consultar productos -->
    <div v-if="!loading && !errorMessage" class="text-center my-5">
      <router-link to="/productos" class="btn btn-dark btn-lg">Consultar Productos</router-link>
    </div>

    <!-- Sección Contacto y Redes Sociales -->
    <section v-if="!loading && !errorMessage" class="contact-section">
      <h2 class="section-title">Contacto y Redes Sociales</h2>
      <div class="contact-details">
        <p><strong>Dirección:</strong> {{ contactInfo.direccion }}</p>
        <p><strong>Teléfono:</strong> {{ contactInfo.telefono }}</p>
        <p><strong>Correo Electrónico:</strong> {{ contactInfo.correoElectronico }}</p>
      </div>
      <div class="social-links">
        <a
            v-for="(url, platform) in contactInfo.redesSociales"
            :key="platform"
            :href="url"
            class="btn btn-outline-dark"
            target="_blank"
        >
          {{ platform }}
        </a>
      </div>
    </section>
  </div>
</template>

<script>
import { getHomeData } from "@/services/api";
import LoadingSpinner from "@/components/shared/LoadingSpinner.vue";

export default {
  name: "ProviderList",
  components: { LoadingSpinner },
  data() {
    return {
      providers: [],
      promotions: [],
      contactInfo: {},
      loading: true,
      errorMessage: "",
    };
  },
  async created() {
    try {
      const homeData = await getHomeData();
      this.providers = homeData.paginaHome.proveedoresActuales;
      this.promotions = homeData.paginaHome.promocionesActuales;
      this.contactInfo = homeData.paginaHome.informacionGeneral;
    } catch (error) {
      this.errorMessage = "No se pudieron cargar los datos de proveedores. Intenta nuevamente más tarde.";
    } finally {
      this.loading = false;
    }
  },
};
</script>

<style scoped>
.providers-container {
  max-width: 1200px;
  margin: 3rem auto;
  padding: 2rem;
  background: linear-gradient(to bottom, #f9f9f9, #ffffff);
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.page-title,
.section-title {
  font-size: 2.5rem;
  font-weight: bold;
  color: #2c3e50;
  text-align: center;
  margin-bottom: 2rem;
}

/* Tarjetas */
.provider-card,
.promotion-card {
  background-color: #ffffff;
  border: 2px solid #ddd;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.provider-card:hover,
.promotion-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  border: 10px solid #000000;
}
.provider-card-body,
.promotion-card-body {
  text-align: center;
}
.provider-card-body h3,
.promotion-card-body h3 {
  color: #ff9500;
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
}

/* Botones */
.btn {
  border-radius: 8px;
  padding: 0.75rem 1.5rem;
}
.btn:hover {
  background-color: #e08900;
}

/* Detalles de Contacto */
.contact-details {
  text-align: center;
  margin-bottom: 2rem;
}

/* Redes Sociales */
.social-links {
  display: flex;
  justify-content: center;
  gap: 1rem;
}
.social-links a {
  padding: 0.5rem 1rem;
  border-radius: 8px;
  transition: all 0.3s ease;
  text-transform: capitalize;
}
.social-links a:hover {
  background-color: #ff9500;
  color: #ffffff;
}

/* Alertas */
.alert {
  font-size: 1rem;
  padding: 1rem;
  border-radius: 8px;
  color: #721c24;
  background-color: #f8d7da;
  border: 1px solid #f5c6cb;
  text-align: center;
}
</style>