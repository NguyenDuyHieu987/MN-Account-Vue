<template>
  <div class="manage-account">
    <h2>Manage Account</h2>
    <div class="message-notification">
      <MessageNotification
        v-if="$store.state.showAddMessage"
        :message="
          !$store.state.failedMessage
            ? 'Successfully created'
            : 'Failed created'
        "
      />
      <MessageNotification
        v-if="$store.state.showUpdateMessage"
        :message="
          !$store.state.failedMessage
            ? 'Successfully updated'
            : 'Failed updated'
        "
      />
      <MessageNotification
        v-if="$store.state.showRemoveMessage"
        :message="
          !$store.state.failedMessage
            ? 'Successfully removed'
            : 'Failed removed'
        "
      />
    </div>
    <button class="btn-add-account" @click="btnAddOnClick">Add Account</button>
    <div class="manage-account-content">
      <div class="header-table">
        <div class="show-entries">
          <p>Show</p>
          <select
            v-model="showEntries"
            class="select-number-entries"
            @change="onChangeNumberEntries"
          >
            <option>10</option>
            <option>20</option>
            <option>30</option>
            <option>40</option>
            <option>50</option>
            <option>60</option>
            <option>70</option>
            <option>80</option>
            <option>90</option>
            <option>100</option>
          </select>
          <p>entries</p>
        </div>
        <div class="search-account">
          <p>Search</p>
          <input type="text" class="input-search" v-model="textInputSearch" />
        </div>
      </div>
      <div class="table-container">
        <div v-if="listAccount.length">
          <table>
            <tr>
              <th>Action</th>
              <th>id</th>
              <th>name</th>
              <th>phone</th>
              <th>iban</th>
              <th>pin</th>
              <th>address</th>
              <th>balance</th>
              <th>email</th>
              <th>date</th>
            </tr>

            <tr
              v-for="(account, index) in listAccount"
              :key="index"
              class="item"
            >
              <td class="action">
                <button class="btn-edit" @click="btnEditOnClick">
                  <font-awesome-icon icon="fa-solid fa-pencil" />
                </button>
                <button class="btn-remove" @click="btnRemoveOnClick">
                  <font-awesome-icon icon="fa-regular fa-trash-can" />
                </button>
                <button class="btn-detail" @click="btnDetailOnClick">
                  <font-awesome-icon icon="fa-solid fa-eye" />
                </button>
              </td>
              <td class="id">{{ account.id }}</td>
              <td>
                <p class="name">{{ account.name.slice(0, 25) }}</p>
              </td>
              <td>
                <p class="phone">{{ account.phone }}</p>
              </td>
              <td class="iban">{{ account.iban }}</td>
              <td class="pin">{{ account.pin }}</td>
              <td>
                <p class="address">{{ account.address }}</p>
              </td>
              <td class="balance">{{ account.balance }}</td>
              <td>
                <p class="email">{{ account.email }}</p>
              </td>
              <td class="date">
                {{ account.date }}
              </td>
            </tr>
          </table>
        </div>
        <div class="loading-table" v-else>
          <half-circle-spinner
            :animation-duration="1000"
            :size="60"
            color="var(--header-table-color)"
            class="loading-icon"
          />
        </div>
      </div>

      <div class="footer-table">
        <div class="numberof-account">
          <spam>Showing 1 to </spam>
          <span>{{ showEntries }} </span>
          <span> of </span>
          <span>{{ numberOfAccount }} </span>
          <span> entries</span>
        </div>
        <div class="pagination">
          <button @click="btnPreviousOnclick" :disabled="pageAccount == 0">
            Previous
          </button>
          <ul>
            <li>1</li>
            <li>2</li>
            <li>3</li>
          </ul>
          <button
            @click="btnNextOnclick"
            :disabled="pageAccount == numberOfAccount - 1"
          >
            Next
          </button>
        </div>
      </div>
    </div>
    <teleport to="body">
      <Modal
        v-if="
          isShowModalEdit ||
          isShowModalRemove ||
          isShowModalAdd ||
          isShowModalDetail
        "
        @close="
          isShowModalEdit = false;
          isShowModalRemove = false;
          isShowModalAdd = false;
          isShowModalDetail = false;
        "
        :action="{
          add: isShowModalAdd,
          edit: isShowModalEdit,
          remove: isShowModalRemove,
        }"
      >
        <template v-slot:header>
          <p v-if="isShowModalAdd">Add Account</p>
          <p v-if="isShowModalEdit">Edit Account</p>
          <p v-if="isShowModalRemove">Remove Account</p>
          <p v-if="isShowModalDetail">Detail Account</p>
        </template>
        <AddAccountForm v-if="isShowModalAdd" />
        <EditAccountForm v-if="isShowModalEdit" />
        <RemoveAccountForm v-if="isShowModalRemove" />
        <DetailAccountForm v-if="isShowModalDetail" />
        <template v-slot:footer>
          <div
            class="button-container"
            v-if="isShowModalEdit || isShowModalRemove || isShowModalAdd"
          >
            <button class="btn-close" @click="onClose">Close</button>
            <button class="btn-save" @click="onSaveChange">Save change</button>
          </div>
        </template>
      </Modal>
    </teleport>
  </div>
