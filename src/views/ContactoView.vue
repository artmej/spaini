<template>
    <div class="contacto">
      <h1>Gracias por ponerse en contacto con nosotros.</h1>
      {{ message }}
    </div>
  </template>

<script>
export default {
  name: "App",
  data() {
    return {
      message: ""
    };
  },
  async mounted() {
    const { text } = await (await fetch("/api/info")).json();
    this.message = text;
  }
};
</script>