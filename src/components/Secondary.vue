<template>
  <div class="wrapper-sidebar" :class="{ active: activeSideBar }">
    <div class="sidebar-container">
      <div class="header-sidebar">
        <p class="title-header-sidebar">Admin</p>
      </div>
      <div class="content-sidebar">
        <ul id="menu">
          <li :class="{ active: isActive }">
            <SideBarLink to="/" title="Manage Account" />
          </li>
          <li>
            <SideBarLink to="/auth" title="Log out" />
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { useStore, mapGetters } from 'vuex';
import { useRoute } from 'vue-router';
import { computed } from 'vue';
import SideBarLink from './SideBarLink.vue';

export default {
  name: 'Secondary',
  components: {
    SideBarLink,
  },
  setup() {
    const store = useStore();
    const route = useRoute();
    const isActive = computed(() => route.path === route.to);
    return {
      activeSideBar1: store.getters.activeSideBar,
      isActive,
    };
  },
  computed: { ...mapGetters(['activeSideBar']) },
};
</script>

<style scoped lang="scss">
.wrapper-sidebar.active {
  width: var(--sidebar-width);
  transition: 0.3s ease;
  background-color: var(--sidebar-color);

  .sidebar-container {
    opacity: 1;
  }

  .header-sidebar {
    display: flex;
    justify-content: center;
    align-items: center;
    height: var(--header-height);
    background-color: var(--header-sidebar-color);

    .title-header-sidebar {
      font-size: 2rem;
      font-weight: bold;
    }
  }

  .content-sidebar {
  }

  #menu li {
    list-style: none;
  }

  #menu li.active {
    background-color: var(--sidebar-color-hover);
  }
}

.wrapper-sidebar:not(.active) {
  width: 0px;
  overflow: hidden;
  transition: 0.3s ease;
  background-color: var(--sidebar-color);
  .sidebar-container {
    opacity: 0;
  }
}
</style>
