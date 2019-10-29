<template>
  <div>
    <nuxt />
  </div>
</template>
<script>
import axios from "axios"
export default {
  layout: "user",
  // OR
  layout(context) {
    return "user";
  },
  async mounted() {
    if (this.$store.getters.getToken && this.$store.getters.getToken.length) {
      const res = await axios.get("http://localhost:3000/current_user", {
        headers: { Authorization: this.$store.getters.getToken }
      });
      this.$store.commit("setUser", res.data);
    }
  }
};
</script>