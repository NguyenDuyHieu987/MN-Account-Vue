<template>
  <router-link :to="to" class="nav-link" :class="{ active: isActive }">
    <font-awesome-icon icon="fa-solid fa-arrow-right-from-bracket" />
    <span>{{ title }}</span>
  </router-link>
</template>

<script>
import { useRoute } from 'vue-router';
import { computed } from 'vue';

export default {
  name: 'SideBarLink',
  props: {
    to: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const route = useRoute();
    const isActive = computed(() => route.path === props.to);
    return {
      isActive,
    };
  },
};
</script>

<style lang="scss" scoped>
.nav-link {
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

.nav-link.active {
  background-color: var(--sidebar-color-hover);
}
</style>
