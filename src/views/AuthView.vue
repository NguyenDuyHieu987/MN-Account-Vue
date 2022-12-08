<template>
  <div class="auth-container">
    <div class="Sign-in-container">
      <h1 class="title">Sign in</h1>
      <form class="form-input">
        <div class="input-container">
          <p class="title-input">Email or Username</p>
          <input
            type="text"
            placeholder="Email or Username"
            v-model="username"
          />
        </div>
        <div class="input-container">
          <p class="title-input">Password</p>
          <input type="password" placeholder="Password" v-model="password" />
        </div>
        <button type="submit" class="btn-signin" @click.prevent="onSignIn">
          Sig in
        </button>
      </form>
    </div>

    <div v-if="showLoading" class="loading-signin">
      <fulfilling-bouncing-circle-spinner
        :animation-duration="2000"
        :size="60"
        color="var(--header-table-color)"
      />
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { FulfillingBouncingCircleSpinner } from 'epic-spinners';

export default {
  name: 'AuthView',
  components: {
    FulfillingBouncingCircleSpinner,
  },
  data() {
    return {
      username: '',
      password: '',
      showLoading: false,
    };
  },
  methods: {
    onSignIn() {
      this.showLoading = true;
      axios
        .post(`${process.env.VUE_APP_SERVICE_URL}/auth/login`, {
          username: this.username,
          password: this.password,
        })
        .then((response) => {
          if (response.data == '') {
            console.log('Failed Sign in');
          } else {
            this.$store.state.userAccount = response.data;
            window.localStorage.setItem('userToken', response.data.usertoken);
            this.showLoading = false;
            this.$router.push({ path: '/' });
          }
        })
        .catch((e) => {
          if (axios.isCancel(e)) return;
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.auth-container {
  color: var(--body-text-color);
  min-height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  // background-color: var(--body-text-color);
  background-color: var(--body-content-color);
}

.Sign-in-container {
  background-color: var(--sidebar-color-hover);
  width: 500px;
  height: 400px;
  box-shadow: 0px 0px 30px 4px #2d2d2d;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  border-radius: 5px;
  color: var(--regular-color);

  .title {
    margin-top: 20px;
    color: var(--header-content-color);
  }

  .form-input {
    padding: 0px 100px;
    margin-top: 50px;
    width: 100%;

    .input-container + .input-container {
      margin-top: 15px;
    }

    input {
      margin-top: 5px;
      width: 100%;
      background-color: transparent;
      padding: 7px 0px 10px 8px;
      border: 1px solid #5a5a5a;
      border-radius: 3px;
      color: var(--regular-color);

      &:focus {
        border: 1px solid var(--header-content-color);
        outline: 1px solid var(--header-content-color);
      }
    }
  }

  .btn-signin {
    color: var(--regular-color);
    background-color: var(--header-content-color);
    padding: 10px 0px;
    width: 100%;
    cursor: pointer;
    transition: 0.25s ease-in-out;
    margin-top: 40px;
    border-radius: 5px;

    &:hover {
      background-color: var(--header-sidebar-color);
    }
  }
}

.loading-signin {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: #0f0f0fc1;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
