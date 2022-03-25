<template>
  <base-card class="text-start">
    <template v-slot:main>
      <form
        class="row g-3 needs-validation"
        @submit.prevent="submitForm"
        novalidate
      >
        <div class="col-md-4">
          <label for="Name" class="form-label">Name</label>
          <input
            type="text"
            class="form-control"
            id="Name"
            required
            v-model="recordToEdit.Name"
          />
        </div>
        <div class="col-md-4">
          <label for="Department" class="form-label">Department</label>
          <input
            type="text"
            class="form-control"
            id="Department"
            required
            v-model="recordToEdit.Department"
          />
        </div>
        <div class="col-md-4">
          <label for="HireDate" class="form-label">Hire Date</label>
          <input
            type="date"
            class="form-control"
            id="HireDate"
            required
            v-model="recordToEdit.HireDate"
          />
        </div>
        <div class="col-md-4">
          <label for="Balance" class="form-label">Balance</label>
          <input
            type="number"
            step=".01"
            class="form-control"
            id="Balance"
            required
            v-model="recordToEdit.Balance"
          />
        </div>
        <div class="col-md-4">
          <label for="Counter" class="form-label">Counter</label>
          <input
            type="number"
            class="form-control"
            id="Counter"
            required
            v-model="recordToEdit.Counter"
          />
        </div>

        <div class="col-12 text-end">
          <button class="btn btn-secondary mx-1" @click="clearForm">
            Clear
          </button>
          <button class="btn btn-primary mx-1" type="submit">Submit</button>
        </div>
        <div class="col-8 text-end"></div>
        <div class="col-2 text-end">
          <input
            type="number"
            class="form-control"
            id="Counter"
            required
            v-model="recordID"
          />
        </div>
        <div class="col-2">
          <button
            type="button"
            @click="getRecordByIDAction(recordID)"
            class="btn btn-outline-primary"
          >
            Connect To API
          </button>
        </div>
      </form>
    </template>
  </base-card>
  <table class="table shadow mt-3">
    <thead>
      <tr>
        <th scope="col">RecordID</th>
        <th scope="col">NAME</th>
        <th scope="col">DEPARTMENT</th>
        <th scope="col">HIRE DATE</th>
        <th scope="col">BALANCE</th>
        <th scope="col">COUNTER</th>
        <th scope="col">EDIT</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(record, index) in getDBRows" :key="index">
        <th scope="row">{{ record.RecordID }}</th>
        <td>{{ record.Name }}</td>
        <td>{{ record.Department }}</td>
        <td>{{ record.HireDate }}</td>
        <td>{{ record.Balance }}</td>
        <td>{{ record.Counter }}</td>
        <td>
          <button
            class="btn btn-warning"
            @click="changeRecordToEdit(record.RecordID)"
          >
            EDIT
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
// import { mapActions, mapGetters } from "vuex";
import APITestService from "../services/TestService.js";

const APITestServ = new APITestService();

export default {
  //   name: "#DataList",
  //   components: {
  //     CustomSelect,
  //   },

  data() {
    return {
      recordToEdit: {
        RecordID: "",
        Name: "",
        Department: "",
        HireDate: "",
        Balance: 0.0,
        Counter: 0,
      },
      recordID: null,
    };
  },
  //   computed: {
  //     ...mapGetters("Test", ["getDBRows", "getRowByID"]),
  //   },
  methods: {
    // ...mapActions("Test", ["getRecordByIDAction"]),
    // submitForm() {
    //   //do the ting from active
    // },
    async getAllQuestionsAction() {
      console.log("1 - this.itemQuestions", this.itemQuestions);
      const response = await APITestServ.getTestByID();
      console.log("response  //   ", response);
      this.itemQuestions = response.data.Data;
      console.log("2 - itemQuestions  //   ", this.itemQuestions[0]);
    },

    changeRecordToEdit(id) {
      console.log(this.getRowByID(id));
      this.recordToEdit = this.getRowByID(id);
    },
    clearForm() {
      this.recordToEdit = {
        RecordID: "",
        Name: "",
        Department: "",
        HireDate: "",
        Balance: 0.0,
        Counter: 0,
      };
    },
  },
  mounted() {
    this.getAllQuestionsAction();
    this.getQuestionEditableValuesAction();
  },
};
</script>

<style>
</style>