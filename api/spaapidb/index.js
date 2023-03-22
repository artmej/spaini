module.exports = async function (context, req) {
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
context.res  = await response.json();

}