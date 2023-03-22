<template>
    <div class="contacto">
      <h1>Gracias por ponerse en contacto con nosotros.</h1>
      {{ message }}

      <button id="list" onclick="list()">List</button>
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
  },
  async list() {
  const query = `
    {
      ToDoList {
        items {
          id
          nombre
        }
      }
    }`;
    
const endpoint = "/data-api/graphql";
const response = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query: query })
});
const result = await response.json();
console.table(result.data.people.items);
}
};


</script>