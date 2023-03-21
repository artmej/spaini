<script>
import { text } from 'body-parser';

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
    },
    components: { text }
};
</script>

<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link> |
    <router-link to="/contacto">Contacto</router-link>|
    <a v-if="!userInfo" :href="`/login/github?post_login_redirect_uri=${redirect}`"> Login </a>
    <a v-if="userInfo" :href="`/logout`"> Logout </a> |
    <p v-if="userInfo"> {{ userInfo.userDetails }} </p>
  </nav>
  <router-view/>
</template>

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
