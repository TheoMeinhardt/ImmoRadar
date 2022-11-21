<template>
  <div class="xs text-center" style="vertical-align: center" id="underConstruction">
    <UnderConstruction></UnderConstruction>
    <NavBar></NavBar>
  </div>
</template>

<script setup>
import UnderConstruction from '@/components/UnderConstruction.vue';
import NavBar from '@/components/NavBar.vue';
</script>

<style scoped>
#underConstruction {
  height: 100vh;
  background-color: #4b506e;
}
</style>
