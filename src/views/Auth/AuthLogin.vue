<template>
  <div class="login-container">
    <h1>Iniciar Sesión</h1>
    <form @submit.prevent="handleLogin" class="login-form">
      <!-- Selección de Rol -->
      <div class="mb-3">
        <label for="role" class="form-label">Iniciar como</label>
        <select v-model="role" id="role" class="form-select" required>
          <option value="usuario">Usuario</option>
          <option value="proveedor">Proveedor</option>
        </select>
      </div>
      <!-- Email -->
      <div class="mb-3">
        <label for="email" class="form-label">Correo Electrónico</label>
        <input
            v-model="email"
            type="email"
            id="email"
            class="form-control"
            placeholder="ejemplo@correo.com"
            required
        />
        <span v-if="emailError" class="text-danger">{{ emailError }}</span>
      </div>
      <!-- Contraseña -->
      <div class="mb-3">
        <label for="password" class="form-label">Contraseña</label>
        <input
            v-model="password"
            type="password"
            id="password"
            class="form-control"
            placeholder="Ingrese su contraseña"
            required
        />
        <span v-if="passwordError" class="text-danger">{{ passwordError }}</span>
      </div>
      <!-- Botones -->
      <div class="d-flex justify-content-between align-items-center">
        <button type="submit" class="btn btn-primary">Login</button>
        <router-link to="/registro" class="btn btn-secondary">Registrarse</router-link>
      </div>
      <p v-if="loginError" class="text-danger mt-3">{{ loginError }}</p>
    </form>
  </div>
</template>

<script>
import {useMainStore} from "@/stores/";

export default {
  name: "AuthLogin",
  data() {
    return {
      role: "usuario",
      email: "",
      password: "",
      emailError: "",
      passwordError: "",
      loginError: "",
    };
  },
  methods: {
    async handleLogin() {
      this.emailError = "";
      this.passwordError = "";
      this.loginError = "";

      // Validar que el email sea válido
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(this.email)) {
        this.emailError = "Por favor, ingrese un email válido.";
      }

      // Validar que ambos campos estén llenos
      if (!this.password) {
        this.passwordError = "Por favor, ingrese su contraseña.";
      }

      // Si no hay errores, intentamos autenticar al usuario
      if (!this.emailError && !this.passwordError) {
        const authStore = useMainStore();
        const success = await authStore.login(this.email, this.password);

        if (success) {
          // Redirige dependiendo del rol
          const redirectRoute = this.role === "usuario" ? "/productos" : "/proveedores";
          await this.$router.push(redirectRoute);
        } else {
          this.loginError = "Correo, contraseña o rol incorrectos.";
        }
      }
    },
  },
};
</script>

<style scoped>
/* Contenedor principal */
.login-container {
  max-width: 400px;
  margin: 2rem auto;
  padding: 2rem;
  border: 2px solid #ddd;
  border-radius: 12px;
  background: linear-gradient(to bottom, #ffffff, #f7f7f7);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}
h1 {
  text-align: center;
  margin-bottom: 1.5rem;
  font-size: 2rem;
  color: #333333;
  font-weight: bold;
}

/* Formulario */
.login-form .form-label {
  font-weight: bold;
  color: #333333;
}
.login-form .form-control,
.login-form .form-select {
  border-radius: 8px;
  border: 1px solid #ddd;
  padding: 0.75rem;
  font-size: 1rem;
  color: #333333;
}
.login-form .form-control:focus,
.login-form .form-select:focus {
  border-color: #ff9500;
  box-shadow: 0 0 5px rgba(255, 149, 0, 0.5);
}

/* Botones */
.login-form .btn {
  width: 48%;
  font-size: 1rem;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  border: none;
  transition: all 0.3s ease-in-out;
}
.btn-primary {
  background-color: #262a2b;
  color: #ffffff;
}
.btn-primary:hover {
  background-color: #731111;
}
.btn-secondary {
  background-color: rgba(246, 139, 0, 0.86);
  color: #731111;
}
.btn-secondary:hover {
  background-color: #156161;
}

/* Errores */
.text-danger {
  font-size: 0.875rem;
  color: #e74c3c;
  margin-top: 0.25rem;
}
</style>