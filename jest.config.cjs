module.exports = {
    transform: {
        "^.+\\.vue$": "@vue/vue3-jest", // Transforma archivos .vue
        "^.+\\.[jt]sx?$": "babel-jest", // Transforma archivos JavaScript/TypeScript
    },
    moduleNameMapper: {
        "^@/(.*)$": "<rootDir>/src/$1", // Alias para rutas
    },
    moduleFileExtensions: ["vue", "js", "json", "jsx", "ts", "tsx"],
    testEnvironment: "jsdom", // Entorno DOM simulado para pruebas
};