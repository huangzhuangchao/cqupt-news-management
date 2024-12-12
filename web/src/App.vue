<script setup>
import { RouterView } from 'vue-router';
import Navbar from './components/Navbar.vue';
</script>
<template>
<Navbar></Navbar>
<RouterView />
</template>
<style scoped >
*{
  margin: 0;
  padding:0
}
::-webkit-scrollbar{
  width: 5px;
  position: absolute;
}
::-webkit-scrollbar-thumb{
  background: #409EFF
}
::-webkit-scrollbar-track{
  background: #ddd
}
</style>