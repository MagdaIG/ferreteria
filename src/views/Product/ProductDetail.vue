<template>
  <div class="product-detail-container">
    <!-- Título -->
    <h1 class="text-center my-4">Detalle del Producto</h1>

    <!-- Mensaje de error -->
    <div v-if="errorMessage" class="alert alert-danger text-center">
      {{ errorMessage }}
    </div>

    <!-- Detalle del Producto -->
    <div v-else class="card">
      <div class="card-body">
        <h3 class="card-title">{{ product.nombre || 'Producto no encontrado' }}</h3>
        <p v-if="product.categoria" class="card-text"><strong>Categoría:</strong> {{ product.categoria }}</p>
        <p v-if="product.descripcion" class="card-text"><strong>Descripción:</strong> {{ product.descripcion }}</p>
        <p v-if="product.precio !== undefined" class="card-text">
          <strong>Precio:</strong> ${{ product.precio.toFixed(2) }}
        </p>
        <p v-else class="card-text"><strong>Precio:</strong> No disponible</p>
        <p v-if="product.stock !== undefined" class="card-text">
          <strong>Stock:</strong> {{ product.stock }}
        </p>
      </div>
    </div>

    <!-- Botón de regresar -->
    <div class="text-center mt-4">
      <router-link to="/productos" class="btn btn-primary">Regresar al Listado de Productos</router-link>
    </div>
  </div>
</template>

<script>
import { getProducts } from "@/services/api";

export default {
  name: "ProductDetail",
  data() {
    return {
      product: null, // Almacena los detalles del producto
      errorMessage: "", // Manejo de errores
    };
  },
  async created() {
    try {
      const productId = this.$route.params.id; // Obtiene el ID del producto de la URL
      const products = await getProducts(); // Llama a la API para obtener todos los productos
      this.product = products.find((prod) => prod.id === parseInt(productId)); // Encuentra el producto por ID

      if (!this.product) {
        this.errorMessage = "Producto no encontrado.";
        console.error(this.errorMessage);
      }
    } catch (error) {
      this.errorMessage = "Error al cargar el detalle del producto. Intenta más tarde.";
      console.error(error);
    }
  },
};
</script>

<style scoped>
.product-detail-container {
  max-width: 600px;
  margin: 2rem auto;
  padding: 1rem;
  background: linear-gradient(to bottom, #ffffff, #f7f7f7);
  border-radius: 12px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
}

.card {
  border: 1px solid #ddd;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: #ffffff;
}

.card-title {
  font-weight: bold;
  color: #2c3e50;
  font-size: 1.5rem;
  margin-bottom: 1rem;
}

.card-text {
  font-size: 1rem;
  color: #7f8c8d;
  margin-bottom: 0.5rem;
}

.alert {
  padding: 15px;
  border-radius: 12px;
  color: #721c24;
  background-color: #f8d7da;
  border: 1px solid #f5c6cb;
}

.btn {
  background-color: #000000;
  color: #ffffff;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  border-radius: 8px;
  border: none;
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
}

.btn:hover {
  background-color: #ff9500;
  box-shadow: 0 0 10px 2px rgba(255, 149, 0, 0.5);
}
</style>