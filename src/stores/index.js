import { defineStore } from "pinia";
import { getAuthData, getHomeData } from "@/services/api.js";

export const useMainStore = defineStore("main", {
    state: () => ({
        // Autenticación
        isAuthenticated: false,
        user: null, // Información del usuario autenticado

        // Datos de Home
        homeInfo: {},
        loading: true,
        errorMessage: "",
    }),
    actions: {
        // Acciones de Autenticación
        async login(email, password) {
            try {
                const response = await getAuthData();

                if (email === response.correoElectronico && password === response.contrasena) {
                    this.isAuthenticated = true;
                    this.user = { name: "Juan Perez", email }; // Almacena el nombre y correo
                    return true;
                } else {
                    return false; // Credenciales incorrectas
                }
            } catch (error) {
                console.error("Error al obtener los datos de login:", error);
                return false; // Falla en la autenticación debido a un error
            }
        },
        logout() {
            this.isAuthenticated = false;
            this.user = null; // Limpia la información del usuario
        },

        // Acciones para datos de Home
        async fetchHomeData() {
            this.loading = true; // Establece el estado de carga antes de la llamada
            this.errorMessage = ""; // Limpia cualquier mensaje de error previo
            try {
                const data = await getHomeData();
                this.homeInfo = { ...data }; // Asegúrate de que los datos sean un nuevo objeto
            } catch (error) {
                this.errorMessage = "Error al cargar los datos.";
                console.error("fetchHomeData Error:", error);
            } finally {
                this.loading = false; // Asegúrate de siempre limpiar el estado de carga
            }
        },
    },
    getters: {
        // Getters de autenticación
        getIsAuthenticated: (state) => state.isAuthenticated,
        getUser: (state) => state.user,

        // Getters de datos de Home
        getHomeInfo: (state) => state.homeInfo,
        getLoading: (state) => state.loading,
        getErrorMessage: (state) => state.errorMessage,
    },
});