<template>
  <div class="wrapper-content" :class="{ full: !activeSideBar }">
    <div class="header-content">
      <font-awesome-icon
        @click="faBarsOnclick"
        icon="fa-solid fa-bars"
        class="fa-bars"
      />
      <div class="user-container">
        <p>{{ $store.state.userAccount.fullname }}</p>
      </div>
    </div>
    <slot />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { useStore } from 'vuex';

export default {
  name: 'Primary',
  components: {},
  setup() {
    const store = useStore();
    const faBarsOnclick = () => {
      store.dispatch('setActiveSideBar');
      // console.log(store.getters.activeSideBar);
    };

    return { faBarsOnclick };
  },
  computed: { ...mapGetters(['activeSideBar']) },
};
</script>

<style scoped lang="scss">
.wrapper-content {
  width: calc(100% - var(--sidebar-width));
  transition: 0.3s ease;

  .header-content {
    height: var(--header-height);
    background-color: var(--header-content-color);
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}
.wrapper-content.full {
  width: 100%;
  transition: 0.3s ease;
}

.fa-bars {
  cursor: pointer;
  margin-left: 15px;
  padding: 5px;
  font-size: 20px;
}

.user-container {
  margin-right: 30px;
}
</style>
