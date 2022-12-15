<template>
  <div>
    <q-icon @click="showBadge" v-if="badgeHidden" class="shadow-1" name="fa-solid fa-house" color="primary" size="xs"></q-icon>

    <Transition name="expandBadgeTransition" @after-leave="badgeHidden = true">
      <div v-if="expand">
        <q-btn @click="expand = false" round color="primary" class="closeIcon" icon="fa-solid fa-close" text-color="white" />

        <div class="badge bg-secondary q-pa-sm q-ma-md text-white">
          <img src="https://via.placeholder.com/200x150" />
          <span class="text-h5 block">{{ realEstate.name }}</span>
          <span class="text-caption block">{{ realEstate.address.split(',')[0] }}</span>
          <span class="text-caption block seperator">{{ realEstate.address.split(',')[1] }}</span>
          <span class="text-body1 block q-mt-sm">{{ realEstate.price }}€</span>
          <span class="text-caption block">{{ realEstate.usableArea }}m²</span>
          <span class="text-caption block">{{ realEstate.rooms }} Rooms</span>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const expand = ref(false);
const badgeHidden = ref(true);

defineProps({
  realEstate: Object,
});

function showBadge() {
  expand.value = true;
  badgeHidden.value = false;
}
</script>

<style scoped>
.badge {
  border: 2px solid white;
  border-radius: 15px;
  font-family: 'Keep Calm';
  width: 220px;
}

.closeIcon {
  position: absolute;
  right: 0px;
  top: -3px;
}

img {
  border-radius: 7.5px;
}

.seperator {
  border-bottom: 1px solid white;
}

.expandBadgeTransition-enter-active,
.expandBadgeTransition-leave-active {
  transition: opacity 0.3s ease;
}

.expandBadgeTransition-enter-from,
.expandBadgeTransition-leave-to {
  opacity: 0;
}
</style>
