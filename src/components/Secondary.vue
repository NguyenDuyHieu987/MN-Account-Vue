<template>
  <div class="wrapper-sidebar" :class="{ active: activeSideBar }">
    <div class="sidebar-container">
      <div class="header-sidebar">
        <p class="title-header-sidebar">Admin</p>
      </div>
      <div class="content-sidebar">
        <ul id="menu">
          <li :class="{ active: isActive }">
            <router-link to="/">
              <font-awesome-icon
                icon="fa-solid fa-file-invoice"
                class="fa-file-invoice"
              />
              <span> Manage Account</span>
            </router-link>
          </li>
          <li>
            <router-link to="/auth">
              <font-awesome-icon icon="fa-solid fa-arrow-right-from-bracket" />
              <span>Log out</span>
            </router-link>
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

export default {
  name: 'Secondary',
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

  #menu li a {
    padding: 12px 10px 12px 15px;
    cursor: pointer;
    color: var(--text-color-sidebar);
    white-space: nowrap;
    text-decoration: none;
    display: block;

    svg {
      margin-right: 7px;
      font-size: 16px;
    }

    &:hover {
      cursor: pointer;
      background-color: var(--sidebar-color-hover);
      transition: 0.25s ease-in-out;
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
