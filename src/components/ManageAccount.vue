<template>
  <div class="manage-account">
    <h2>Manage Account</h2>
    <button class="btn-add-account" @click="btnAddOnClick">Add Account</button>
    <div class="manage-account-content">
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
              </td>
              <td>{{ account.id }}</td>
              <td>
                <p class="name">{{ account.name.slice(0, 25) }}</p>
              </td>
              <td>
                <p class="phone">{{ account.phone }}</p>
              </td>
              <td>{{ account.iban }}</td>
              <td>{{ account.pin }}</td>
              <td>
                <p class="address">{{ account.address }}</p>
              </td>
              <td>{{ account.balance }}</td>
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

      <div class="footer-content">
        <div class="numberof-account">
          <spam>Showing 1 to </spam>
          <span>10 </span>
          <span>of </span>
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
        v-if="isShowModalEdit || isShowModalRemove || isShowModalAdd"
        @close="
          isShowModalEdit = false;
          isShowModalRemove = false;
          isShowModalAdd = false;
        "
      >
        <template v-slot:header>
          <p v-if="isShowModalAdd">Add Account</p>
          <p v-if="isShowModalEdit">Edit Account</p>
          <p v-if="isShowModalRemove">Remove Account</p>
        </template>
        <EditAccountForm v-if="isShowModalAdd" />
        <EditAccountForm v-if="isShowModalEdit" />
        <RemoveAccountForm v-if="isShowModalRemove" />
      </Modal>
    </teleport>
  </div>
</template>

<script>
import { HalfCircleSpinner } from 'epic-spinners';
import Modal from './Modal.vue';
import EditAccountForm from './EditAccountForm.vue';
import RemoveAccountForm from './RemoveAccountForm.vue';

export default {
  name: 'ManageAccount',
  components: { HalfCircleSpinner, Modal, EditAccountForm, RemoveAccountForm },
  data() {
    return {
      pageAccount: 0,
      isShowModalEdit: false,
      isShowModalRemove: false,
      isShowModalAdd: false,
    };
  },
  methods: {
    btnPreviousOnclick() {
      this.pageAccount = --this.pageAccount;
      this.$store.dispatch('getListAccount', { pageAccount: this.pageAccount });
    },
    btnNextOnclick() {
      this.pageAccount = ++this.pageAccount;
      this.$store.dispatch('getListAccount', { pageAccount: this.pageAccount });
    },
    btnEditOnClick(e) {
      this.isShowModalEdit = true;
      e.target.closest('');
    },
    btnRemoveOnClick(e) {
      this.isShowModalRemove = true;
      e.target.closest('');
    },
    btnAddOnClick(e) {
      this.isShowModalAdd = true;
      e.target.closest('');
    },
  },
  created() {
    this.$store.dispatch('getListAccount', { pageAccount: this.pageAccount });
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
  box-shadow: 4px 4px 2px #7c7c7c;

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
  overflow: hidden;
  overflow-x: auto;
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

.footer-content {
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
</style>
