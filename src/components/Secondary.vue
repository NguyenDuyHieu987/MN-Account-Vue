<template>
  <div class="wrapper-sidebar" :class="{ active: activeSideBar }">
    <div class="sidebar-container">
      <div class="header-sidebar">
        <p class="title-header-sidebar">Admin</p>
      </div>
      <div class="content-sidebar">
        <ul id="menu">
          <li>
            <font-awesome-icon
              icon="fa-solid fa-file-invoice"
              class="fa-file-invoice"
            />
            <span> Manage Account</span>
          </li>
          <li @click="onLogout">
            <font-awesome-icon icon="fa-solid fa-arrow-right-from-bracket" />
            <span>Log out</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { useStore, mapGetters } from 'vuex';
import { useRouter } from 'vue-router';
export default {
  name: 'Secondary',
  setup() {
    const store = useStore();
    const router = useRouter();
    const onLogout = () => {
      router.push({ path: '/auth' });
    };
    return {
      activeSideBar1: store.getters.activeSideBar,
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
    padding: 12px 10px 12px 15px;
    cursor: pointer;
    color: var(--text-color-sidebar);
    white-space: nowrap;

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
