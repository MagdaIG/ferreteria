<template>
  <div class="confirmation-container">
    <h1>Confirmación de Registro</h1>
    <p class="confirmation-message" v-if="confirmationMessage">{{ confirmationMessage }}</p>
    <p class="text-danger" v-else>Ocurrió un error al obtener la confirmación. Intente nuevamente.</p>
    <div class="d-flex justify-content-center">
      <router-link to="/login" class="btn btn-primary">Regresar al Login</router-link>
    </div>
  </div>
</template>

<script>
import { getRegisterConfirmation } from "@/services/api";

export default {
  name: "AuthConfirm",
  data() {
    return {
      confirmationMessage: "",
    };
  },
  async created() {
    try {
      const response = await getRegisterConfirmation(); // Llamada al servicio REST
      this.confirmationMessage = response.status === "success" ? response.mensaje : "El registro no fue exitoso.";
    } catch (error) {
      console.error("Error al obtener confirmación:", error);
      this.confirmationMessage = null;
    }
  },
};
</script>

<style scoped>
.confirmation-container {
  max-width: 500px;
  margin: 3rem auto;
  padding: 2rem;
  border: 2px solid #ddd;
  border-radius: 12px;
  background: linear-gradient(to bottom, #ffffff, #f7f7f7);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  text-align: center;
}
h1 {
  font-size: 2rem;
  font-weight: bold;
  color: #333333;
  margin-bottom: 1.5rem;
}
.confirmation-message {
  font-size: 1.2rem;
  font-weight: bold;
  color: #28a745;
  margin-bottom: 1.5rem;
}
.text-danger {
  font-size: 1.2rem;
  font-weight: bold;
  color: #dc3545;
  margin-bottom: 1.5rem;
}
.btn {
  background-color: #262a2b;
  color: #ffffff;
  font-size: 1rem;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  border: none;
  transition: all 0.3s ease-in-out;
}
.btn:hover {
  background-color: #ff9500;
  box-shadow: 0 0 10px 2px #ff9500;
}
</style>