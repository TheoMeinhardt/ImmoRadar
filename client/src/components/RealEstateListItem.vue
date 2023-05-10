<template>
  <div class="item row items-center bg-dark q-pa-sm text-white">
    <q-img v-if="!thumbnailLoading" :src="thumbnail" loading="lazy" class="col-3" />
    <div v-else class="text-center q-my-lg col-2">
      <q-spinner-tail size="2.5em" thickness="5" />
    </div>

    <div class="col-4 q-ml-sm">
      <span class="text-heading block">{{ realEstate.name }}</span>
      <span class="text-address block">{{ realEstate.address.split(',')[0] }},</span>
      <span class="text-address block">{{ realEstate.address.split(',')[1] }}</span>
    </div>
    <div class="col-4 text-right">
      <span class="text-content block">{{
        new Intl.NumberFormat('de-DE', {
          style: 'currency',
          currency: 'EUR',
          maximumSignificantDigits: 12,
        }).format(realEstate.price)
      }}</span>
      <span class="text-content block">{{ realEstate.usableArea }}m²</span>
      <span class="text-content block">{{ realEstate.rooms }} Rooms</span>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps, onMounted } from 'vue';
import { useRealEstateStore } from '../stores/realEstates';

const realEstateStore = useRealEstateStore();
const props = defineProps({ realEstate: Object });

const thumbnail = ref();
const thumbnailLoading = ref(true);

onMounted(async () => {
  thumbnail.value = await realEstateStore.getImageForRealEstate(props.realEstate.reID);
  thumbnailLoading.value = false;
});
</script>

<style lang="scss" scoped>
:deep(.q-img__container) {
  border-radius: 7.5px;
  height: 100%;
}

.item {
  font-family: 'Keep Calm';
  width: 100vw;
  border-top: 1px solid white;
}

.text-heading {
  font-size: 1rem;
}

.text-address {
  font-size: 0.5rem;
}

.text-content {
  font-size: 0.75rem;
}
</style>