</template>

<script>
import { ref, watchEffect } from 'vue';
import { useStore } from 'vuex';
import { HalfCircleSpinner } from 'epic-spinners';
import Modal from './Modal.vue';
import AddAccountForm from './AddAccountForm.vue';
import EditAccountForm from './EditAccountForm.vue';
import RemoveAccountForm from './RemoveAccountForm.vue';
import MessageNotification from './MessageNotification.vue';
import DetailAccountForm from './DetailAccountForm.vue';
import axios from 'axios';

export default {
  name: 'ManageAccount',
  components: {
    HalfCircleSpinner,
    Modal,
    EditAccountForm,
    RemoveAccountForm,
    AddAccountForm,
    MessageNotification,
    DetailAccountForm,
  },
  data() {
    return {
      // pageAccount: 0,
      // isShowModalEdit: false,
      // isShowModalRemove: false,
      // isShowModalAdd: false,
      // isShowModalDetail: false,
      // showEntries: 10,
    };
  },
  setup() {
    const store = useStore();

    const textInputSearch = ref('');
    let pageAccount = ref(0);
    let isShowModalEdit = ref(false);
    let isShowModalRemove = ref(false);
    let isShowModalAdd = ref(false);
    let isShowModalDetail = ref(false);
    let showEntries = ref(10);

    const btnPreviousOnclick = () => {
      pageAccount.value = --pageAccount.value;
      store.dispatch('getListAccount', {
        pageAccount: pageAccount,
        showEntries: showEntries,
      });
    };
    const btnNextOnclick = () => {
      pageAccount.value = ++pageAccount.value;
      store.dispatch('getListAccount', {
        pageAccount: pageAccount.value,
        showEntries: showEntries.value,
      });
    };
    const btnEditOnClick = (e) => {
      isShowModalEdit.value = true;
      const item = e.target.closest('.item');
      const id = item.querySelector('.id');
      const name = item.querySelector('.name');
      const phone = item.querySelector('.phone');
      const iban = item.querySelector('.iban');
      const pin = item.querySelector('.pin');
      const address = item.querySelector('.address');
      const balance = item.querySelector('.balance');
      const email = item.querySelector('.email');
      const date = item.querySelector('.date');

      store.state.requestEditAccount.id = id.innerHTML;
      store.state.requestEditAccount.name = name.innerHTML;
      store.state.requestEditAccount.phone = phone.innerHTML;
      store.state.requestEditAccount.iban = iban.innerHTML;
      store.state.requestEditAccount.pin = pin.innerHTML;
      store.state.requestEditAccount.address = address.innerHTML;
      store.state.requestEditAccount.balance = balance.innerHTML;
      store.state.requestEditAccount.email = email.innerHTML;
      store.state.requestEditAccount.date = date.innerHTML;
    };
    const btnRemoveOnClick = (e) => {
      isShowModalRemove.value = true;
      const item = e.target.closest('.item');
      const id = item.querySelector('.id');
      store.state.requestRemoveAccount.id = id.innerHTML;
    };
    const btnAddOnClick = (e) => {
      isShowModalAdd.value = true;
      e.target.closest('');
    };
    const onChangeNumberEntries = () => {
      store.dispatch('getListAccount', {
        pageAccount: pageAccount.value,
        showEntries: showEntries.value,
      });
      store.dispatch('getNumberOfAccount');
    };
    const btnDetailOnClick = (e) => {
      isShowModalDetail.value = true;
      const item = e.target.closest('.item');
      const id = item.querySelector('.id').innerHTML;
      console.log(id.innerHTML);
      store.dispatch('getDetailAccount', { id });
    };
    const onClose = () => {
      isShowModalEdit.value = false;
      isShowModalRemove.value = false;
      isShowModalAdd.value = false;
      isShowModalDetail.value = false;
    };
    const onSaveChange = () => {
      if (isShowModalAdd.value) {
        axios
          .post(
            `${process.env.VUE_APP_SERViCE_URL}/account/addaccount`,
            store.state.requestAddAccount
          )
          .then((response) => {
            if (response.data.success) {
              store.dispatch('getListAccount', {
                pageAccount: pageAccount.value,
                showEntries: showEntries.value,
              });
              store.dispatch('getNumberOfAccount');
              onClose();
              store.state.showAddMessage = true;
              store.state.showUpdateMessage = false;
              store.state.showRemoveMessage = false;
              store.state.failedMessage = false;
            } else {
              store.state.showAddMessage = true;
              store.state.failedMessage = true;
              onClose();
            }
          })
          .catch((e) => {
            if (axios.isCancel(e)) return;
          });
      }
      if (isShowModalEdit.value) {
        axios
          .post(
            `${process.env.VUE_APP_SERViCE_URL}/account/updateaccount`,
            store.state.requestEditAccount
          )
          .then((response) => {
            if (response.data.success) {
              store.dispatch('getListAccount', {
                pageAccount: pageAccount.value,
                showEntries: showEntries.value,
              });
              store.dispatch('getNumberOfAccount');
              onClose();
              store.state.showUpdateMessage = true;
              store.state.showAddMessage = false;
              store.state.showRemoveMessage = false;
              store.state.failedMessage = false;
            } else {
              store.state.showUpdateMessage = true;
              store.state.failedMessage = true;
              onClose();
            }
          })
          .catch((e) => {
            if (axios.isCancel(e)) return;
          });
      }
      if (isShowModalRemove.value) {
        axios
          .post(
            `${process.env.VUE_APP_SERViCE_URL}/account/removeaccount`,
            store.state.requestRemoveAccount
          )
          .then((response) => {
            if (response.data.success) {
              store.dispatch('getListAccount', {
                pageAccount: pageAccount.value,
                showEntries: showEntries.value,
              });
              store.dispatch('getNumberOfAccount');
              onClose();
              store.state.showRemoveMessage = true;
              store.state.showUpdateMessage = false;
              store.state.showAddMessage = false;
              store.state.failedMessage = false;
            } else {
              store.state.showRemoveMessage = true;
              store.state.failedMessage = true;
              onClose();
            }
          })
          .catch((e) => {
            if (axios.isCancel(e)) return;
          });
      }
    };

    watchEffect(() => {
      if (textInputSearch.value.length > 0) {
        store.dispatch('searchAccount', {
          textInput: textInputSearch.value,
          pageAccount: pageAccount.value,
          showEntries: showEntries.value,
        });
      } else if (textInputSearch.value.length == 0) {
        store.dispatch('getListAccount', {
          pageAccount: pageAccount.value,
          showEntries: showEntries.value,
        });
      }
    });

    return {
      textInputSearch,
      pageAccount,
      isShowModalEdit,
      isShowModalRemove,
      isShowModalAdd,
      isShowModalDetail,
      showEntries,
      btnNextOnclick,
      btnPreviousOnclick,
      btnRemoveOnClick,
      btnEditOnClick,
      btnAddOnClick,
      onChangeNumberEntries,
      btnDetailOnClick,
      onClose,
      onSaveChange,
    };
  },
  methods: {
    // btnPreviousOnclick() {
    //   this.pageAccount = --this.pageAccount;
    //   this.$store.dispatch('getListAccount', {
    //     pageAccount: this.pageAccount,
    //     showEntries: this.showEntries,
    //   });
    // },
    // btnNextOnclick() {
    //   this.pageAccount = ++this.pageAccount;
    //   this.$store.dispatch('getListAccount', {
    //     pageAccount: this.pageAccount,
    //     showEntries: this.showEntries,
    //   });
    // },
    // btnEditOnClick(e) {
    //   this.isShowModalEdit = true;
    //   const item = e.target.closest('.item');
    //   const id = item.querySelector('.id');
    //   const name = item.querySelector('.name');
    //   const phone = item.querySelector('.phone');
    //   const iban = item.querySelector('.iban');
    //   const pin = item.querySelector('.pin');
    //   const address = item.querySelector('.address');
    //   const balance = item.querySelector('.balance');
    //   const email = item.querySelector('.email');
    //   const date = item.querySelector('.date');
    //   this.$store.state.requestEditAccount.id = id.innerHTML;
    //   this.$store.state.requestEditAccount.name = name.innerHTML;
    //   this.$store.state.requestEditAccount.phone = phone.innerHTML;
    //   this.$store.state.requestEditAccount.iban = iban.innerHTML;
    //   this.$store.state.requestEditAccount.pin = pin.innerHTML;
    //   this.$store.state.requestEditAccount.address = address.innerHTML;
    //   this.$store.state.requestEditAccount.balance = balance.innerHTML;
    //   this.$store.state.requestEditAccount.email = email.innerHTML;
    //   this.$store.state.requestEditAccount.date = date.innerHTML;
    // },
    // btnRemoveOnClick(e) {
    //   this.isShowModalRemove = true;
    //   const item = e.target.closest('.item');
    //   const id = item.querySelector('.id');
    //   this.$store.state.requestRemoveAccount.id = id.innerHTML;
    // },
    // btnAddOnClick(e) {
    //   this.isShowModalAdd = true;
    //   e.target.closest('');
    // },
    // onChangeNumberEntries() {
    //   this.$store.dispatch('getListAccount', {
    //     pageAccount: this.pageAccount,
    //     showEntries: this.showEntries,
    //   });
    //   this.$store.dispatch('getNumberOfAccount');
    // },
    // btnDetailOnClick(e) {
    //   this.isShowModalDetail = true;
    //   const item = e.target.closest('.item');
    //   const id = item.querySelector('.id').innerHTML;
    //   console.log(id.innerHTML);
    //   this.$store.dispatch('getDetailAccount', { id });
    // },
    // onClose() {
    //   this.isShowModalEdit = false;
    //   this.isShowModalRemove = false;
    //   this.isShowModalAdd = false;
    //   this.isShowModalDetail = false;
    // },
    // onSaveChange() {
    //   if (this.isShowModalAdd) {
    //     axios
    //       .post(
    //         `${process.env.VUE_APP_SERViCE_URL}/account/addAccount`,
    //         this.$store.state.requestAddAccount
    //       )
    //       .then((response) => {
    //         if (response.data.success) {
    //           this.$store.dispatch('getListAccount', {
    //             pageAccount: this.pageAccount,
    //             showEntries: this.showEntries,
    //           });
    //           this.$store.dispatch('getNumberOfAccount');
    //           this.onClose();
    //           this.$store.state.showAddMessage = true;
    //           this.$store.state.showUpdateMessage = false;
    //           this.$store.state.showRemoveMessage = false;
    //           this.$store.state.failedMessage = false;
    //         } else {
    //           this.$store.state.showAddMessage = true;
    //           this.$store.state.failedMessage = true;
    //           this.onClose();
    //         }
    //       })
    //       .catch((e) => {
    //         if (axios.isCancel(e)) return;
    //       });
    //   }
    //   if (this.isShowModalEdit) {
    //     axios
    //       .post(
    //         `${process.env.VUE_APP_SERViCE_URL}/account/updateaccount`,
    //         this.$store.state.requestEditAccount
    //       )
    //       .then((response) => {
    //         if (response.data.success) {
    //           this.$store.dispatch('getListAccount', {
    //             pageAccount: this.pageAccount,
    //             showEntries: this.showEntries,
    //           });
    //           this.$store.dispatch('getNumberOfAccount');
    //           this.onClose();
    //           this.$store.state.showUpdateMessage = true;
    //           this.$store.state.showAddMessage = false;
    //           this.$store.state.showRemoveMessage = false;
    //           this.$store.state.failedMessage = false;
    //         } else {
    //           this.$store.state.showUpdateMessage = true;
    //           this.$store.state.failedMessage = true;
    //           this.onClose();
    //         }
    //       })
    //       .catch((e) => {
    //         if (axios.isCancel(e)) return;
    //       });
    //   }
    //   if (this.isShowModalRemove) {
    //     axios
    //       .post(
    //         `${process.env.VUE_APP_SERViCE_URL}/account/removeaccount`,
    //         this.$store.state.requestRemoveAccount
    //       )
    //       .then((response) => {
    //         if (response.data.success) {
    //           this.$store.dispatch('getListAccount', {
    //             pageAccount: this.pageAccount,
    //             showEntries: this.showEntries,
    //           });
    //           this.$store.dispatch('getNumberOfAccount');
    //           this.onClose();
    //           this.$store.state.showRemoveMessage = true;
    //           this.$store.state.showUpdateMessage = false;
    //           this.$store.state.showAddMessage = false;
    //           this.$store.state.failedMessage = false;
    //         } else {
    //           this.$store.state.showRemoveMessage = true;
    //           this.$store.state.failedMessage = true;
    //           this.onClose();
    //         }
    //       })
    //       .catch((e) => {
    //         if (axios.isCancel(e)) return;
    //       });
    //   }
    // },
  },
  created() {
    this.$store.dispatch('getListAccount', {
      pageAccount: this.pageAccount,
      showEntries: this.showEntries,
    });
    this.$store.dispatch('getNumberOfAccount');
  },
  computed: {
    listAccount() {
      return this.$store.state.listAccount;
    },
    numberOfAccount() {
      return this.$store.state.numberOfAccount;
    },
  },
  watchEffect: {},
};
</script>

