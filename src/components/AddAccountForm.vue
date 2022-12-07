<template>
  <div class="input-container">
    <p class="title-input">Id</p>
    <input type="text" v-model="$store.state.requestAddAccount.id" />
    <p class="error">{{ formAddError?.idError }}</p>
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
    <p class="error">{{ formAddError?.pinError }}</p>
  </div>
  <div class="input-container">
    <p class="title-input">Address</p>
    <input type="text" v-model="$store.state.requestAddAccount.address" />
  </div>
  <div class="input-container">
    <p class="title-input">Balance</p>
    <input type="text" v-model="$store.state.requestAddAccount.balance" />
    <p class="error">{{ formAddError?.balanceError }}</p>
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
  props: {
    formAddError: {
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
