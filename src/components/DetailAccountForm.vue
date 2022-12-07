<template>
  <div class="detail-account" v-if="$store.state.detailAccount">
    <div class="input-container">
      <strong class="title-input">Id: </strong>
      <p>{{ $store.state.detailAccount?.id }}</p>
    </div>
    <div class="input-container">
      <strong class="title-input">Name: </strong>
      <p>{{ $store.state.detailAccount?.name }}</p>
    </div>
    <div class="input-container">
      <strong class="title-input">Phone: </strong>
      <p>{{ $store.state.detailAccount?.phone }}</p>
    </div>
    <div class="input-container">
      <strong class="title-input">Iban: </strong>
      <p>{{ $store.state.detailAccount?.iban }}</p>
    </div>
    <div class="input-container">
      <strong class="title-input">Pin: </strong>
      <p>{{ $store.state.detailAccount?.pin }}</p>
    </div>
    <div class="input-container">
      <strong class="title-input">Address: </strong>
      <p>{{ $store.state.detailAccount?.address }}</p>
    </div>
    <div class="input-container">
      <strong class="title-input">Balance: </strong>
      <p>{{ $store.state.detailAccount?.balance }}</p>
    </div>
    <div class="input-container">
      <strong class="title-input">Email: </strong>
      <p>{{ $store.state.detailAccount?.email }}</p>
    </div>
    <div class="input-container">
      <strong class="title-input">Date: </strong>
      <p>{{ $store.state.detailAccount?.date }}</p>
    </div>
  </div>
  <div class="loading-table" v-else>
    <half-circle-spinner
      :animation-duration="1000"
      :size="60"
      color="var(--header-table-color)"
      class="loading-icon"
    />
  </div>
</template>

<script>
import { HalfCircleSpinner } from 'epic-spinners';

export default {
  name: 'DetailAccountForm',
  components: {
    HalfCircleSpinner,
  },
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
  display: flex;
  flex-direction: row;
  align-items: center;

  .title-input {
    margin-right: 5px;
  }

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
