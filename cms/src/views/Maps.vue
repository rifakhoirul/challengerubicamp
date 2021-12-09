<template>
  <div class="maps">
    <Navbar submenu="Maps" />
    <Modals v-if="showModal" @closeParent="showModals($event)" :id="idDelete" />
    <div class="container p-5 mt-5">
      <div class="text-start">
        <button
          class="btn btn-primary mb-4"
          @click="showAddData = !showAddData"
          v-show="addButton"
        >
          <i class="bi bi-plus-circle-fill"></i> Add
        </button>
        <div class="alert alert-primary" role="alert" v-show="showAddData">
          <form v-on:submit.prevent="addData">
            <div class="row align-items-center mb-3">
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
                  v-model="marker.position.lat"
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
                  v-model="marker.position.lng"
                  step="any"
                />
              </div>
              <div class="col-md-2">
                <a
                  class="btn btn-success"
                  type="submit"
                  @click="showAddDataSuccess = true"
                  v-show="addButton"
                >
                  <i class="bi bi-save"></i> Save
                </a>
                <button
                  class="btn btn-primary"
                  type="submit"
                  @click="showAddDataSuccess = true"
                  v-if="!addButton"
                >
                  <i class="bi bi-save"></i> Update
                </button>
                <a
                  class="btn btn-danger"
                  type="submit"
                  @click="cancelUpdate"
                  v-if="!addButton"
                >
                  <i class="bi bi-x-circle"></i>
                </a>
              </div>
              <div class="col-md-2"></div>
            </div>
            <div>
              <GmapMap
                :center="center"
                :zoom="15"
                map-style-id="roadmap"
                :options="mapOptions"
                style="width: 100%; height: 75vmin"
                ref="mapRef"
                @click="handleMapClick"
              >
                <GmapMarker
                  :position="marker.position"
                  :clickable="true"
                  :draggable="true"
                  @drag="handleMarkerDrag"
                  @click="panToMarker"
                />
              </GmapMap>
              <a @click="geolocate" class="btn btn-primary mt-3"
                >Locate your position</a
              >
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
          @showUpdateParent="showUpdate($event)"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import Modals from "@/components/Modals.vue";
import TableMaps from "@/components/TableMaps.vue";
import GoogleMapAdmin from "@/components/GoogleMapAdmin.vue";

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
      marker: { position: { lat: 10, lng: 10 } },
      center: { lat: 10, lng: 10 },

      mapOptions: {
        disableDefaultUI: true,
      },
      addButton: true,
      saveId:'',
    };
  },
  components: {
    Navbar,
    TableMaps,
    Modals,
    GoogleMapAdmin,
  },
  mounted() {
    this.geolocate();
  },
  methods: {
    cancelUpdate() {
      this.addButton = true;
      this.showAddData = false;
    },
    locationUpdated(latlng) {
      this.latitude = latlng.lat;
      this.longitude = latlng.lng;
    },
    addData() {
      this.form.lat = this.marker.position.lat;
      this.form.lng = this.marker.position.lng;
      this.showAddDataSuccess = true;
      this.showAddData = false;
      if (this.addButton == true) {
        this.$store
          .dispatch("addMaps", this.form)
          .then((response) => {})
          .catch((error) => {
            this.errors = error;
          });
      } else {
        this.$store.dispatch("editMaps", {id:this.saveId,data:this.form}).then(() => {
          this.addButton = true
      });
      }
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
    showUpdate(data) {
      this.showAddData = true
      this.addButton = false
      this.saveId = data.id
      this.form.title = data.title;
      this.marker.position.lat = data.lat;
      this.marker.position.lng = data.lng;
      this.panToMarker();
    },
    geolocate() {
      navigator.geolocation.getCurrentPosition((position) => {
        this.marker.position = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };

        this.panToMarker();
      });
    },

    //sets the position of marker when dragged
    handleMarkerDrag(e) {
      this.marker.position = { lat: e.latLng.lat(), lng: e.latLng.lng() };
    },

    //Moves the map view port to marker
    panToMarker() {
      this.$refs.mapRef.panTo(this.marker.position);
      this.$refs.mapRef.setZoom(15);
    },

    //Moves the marker to click position on the map
    handleMapClick(e) {
      this.marker.position = { lat: e.latLng.lat(), lng: e.latLng.lng() };
    },
  },
};
</script>