<style lang="scss" scoped>
.btn-add-account {
  color: var(--regular-color);
  background-color: var(--header-content-color);
  margin-top: 10px;
  padding: 10px 15px;
  cursor: pointer;
  border: none;
  border-radius: 4px;
  box-shadow: 4px 4px 2px #4d4d4d;

  &:hover {
    transition: 0.25s ease-in-out;
    background-color: var(--header-sidebar-color);
  }
}

.manage-account-content {
  background-color: var(--body-content-color);
  padding: 10px;
  margin-top: 20px;
  box-shadow: 6px 6px 3px #494949;
  border-radius: 5px;
}

.table-container {
  max-width: 100%;
  max-height: 700px;
  overflow: hidden;
  overflow: auto;
}

table {
  border-radius: 10px;
  border-collapse: collapse;
}

.loading-table {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 200px;
}

table,
th,
td {
  border: 1px solid;
}

th {
  background-color: var(--header-table-color);
}

th,
td {
  padding: 15px;
  text-align: left;
}

table tr:nth-child(odd) {
  background-color: #99999965;
}

// table tr:nth-child(even) {
//   background-color: white;
// }

td .name,
td .address,
td .phone,
td .email {
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  display: -webkit-box;
  text-overflow: ellipsis;
}

td.date {
  white-space: nowrap;
}

