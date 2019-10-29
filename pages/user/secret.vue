<template>
  <div>
    <h1>This is secret page.</h1>
    {{ this.$store.getters.getUser }}
    <NuxtLink to="/">
      Back home
    </NuxtLink>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  layout: 'user',
  middleware: 'authenticated',
  data(){
    return {
      user: ""
    }
  },
}
</script>
