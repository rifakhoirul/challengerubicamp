<template>
  <div class="maps">
    <Navbar submenu="Maps" />
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
                <div>Title</div>
              </div>
              <div class="col-md-2">
                <input
                  class="form-control me-auto"
                  type="text"
                  placeholder="Title of map"
                  v-model="form.title"
                />
              </div>
              <div class="col-md-1">
                <div>Latitude</div>
              </div>
              <div class="col-md-2">
                <input
                  class="form-control me-auto"
                  type="number"
                  placeholder="0.0000"
                  v-model="form.lat"
                  step="any"
                />
              </div>
              <div class="col-md-1">
                <div>Longitude</div>
              </div>
              <div class="col-md-2">
                <input
                  class="form-control me-auto"
                  type="number"
                  placeholder="0.0000"
                  v-model="form.lng"
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
          <div>Title</div>
          <input
            class="form-control me-auto"
            type="text"
            placeholder="Title of map"
            v-model="searchTitle"
            @keyup="searchData"
          />
        </div>
      </div>
      <div>
        <TableMaps
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
import TableMaps from "@/components/TableMaps.vue";

export default {
  data() {
    return {
      showAddData: false,
      showAddDataSuccess: false,
      msg: "Data added successfully.",
      form: {
        title: "",
        lat: null,
        lng: null,
      },
      errors: null,
      showModal: false,
      idDelete: "",
      searchTitle: "",
    };
  },
  components: {
    Navbar,
    TableMaps,
    Modals,
  },
  methods: {
    addData() {
      this.showAddDataSuccess = true;
      this.showAddData = false;
      this.$store
        .dispatch("addMaps", this.form)
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
        this.idDelete = `Maps ${id}`;
      }
    },
    searchData() {
      let data = { title: this.searchTitle };
      this.$store.dispatch("searchMaps", data);
    },
    showInfo(msg) {
      console.log(msg);
      this.msg = msg;
      this.showAddDataSuccess = true;
    },
  },
};
</script>