td.action {
  white-space: nowrap;

  button {
    padding: 6px 10px;
    cursor: pointer;
    border-radius: 3px;
    border: 1px solid gray;

    &:hover {
      background-color: #bebebe;
    }
  }

  button + button {
    margin-left: 5px;
  }
}

.footer-table {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  margin-bottom: 10px;
}

.pagination {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  button {
    padding: 10px;
    cursor: pointer;
  }

  ul {
    display: flex;
    flex-direction: row;
    // margin: 0px 5px;
  }

  li {
    list-style: none;
    padding: 9px 15px;
    cursor: pointer;
    border: 1px solid #2e2e2e;

    &:hover {
      background-color: #b8b8b8;
    }
  }
}

.header-table {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 15px 0px;
  border-bottom: 1px solid #2e2e2e;
}

.show-entries {
  display: flex;
  flex-direction: row;
  align-items: center;

  .select-number-entries {
    margin: 0px 8px;
    padding: 5px 30px 5px 5px;
    border: 1px solid #5a5a5a;
    border-radius: 3px;

    &:focus {
      border: 1px solid var(--header-content-color);
      outline: 1px solid var(--header-content-color);
    }
  }
}

.search-account {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-right: 1px;

  p {
    margin-right: 10px;
  }

  .input-search {
    padding: 5px 0px 5px 5px;
    border: 1px solid #5a5a5a;
    border-radius: 3px;

    &:focus {
      border: 1px solid var(--header-content-color);
      outline: 1px solid var(--header-content-color);
    }
  }
}

.button-container {
  button {
    cursor: pointer;
    border: none;
    margin-left: auto;
    transition: 0.25 ease-in-out;
    border-radius: 3px;
  }

  .btn-close {
    padding: 10px 15px;
    background-color: #fbfbfb;
    border: 1px solid #393939;

    &:hover {
      background-color: #b0b0b0;
    }
  }

  button + button {
    padding: 11px 15px;
    color: var(--regular-color);
    margin-left: 7px;
    background-color: var(--header-content-color);

    &:hover {
      background-color: var(--header-sidebar-color);
    }
  }
}
</style>
