<template>
  <template v-if="!isRegistered">
    <div class="register-container">
      <h1>Registro</h1>
      <form @submit.prevent="handleRegister" class="register-form">
        <!-- Tipo de registro -->
        <div class="mb-3">
          <label for="role" class="form-label">Registrar como</label>
          <select v-model="role" id="role" class="form-select" required>
            <option value="usuario">Usuario</option>
            <option value="proveedor">Proveedor</option>
          </select>
        </div>
        <!-- Nombre -->
        <div class="mb-3">
          <label for="name" class="form-label">Nombre Completo</label>
          <input
              v-model="name"
              type="text"
              id="name"
              class="form-control"
              placeholder="Tu nombre completo"
              required
          />
          <span v-if="nameError" class="text-danger">{{ nameError }}</span>
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
        <!-- Teléfono -->
        <div class="mb-3">
          <label for="phone" class="form-label">Teléfono</label>
          <input
              v-model="phone"
              type="tel"
              id="phone"
              class="form-control"
              placeholder="+1234567890"
              required
          />
          <span v-if="phoneError" class="text-danger">{{ phoneError }}</span>
        </div>
        <!-- Contraseña -->
        <div class="mb-3">
          <label for="password" class="form-label">Contraseña</label>
          <input
              v-model="password"
              type="password"
              id="password"
              class="form-control"
              placeholder="********"
              required
          />
        </div>
        <!-- Repetir Contraseña -->
        <div class="mb-3">
          <label for="confirmPassword" class="form-label">Repetir Contraseña</label>
          <input
              v-model="confirmPassword"
              type="password"
              id="confirmPassword"
              class="form-control"
              placeholder="********"
              required
          />
          <span v-if="passwordError" class="text-danger">{{ passwordError }}</span>
        </div>
        <!-- Botones -->
        <div class="d-flex justify-content-between align-items-center">
          <router-link to="/login" class="btn btn-secondary">Regresar al Login</router-link>
          <button type="submit" class="btn btn-primary">Registrarme</button>
        </div>
        <!-- Mensaje de éxito o error -->
        <p v-if="formError" class="text-danger mt-3">{{ formError }}</p>
      </form>
    </div>
  </template>
  <template v-else>
    <AuthConfirm/>
  </template>
</template>

<script>
import {registerUser} from "@/services/api";
import AuthConfirm from "@/views/Auth/AuthConfirm.vue";

export default {
  name: "AuthRegister",
  components: {AuthConfirm},
  data() {
    return {
      isRegistered: false, // Controla qué se muestra
      role: "usuario",
      name: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      nameError: "",
      emailError: "",
      phoneError: "",
      passwordError: "",
      formError: "",
    };
  },
  methods: {
    async handleRegister() {
      this.nameError = "";
      this.emailError = "";
      this.phoneError = "";
      this.passwordError = "";
      this.formError = "";

      if (!this.name) this.nameError = "El nombre es obligatorio.";

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(this.email)) this.emailError = "El correo no es válido.";

      const phoneRegex = /^\+\d{10,15}$/;
      if (!phoneRegex.test(this.phone)) this.phoneError = "El teléfono debe ser válido (ej. +1234567890).";

      if (!this.password || !this.confirmPassword) {
        this.passwordError = "Ambos campos de contraseña son obligatorios.";
      } else if (this.password !== this.confirmPassword) {
        this.passwordError = "Las contraseñas no coinciden.";
      }

      if (this.nameError || this.emailError || this.phoneError || this.passwordError) {
        this.formError = "Por favor, corrija los errores antes de continuar.";
        return;
      }

      try {
        const response = await registerUser({
          role: this.role,
          name: this.name,
          email: this.email,
          phone: this.phone,
          password: this.password,
        });

        if (response.status === 200) {
          this.isRegistered = true; // Cambia la vista a AuthConfirm
        } else {
          this.formError = response.message || "Ocurrió un error. Intenta nuevamente.";
        }
      } catch (error) {
        this.formError = "Error al registrar. Por favor, intente más tarde.";
      }
    },
  },
};
</script>

<style scoped>
.register-container {
  max-width: 500px;
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
.register-form .form-label {
  font-weight: bold;
}

.register-form .form-control {
  border-radius: 8px;
}

.register-form .form-control:focus {
  border-color: #ff9500;
}

/* Botones */
.btn {
  width: 48%;
}

.btn-primary {
  background-color: #156161;
  color: #ffffff;
  transition: all 0.3s ease-in-out;
}

.btn-primary:hover {
  background-color: rgba(42, 106, 59, 0.92);
  color: rgb(255, 255, 255);
  box-shadow: 0 4px 8px rgba(255, 149, 0, 0.8);
}

.btn-secondary {
  background-color: #ff9500;
  color: #000000;
  transition: all 0.3s ease-in-out;
}

.btn-secondary:hover {
  background-color: #731111;
  color: #ffffff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.8);
}

/* Errores */
.text-danger {
  font-size: 0.875rem;
  color: #e74c3c;
  margin-top: 0.25rem;
}

.text-success {
  font-size: 0.875rem;
  color: #28a745;
}
</style>