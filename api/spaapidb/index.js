module.exports = async function (context, req) {
    const id = '1';

    const gql = `
      query getById($id: ID!) {
        item_by_pk(id: $id) {
          id
          nombre
        }
      }`;
  
    const query = {
      query: gql,
      variables: {
        id: id,
      },
    };
  
    const endpoint = "/data-api/graphql";
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(query),
    });
    const result = await response.json();

    context.res = result;
}