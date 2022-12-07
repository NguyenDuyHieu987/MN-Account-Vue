<template>
  <div class="input-container">
    <p class="title-input">Name</p>
    <input type="text" v-model="$store.state.requestEditAccount.name" />
  </div>
  <div class="input-container">
    <p class="title-input">Phone</p>
    <input type="text" v-model="$store.state.requestEditAccount.phone" />
  </div>
  <div class="input-container">
    <p class="title-input">Iban</p>
    <input type="text" v-model="$store.state.requestEditAccount.iban" />
  </div>
  <div class="input-container">
    <p class="title-input">Pin</p>
    <input type="text" v-model="$store.state.requestEditAccount.pin" />
    <p class="error">{{ formEditError?.pinError }}</p>
  </div>
  <div class="input-container">
    <p class="title-input">Address</p>
    <input type="text" v-model="$store.state.requestEditAccount.address" />
  </div>
  <div class="input-container">
    <p class="title-input">Balance</p>
    <input type="text" v-model="$store.state.requestEditAccount.balance" />
    <p class="error">{{ formEditError?.balanceError }}</p>
  </div>
  <div class="input-container">
    <p class="title-input">Email</p>
    <input type="text" v-model="$store.state.requestEditAccount.email" />
  </div>
  <div class="input-container">
    <p class="title-input">Date</p>
    <input type="text" v-model="$store.state.requestEditAccount.date" />
  </div>
</template>

<script>
export default {
  name: 'EditAccountForm',
  props: {
    formEditError: {
      type: Object,
    },
  },
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.input-container + .input-container {
  margin-top: 10px;
}

.input-container {
  input {
    margin-top: 5px;
    width: 100%;
    height: 33px;
    padding-left: 5px;
    border: 1px solid #5a5a5a;
    border-radius: 3px;

    &:focus {
      border: 1px solid var(--header-content-color);
      outline: 1px solid var(--header-content-color);
    }
  }
}

.error {
  color: var(--failed-color);
}
</style>
