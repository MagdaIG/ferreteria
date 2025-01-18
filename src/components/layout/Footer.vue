<template>
  <section v-if="!loading">
    <footer class="bg-dark text-white text-center py-4">
      <div class="container">
        <!-- Derechos reservados y redes sociales -->
        <p>&copy; 2025 {{ homeInfo?.paginaHome?.nombre || "Cargando..." }}. Todos los derechos reservados.</p>
        <p>
          <a
              v-if="homeInfo?.paginaHome?.informacionGeneral?.redesSociales?.facebook"
              :href="homeInfo.paginaHome.informacionGeneral.redesSociales.facebook"
              class="text-white me-3"
              target="_blank"
              rel="noopener noreferrer"
          >
            Facebook
          </a>
          <a
              v-if="homeInfo?.paginaHome?.informacionGeneral?.redesSociales?.twitter"
              :href="homeInfo.paginaHome.informacionGeneral.redesSociales.twitter"
              class="text-white me-3"
              target="_blank"
              rel="noopener noreferrer"
          >
            Twitter
          </a>
          <a
              v-if="homeInfo?.paginaHome?.informacionGeneral?.redesSociales?.instagram"
              :href="homeInfo.paginaHome.informacionGeneral.redesSociales.instagram"
              class="text-white"
              target="_blank"
              rel="noopener noreferrer"
          >
            Instagram
          </a>
        </p>
        <!-- Crédito personalizado -->
        <p class="mt-3">
          Creado por <strong class="text-highlight">Magdalena Inalaf G.</strong> - Hecho con Vue.js
        </p>
      </div>
    </footer>
  </section>
</template>

<script>
import { useMainStore } from "@/stores"; // Asegúrate de que el store esté correctamente configurado
import { computed, onMounted } from "vue";

export default {
  name: "Footer",
  setup() {
    const store = useMainStore();

    // Propiedades reactivas del store
    const homeInfo = computed(() => store.homeInfo);
    const loading = computed(() => store.loading);

    // Llama a la acción para cargar los datos si no están disponibles
    onMounted(() => {
      if (!homeInfo.value || Object.keys(homeInfo.value).length === 0) {
        store.fetchHomeData();
      }
    });

    return {
      homeInfo,
      loading,
    };
  },
};
</script>

<style scoped>
/* General */
footer {
  background-color: #262626;
  color: #f8f9fa;
  font-size: 0.9rem;
}
a {
  text-decoration: none;
  color: #d07622;
  transition: color 0.3s ease-in-out;
}
a:hover {
  color: #f8d7a6;
  text-decoration: underline;
}
.text-highlight {
  color: #d07622;
  font-weight: bold;
}
</style>