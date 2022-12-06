<template>
  <component :is="layout">
    <router-view />
  </component>
</template>

<script>
import { useRoute } from 'vue-router';
import { computed } from 'vue';
export default {
  setup() {
    const router = useRoute();
    return {
      layout: computed(() => (router.meta.layout || 'default') + '-layout'),
    };
  },
};
</script>
