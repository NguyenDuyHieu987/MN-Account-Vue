<template>
  <div class="success-message-container">
    <div class="left-side">
      <font-awesome-icon
        icon="fa-solid fa-circle-check"
        class="fa-circle-check"
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
  name: 'MessageSuccess',
  props: {
    message: {
      type: String,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.success-message-container {
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

.left-side {
  display: flex;
  flex-direction: row;
  align-items: center;

  .fa-circle-check {
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
