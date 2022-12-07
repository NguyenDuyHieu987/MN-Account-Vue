<template>
  <div class="input-container">
    <p class="title-input">Id</p>
    <input type="text" v-model="$store.state.requestAddAccount.id" />
  </div>
  <div class="input-container">
    <p class="title-input">Name</p>
    <input type="text" v-model="$store.state.requestAddAccount.name" />
  </div>
  <div class="input-container">
    <p class="title-input">Phone</p>
    <input type="text" v-model="$store.state.requestAddAccount.phone" />
  </div>
  <div class="input-container">
    <p class="title-input">Iban</p>
    <input type="text" v-model="$store.state.requestAddAccount.iban" />
  </div>
  <div class="input-container">
    <p class="title-input">Pin</p>
    <input type="text" v-model="$store.state.requestAddAccount.pin" />
  </div>
  <div class="input-container">
    <p class="title-input">Address</p>
    <input type="text" v-model="$store.state.requestAddAccount.address" />
  </div>
  <div class="input-container">
    <p class="title-input">Balance</p>
    <input type="text" v-model="$store.state.requestAddAccount.balance" />
  </div>
  <div class="input-container">
    <p class="title-input">Email</p>
    <input type="text" v-model="$store.state.requestAddAccount.email" />
  </div>
  <div class="input-container">
    <p class="title-input">Date</p>
    <input type="text" v-model="$store.state.requestAddAccount.date" />
  </div>
</template>

<script>
export default {
  name: 'AddAccountForm',
  props: {},
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
</style>
