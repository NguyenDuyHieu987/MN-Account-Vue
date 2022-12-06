<template>
  <main id="main">
    <Secondary />

    <Primary>
      <slot />
    </Primary>
  </main>
</template>

<script>
import Primary from '../components/Primary.vue';
import Secondary from '../components/Secondary.vue';

export default {
  components: {
    Primary,
    Secondary,
  },
};
</script>

<style scoped lang="scss">
#main {
  display: flex;
  min-width: 100%;
}
</style>
