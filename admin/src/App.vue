<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <RouterView />
</template>

<style lang="scss">
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
