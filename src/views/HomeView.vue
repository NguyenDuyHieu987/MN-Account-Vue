<template>
  <div class="body-content">
    <ManageAccount />
  </div>
</template>

<script>
import ManageAccount from '@/components/ManageAccount.vue';

export default {
  name: 'HomeView',
  components: { ManageAccount },
};
</script>

<style scoped lang="scss">
.body-content {
  padding: 10px;
  background-color: var(--body-color);
  color: var(--body-text-color);
  min-height: 100vh;
}
</style>
