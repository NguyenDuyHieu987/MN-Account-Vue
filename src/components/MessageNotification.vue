<template>
  <div
    :class="{ failed: $store.state.failedMessage }"
    class="message-container"
  >
    <div class="left-side">
      <font-awesome-icon
        v-if="$store.state.failedMessage"
        icon="fa-solid fa-circle-exclamation"
        class="icon-message"
      />
      <font-awesome-icon
        v-else
        icon="fa-solid fa-circle-check"
        class="icon-message"
      />
      <p class="message">{{ message }}</p>
    </div>
    <div class="right-side">
      <font-awesome-icon
        icon="fa-regular fa-circle-xmark"
        class="fa-circle-xmark"
        @click="
          $store.state.showAddMessage = false;
          $store.state.showUpdateMessage = false;
          $store.state.showRemoveMessage = false;
        "
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'MessageNotification',
  props: {
    message: {
      type: String,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.message-container {
  width: 100%;
  padding: 15px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  color: var(--body-text-color);
  border-radius: 4px;
  margin: 10px 0px;
  box-shadow: 6px 6px 3px #4d4d4d;
  background-color: #e9e9e9;
  border-left: 7px solid var(--success-color);
}

.failed.message-container {
  border-left: 7px solid var(--failed-color);

  .icon-message {
    color: var(--failed-color);
  }
}

.left-side {
  display: flex;
  flex-direction: row;
  align-items: center;

  .icon-message {
    font-size: 18px;
    color: var(--success-color);
  }
}

.right-side {
  display: flex;
  align-items: center;

  .fa-circle-xmark {
    font-size: 18px;
    cursor: pointer;
  }
}

.message {
  margin-left: 10px;
}
</style>
