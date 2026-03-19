<script setup>
defineProps(['url'])
// Imagina que este componente es muy pesado, usa librerías de filtros 
// de imagen o carga recursos externos lentos.

</script>

<template>
  <div class="avatar-complejo">
    <img :src="url" alt="Avatar" />
  </div>
</template>