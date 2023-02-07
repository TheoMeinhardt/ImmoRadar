<template>
  <div>
    <q-icon
      @click="showBadge"
      v-if="badgeHidden"
      class="shadow-1"
      name="fa-solid fa-house"
      color="primary"
      size="xs"
    ></q-icon>

    <Transition name="expandBadgeTransition" @after-leave="badgeHidden = true">
      <div v-if="expand">
        <q-btn
          @click="expand = false"
          round
          color="primary"
          class="closeIcon"
          icon="fa-solid fa-close"
          text-color="white"
        />

        <div class="badge bg-secondary q-pa-sm q-ma-md text-white">
          <img :src="thumbnail" />
          <span class="text-h5 block">{{ realEstate.name }}</span>
          <span class="text-caption block">{{ realEstate.address.split(',')[0] }}</span>
          <span class="text-caption block seperator">{{ realEstate.address.split(',')[1] }}</span>
          <span class="text-body1 block q-mt-sm">{{ realEstate.price }}€</span>
          <span class="text-caption block">{{ realEstate.usableArea }}m²</span>
          <span class="text-caption block">{{ realEstate.rooms }} Rooms</span>
          <q-card-actions vertical align="center">
            <router-link
              :to="`/estateview/${realEstate.reID}`"
              style="text-decoration: underline; color: white"
              :reID="realEstate.reID"
              >View More...</router-link
            >
          </q-card-actions>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import axios from 'axios';
import { ref, onMounted } from 'vue';

const expand = ref(false);
const badgeHidden = ref(true);
const thumbnail = ref();

const props = defineProps({
  map: Object,
  realEstate: Object,
});

function showBadge() {
  expand.value = true;
  badgeHidden.value = false;
  props.map.flyTo({
    center: [props.realEstate.long, props.realEstate.lat],
    zoom: 15,
    essential: true,
  });
}

onMounted(async () => {
  try {
    const res = await axios.post(
      '/image',
      {
        path: props.realEstate.thumbnail,
      },
      // { responseType: 'arraybuffer' }
    );
    thumbnail.value = res.data;
    // let base64String = Buffer.from(res.data).toString('base64');
    // thumbnail.value = 'data:image/jpg;base64,' + base64String;
  } catch (err) {
    console.log(err);
  }
});
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
  width: 100%;
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
