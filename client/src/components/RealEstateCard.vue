<template>
  <div class="badge bg-dark q-pa-sm q-mb-md q-mx-md text-white">
    <q-img v-if="!thumbnailLoading" :src="thumbnail" loading="lazy" />
    <div v-else class="text-center q-my-lg">
      <q-spinner-tail size="2.5em" thickness="5" />
    </div>

    <span class="text-heading block q-mt-sm">{{ realEstate.name }}</span>
    <span class="text-address block">{{ realEstate.address.split(',')[0] }},</span>
    <span class="text-address block">{{ realEstate.address.split(',')[1] }}</span>
    <span class="text-content block q-mt-sm">{{
      new Intl.NumberFormat('de-DE', {
        style: 'currency',
        currency: 'EUR',
        maximumSignificantDigits: 12,
      }).format(realEstate.price)
    }}</span>
    <span class="text-content block">{{ realEstate.usableArea }}m²</span>
    <span class="text-content block">{{ realEstate.rooms }} Rooms</span>
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

<style scoped lang="scss">
:deep(.q-img__container) {
  border-radius: 7.5px;
  width: 100%;
}

.badge {
  border: 2px solid white;
  border-radius: 15px;
  font-family: 'Keep Calm';
  width: 40vw;
}

.seperator {
  border-bottom: 1px solid white;
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
