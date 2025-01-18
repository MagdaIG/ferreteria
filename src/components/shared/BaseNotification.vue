<template>
  <div>
    <BaseNotification
        v-if="showNotification"
        :message="notificationMessage"
        :type="notificationType"
    />
    <button @click="showSuccessNotification">Mostrar Éxito</button>
    <button @click="showErrorNotification">Mostrar Error</button>
  </div>
</template>

<script>
import BaseNotification from "@/components/BaseNotification.vue";

export default {
  components: { BaseNotification },
  data() {
    return {
      showNotification: false,
      notificationMessage: "",
      notificationType: "info",
    };
  },
  methods: {
    showSuccessNotification() {
      this.notificationMessage = "¡Acción completada con éxito!";
      this.notificationType = "success";
      this.showNotification = true;
    },
    showErrorNotification() {
      this.notificationMessage = "¡Ocurrió un error inesperado!";
      this.notificationType = "error";
      this.showNotification = true;
    },
  },
};
</script>