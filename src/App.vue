<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link> |
    <router-link to="/contacto">Contacto</router-link>|
    <a v-if="!userInfo" :href="`/.auth/login/github?post_login_redirect_uri=${redirect}`"> Login </a>
    <template v-if="userInfo">
        <a v-if="userInfo" :href="`/.auth/logout`"> Logout </a> |
        {{ userInfo.userDetails }} 
    </template>

  </nav>
  <router-view/>
</template>

<script>
export default {
    data() {
        return {
            userInfo: {
                type: Object,
                default() { },
            },
            redirect: window.location.pathname,
        };
    },
    methods: {
        async getUserInfo() {
            try {
                const response = await fetch("/.auth/me");
                const payload = await response.json();
                const { clientPrincipal } = payload;
                return clientPrincipal;
            }
            catch (error) {
                console.error("No profile could be found");
                return undefined;
            }
        },
    },
    async created() {
        this.userInfo = await this.getUserInfo();
    }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
