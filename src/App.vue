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
  created() {
    if (this.$store.state.logedIn == false) {
      this.$router.push('/auth');
    } else {
      this.$router.push('/');
    }
  },
};
</script>
