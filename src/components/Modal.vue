<template>
  <div class="modal-fade">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h3>
            <strong>
              <slot name="header" />
            </strong>
          </h3>
          <div class="icon-close">
            <font-awesome-icon
              icon="fa-solid fa-xmark"
              class="fa-xmark"
              @click="$emit('close')"
            />
          </div>
        </div>
        <div class="modal-body">
          <slot />
        </div>
        <div class="modal-footer">
          <slot name="footer" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import axios from 'axios';

export default {
  name: 'Modal',

  props: {
    action: {
      type: String,
      required: true,
    },
  },
  methods: {
    // onSaveChange() {
    //   if (this.action.add) {
    //     axios
    //       .post(
    //         `${process.env.VUE_APP_SERViCE_URL}/account/addAccount`,
    //         this.$store.state.requestAddAccount
    //       )
    //       .then((response) => {
    //         if (response.data.success) {
    //           this.$store.dispatch('getListAccount', { pageAccount: 0 });
    //           this.$store.dispatch('getNumberOfAccount');
    //           this.$emit('close');
    //           this.$store.state.showAddMessage = true;
    //           this.$store.state.showUpdateMessage = false;
    //           this.$store.state.showRemoveMessage = false;
    //           this.$store.state.failedMessage = false;
    //         } else {
    //           this.$store.state.showAddMessage = true;
    //           this.$store.state.failedMessage = true;
    //           this.$emit('close');
    //         }
    //       })
    //       .catch((e) => {
    //         if (axios.isCancel(e)) return;
    //       });
    //   }
    //   if (this.action.edit) {
    //     axios
    //       .post(
    //         `${process.env.VUE_APP_SERViCE_URL}/account/updateaccount`,
    //         this.$store.state.requestEditAccount
    //       )
    //       .then((response) => {
    //         if (response.data.success) {
    //           this.$store.dispatch('getListAccount', { pageAccount: 0 });
    //           this.$store.dispatch('getNumberOfAccount');
    //           this.$emit('close');
    //           this.$store.state.showUpdateMessage = true;
    //           this.$store.state.showAddMessage = false;
    //           this.$store.state.showRemoveMessage = false;
    //           this.$store.state.failedMessage = false;
    //         } else {
    //           this.$store.state.showUpdateMessage = true;
    //           this.$store.state.failedMessage = true;
    //           this.$emit('close');
    //         }
    //       })
    //       .catch((e) => {
    //         if (axios.isCancel(e)) return;
    //       });
    //   }
    //   if (this.action.remove) {
    //     axios
    //       .post(
    //         `${process.env.VUE_APP_SERViCE_URL}/account/removeaccount`,
    //         this.$store.state.requestRemoveAccount
    //       )
    //       .then((response) => {
    //         if (response.data.success) {
    //           this.$store.dispatch('getListAccount', { pageAccount: 0 });
    //           this.$store.dispatch('getNumberOfAccount');
    //           this.$emit('close');
    //           this.$store.state.showRemoveMessage = true;
    //           this.$store.state.showUpdateMessage = false;
    //           this.$store.state.showAddMessage = false;
    //           this.$store.state.failedMessage = false;
    //         } else {
    //           this.$store.state.showRemoveMessage = true;
    //           this.$store.state.failedMessage = true;
    //           this.$emit('close');
    //         }
    //       })
    //       .catch((e) => {
    //         if (axios.isCancel(e)) return;
    //       });
    //   }
    // },
  },
};
</script>

<style scoped lang="scss">
.modal-fade {
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: var(--background-fade-color);
  z-index: 1;
  top: 0;
  left: 0;
  overflow-x: hidden;
  overflow-y: auto;
  outline: 0;
  color: var(--body-text-color);
}

.modal-dialog {
  position: relative;
  max-width: 600px;
  background-color: var(--body-content-color);
  margin: 1.75rem auto;
  border-radius: 5px;
  border: 1px solid #6868684f;
  box-shadow: 24px 24px 12px #1f1f1f85;
  animation: fade-modal 0.25s ease-in-out;
}

@keyframes fade-modal {
  from {
    opacity: 0;
    top: -600px;
  }

  to {
    opacity: 1;
    top: 0;
  }
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;

  .fa-xmark {
    cursor: pointer;
    font-size: 20px;
    padding: 5px;
    color: rgb(102, 102, 102);
  }
}

.modal-body {
  border-top: 1px solid;
  border-bottom: 1px solid;
  border-color: #6868684f;
  padding: 20px;
  overflow-y: auto;
  max-height: 400px;
}

.modal-content {
}

.modal-footer {
  padding: 20px;
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: flex-end;
}
</style>
