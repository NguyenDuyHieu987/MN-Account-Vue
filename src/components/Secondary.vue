<template>
  <div class="wrapper-sidebar" :class="{ active: activeSideBar }">
    <div class="sidebar-container">
      <div class="header-sidebar">
        <p class="title-header-sidebar">
          {{ capitalizeFirstLetter($store.state.userAccount.role) }}
        </p>
      </div>
      <div class="content-sidebar">
        <ul id="menu">
          <li :class="{ active: isActive }">
            <SideBarLink to="/" title="Manage Account">
              <font-awesome-icon icon="fa-solid fa-file-invoice" />
            </SideBarLink>
          </li>
          <li>
            <SideBarLink to="/auth" title="Log out" @click="onLogout">
              <font-awesome-icon icon="fa-solid fa-arrow-right-from-bracket" />
            </SideBarLink>
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
    function capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const onLogout = () => {
      window.localStorage.removeItem('userToken');
    };

    return {
      activeSideBar1: store.getters.activeSideBar,
      isActive,
      capitalizeFirstLetter,
      onLogout,
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

    svg {
      margin-right: 7px;
      font-size: 16px;
    }
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
