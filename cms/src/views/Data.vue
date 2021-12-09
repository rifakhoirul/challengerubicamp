<template>
  <div class="data">
    <Navbar submenu="Data" />
    <Modals v-if="showModal" @closeParent="showModals($event)" :id="idDelete" />
    <div class="container p-5 mt-5">
      <div class="text-start">
        <button
          class="btn btn-primary mb-4"
          @click="showAddData = !showAddData"
        >
          <i class="bi bi-plus-circle-fill"></i> Add
        </button>
        <div class="alert alert-primary" role="alert" v-if="showAddData">
          <form v-on:submit.prevent="addData">
            <div class="row align-items-center">
              <div class="col-md-1">
                <div>Letter</div>
              </div>
              <div class="col-md-3">
                <input
                  class="form-control me-auto"
                  type="text"
                  placeholder="A"
                  v-model="form.letter"
                  @keyup="upperCase"
                />
              </div>
              <div class="col-md-1">
                <div>Frequency</div>
              </div>
              <div class="col-md-3">
                <input
                  class="form-control me-auto"
                  type="number"
                  placeholder="0.0000"
                  @keyup="forceNumber"
                  v-model="form.frequency"
                  step="any"
                />
              </div>
              <div class="col-md-2">
                <button
                  class="btn btn-success"
                  type="submit"
                  @click="showAddDataSuccess = true"
                >
                  <i class="bi bi-save"></i> Save
                </button>
              </div>
            </div>
          </form>
        </div>
        <div
          class="alert alert-warning alert-dismissible fade show"
          role="alert"
          v-if="showAddDataSuccess"
        >
          {{ msg }}
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="alert"
            aria-label="Close"
            @click="showAddDataSuccess = !showAddDataSuccess"
          ></button>
        </div>
      </div>
      <div class="text-start">
        <h5><strong>Search</strong></h5>
      </div>
      <div class="mb-4">
        <div class="hstack gap-2">
          <div>Letter</div>
          <input
            class="form-control me-auto"
            type="text"
            placeholder="A"
            v-model="searchLetter"
            @keyup="searchData"
          />
          <div>Frequency</div>
          <input
            class="form-control me-auto"
            type="number"
            placeholder="0.0000"
            step="any"
            v-model="searchFrequency"
            @keyup="searchData"
          />
        </div>
      </div>
      <div>
        <TableData
          @showModalParent="showModals($event)"
          @showInfoParent="showInfo($event)"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import Modals from "@/components/Modals.vue";
import TableData from "@/components/TableData.vue";

export default {
  data() {
    return {
      showAddData: false,
      showAddDataSuccess: false,
      msg: "Data added successfully.",
      form: {
        letter: "",
        frequency: null,
      },
      errors: null,
      showModal: false,
      idDelete: "",
      searchLetter: "",
      searchFrequency: null,
      numberBefore: null,
    };
  },
  components: {
    Navbar,
    TableData,
    Modals,
  },
  methods: {
    addData() {
      this.showAddDataSuccess = true;
      this.showAddData = false;
      this.$store
        .dispatch("addData", this.form)
        .then((response) => {})
        .catch((error) => {
          this.errors = error;
        });
    },
    showModals(id) {
      if (id == false) {
        this.showModal = false;
        this.msg = "Data deleted successfully";
        this.showAddDataSuccess = true;
      } else if (id == "close") {
        this.showModal = false;
        this.msg = "Data deleted successfully";
      } else {
        this.showModal = true;
        this.idDelete = `Data ${id}`;
      }
    },
    searchData() {
      let data = { letter: this.searchLetter, frequency: this.searchFrequency };
      this.$store.dispatch("searchData", data);
    },
    showInfo(msg) {
      this.msg = msg;
      this.showAddDataSuccess = true;
    },
    upperCase() {
      this.form.letter = this.form.letter.toUpperCase();
    },
    forceNumber() {
      this.form.frequency = Number(this.form.frequency)
      console.log(this.form.frequency)
      // if(this.form.frequency == ""){this.form.frequency=1}
      // if (this.form.frequency == "") {
      //   this.form.frequency = 0;
      //   this.numberBefore = 0
      // }
      // else if (this.numberBefore == 0) {
      //   this.form.frequency = null
      // }
      // if (this.form.frequency == 0 && this.numberBefore == 0) {
      //   this.form.frequency = null;
      // }
      // if (this.form.frequency == 0) {
      //   this.form.frequency = null;
      // }
      
      
      // else if (this.form.frequency == "" && this.numberBefore == 0) {
      //   this.form.frequency = null;
      // } 
      
      // this.numberBefore = this.form.frequency;
    },
  },
};
</script>