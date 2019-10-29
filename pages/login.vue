<template>
  <div class="container">
    <h1>Sign in to access the secret page</h1>
    <div>
      <label for="email">
        <input id="email" v-model="email" type="email" value="test" />
      </label>
      <label for="password">
        <input id="password" v-model="password" type="password" value="test" />
      </label>
      <button @click="postLogin">login</button>
      <p>The credentials are not verified for the example purpose.</p>
    </div>
  </div>
</template>

<script>
import axios from "axios";
const Cookie = process.client ? require("js-cookie") : undefined;
export default {
  data() {
    return {
      email: "",
      password: ""
    };
  },
  middleware: "notAuthenticated",
  methods: {
    // async fetchUser(username){
    //   const res = await axios.get("http://localhost:3000/users/"+username, {headers: { "Authorization": this.$store.getters.getToken}});
    //   this.$store.commit("setUser", res.data)
    // },
    postLogin() {
      let bodyFormData = new FormData();
      bodyFormData.set("email", this.email);
      bodyFormData.set("password", this.password);
      axios({
        method: "post",
        url: "http://localhost:3000/auth/login",
        data: bodyFormData,
        config: { headers: { "Content-Type": "multipart/form-data" } }
      })
        .then(response => {
          console.log("Login successfully");
          const auth = { accessToken: response.data.token };
          this.$store.commit("setAuth", auth); // mutating to store for client rendering
          Cookie.set("auth", auth); // saving token in cookie for server rendering
          // this.fetchUser(response.data.username);
          this.$router.push("/");
        })
        .catch(response => {
          //handle error
          console.log(response);
        });
    }
  }
};
</script>
