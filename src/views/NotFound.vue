<template>
  <div class="not-found-container">
    <h1>404 - Página no encontrada</h1>
    <p class="not-found-message">Lo sentimos, la página que buscas no existe o ha sido movida.</p>
    <img src="@/assets/404.png" alt="Página no encontrada" class="not-found-image" />
    <div class="d-flex justify-content-center">
      <router-link to="/" class="btn btn-primary">Volver al Inicio</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "NotFound",
};
</script>

<style scoped>
.not-found-container {
  max-width: 600px;
  margin: 4rem auto;
  padding: 2rem;
  text-align: center;
  border-radius: 12px;
  background: linear-gradient(to bottom, #ffffff, #f7f7f7);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
}

h1 {
  font-size: 2.5rem;
  color: #ff6f61;
  font-weight: bold;
  margin-bottom: 1.5rem;
}

.not-found-message {
  font-size: 1.2rem;
  color: #6c757d;
  margin-bottom: 2rem;
}

.not-found-image {
  width: 80%;
  max-width: 300px;
  margin: 2rem auto;
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