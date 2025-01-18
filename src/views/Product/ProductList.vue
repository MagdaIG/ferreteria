<template>
  <div class="product-list-container">
    <!-- Spinner mientras se cargan los productos -->
    <LoadingSpinner :show="loading" />

    <!-- Mensaje de error -->
    <div v-if="!loading && errorMessage" class="alert alert-danger text-center">
      {{ errorMessage }}
    </div>

    <!-- Listado de Productos -->
    <div v-if="!loading && !errorMessage">
      <h1 class="text-center my-4">Listado de Productos</h1>
      <div class="product-list">
        <div
            class="product-card"
            v-for="(product, index) in products"
            :key="product.id"
        >
          <div class="product-card-body">
            <router-link
                :to="`/productos/${product.id}`"
                class="product-link"
            >
            <div>
            <h5 class="product-title">[{{ product.id }}] {{ product.nombre }}</h5>
            <p class="product-category"><strong>Categoría:</strong> {{ product.categoria }}</p>
            <p class="product-description"><strong>Descripción</strong><br/>{{ product.descripcion }}</p>
            <p class="product-price"><strong>Precio:</strong> ${{ product.precio }}</p>
            <p class="product-stock"><strong>Stock:</strong> {{ product.stock }} disponibles</p>
            </div>
            </router-link>
            <!-- Botón Comprar -->
            <button
                class="btn-buy"
                :class="{ bought: boughtProducts[index] }"
                @click="toggleBought(index)"
            >
              <span v-if="!boughtProducts[index]">Comprar</span>
              <span v-else>&#10003; Comprado</span>
            </button>
          </div>
        </div>
      </div>

      <!-- Botón de regresar al home -->
      <div class="text-center mt-4">
        <router-link to="/" class="btn btn-back">Regresar al Home</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import LoadingSpinner from "@/components/shared/LoadingSpinner.vue";
import { getProducts } from "@/services/api";

export default {
  name: "ProductList",
  components: { LoadingSpinner },
  data() {
    return {
      products: [],
      boughtProducts: [], // Arreglo para rastrear productos comprados
      loading: true, // Controla el spinner
      errorMessage: "", // Mensaje de error en caso de fallo
    };
  },
  async created() {
    try {
      const response = await getProducts(); // Llama al servicio para obtener los productos
      this.products = response;
      this.boughtProducts = Array(this.products.length).fill(false); // Inicializa como no comprados
    } catch (error) {
      console.error("Error al cargar los productos:", error);
      this.errorMessage = "Hubo un error al cargar los productos. Por favor, intenta más tarde.";
    } finally {
      this.loading = false; // Oculta el spinner después de cargar los datos
    }
  },
  methods: {
    toggleBought(index) {
      this.boughtProducts[index] = !this.boughtProducts[index]; // Alterna entre comprado y no comprado
    },
  },
};
</script>

<style scoped>
/* Contenedor principal */
.product-list-container {
  max-width: 1200px;
  margin: 2rem auto;
  padding: 1rem;
}

/* Títulos */
h1 {
  font-size: 2rem;
  color: #333333;
  font-weight: bold;
}

/* Listado de productos */
.product-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

/* Tarjetas de producto */
.product-card {
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease, background-color 0.3s ease;
  overflow: hidden;
  border: 10px solid #000000;
}
.product-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  background-color: #ff9500;
  color: #ffffff;
}
.product-card-body {
  padding: 1.5rem;
  text-align: center;
  height: 400px;
}
.product-title {
  font-size: 1.25rem;
  font-weight: bold;
  color: #333333;
  margin-bottom: 0.5rem;
}
.product-category {
  font-size: 1rem;
  color: #666666;
}

/* Botón Comprar */
.btn-buy {
  background-color: #000000;
  color: #ffffff;
  font-size: 1rem;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  border: none;
  transition: all 0.3s ease-in-out, box-shadow 0.3s ease;
  margin-top: 1rem;
  cursor: pointer;
  width: 80%;
}
.btn-buy:hover {
  background-color: #731111;
}
.btn-buy.bought {
  background-color: #4caf50;
  color: #ffffff;
  box-shadow: 0 0 10px 2px #4caf50;
}

/* Botón de regresar */
.btn-back {
  background-color: #000000;
  color: #ffffff;
  font-size: 1rem;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  border: none;
  transition: all 0.3s ease-in-out, box-shadow 0.3s ease;
}
.btn-back:hover {
  background-color: rgba(246, 139, 0, 0.86);
  box-shadow: 0 0 10px 2px #000000;
}

/* Alertas */
.alert {
  padding: 15px;
  border-radius: 8px;
  margin: 20px auto;
  max-width: 600px;
  text-align: center;
  font-size: 1rem;
}
.alert-danger {
  background-color: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
}

/* Responsividad */
@media (max-width: 768px) {
  .product-list {
    grid-template-columns: 1fr;
  }
  .product-card {
    margin-bottom: 1.5rem;
  }
}
.product-link {
  text-decoration: none;
  color: inherit;
  display: block;
}
.product-link:hover {
  color: inherit;
}
</style>