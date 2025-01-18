import { createRouter, createWebHistory } from "vue-router";
import { useMainStore } from "@/stores/";
import Home from "@/views/Home.vue";
import AuthLogin from "@/views/Auth/AuthLogin.vue";
import AuthRegister from "@/views/Auth/AuthRegister.vue";
import AuthConfirm from "@/views/Auth/AuthConfirm.vue";
import ProductList from "@/views/Product/ProductList.vue";
import ProductDetail from "@/views/Product/ProductDetail.vue";
import ProviderList from "@/views/Provider/ProviderList.vue";
import NotFound from "@/views/NotFound.vue";

const routes = [
    { path: "/", name: "Home", component: Home },
    { path: "/login", name: "AuthLogin", component: AuthLogin },
    { path: "/registro", name: "AuthRegister", component: AuthRegister },
    { path: "/confirmacion", name: "AuthConfirm", component: AuthConfirm },
    {
        path: "/proveedores",
        name: "ProviderList",
        component: ProviderList,
        meta: { requiresAuth: true }, // Solo accesible para usuarios autenticados
    },
    {
        path: "/productos",
        name: "ProductList",
        component: ProductList, // Accesible para todos
    },
    {
        path: "/productos/:id",
        name: "ProductDetail",
        component: ProductDetail, // Accesible para todos
    },
    { path: "/:pathMatch(.*)*", name: "NotFound", component: NotFound },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

// Guard de navegación para rutas protegidas
router.beforeEach((to, from, next) => {
    const authStore = useMainStore();
    if (to.meta.requiresAuth && !authStore.isAuthenticated) {
        next("/login"); // Redirige al login si no está autenticado
    } else {
        next(); // Permite el acceso
    }
});

export default router;