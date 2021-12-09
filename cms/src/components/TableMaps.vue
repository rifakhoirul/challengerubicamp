<template>
  <table class="table table-striped table-hover">
    <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Title</th>
        <th scope="col">Latitude</th>
        <th scope="col">Longitude</th>
        <th scope="col">Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item, index) in table" :key="item._id">
        <td class="align-middle">{{ index + 1 }}</td>
        <td class="align-middle">
          <input
            class="form-control form-control-sm"
            type="text"
            v-model="item.title"
            v-if="item._id == isUpdate"
            v-on:keyup.enter="updateMaps(item._id, item.title, item.lat, item.lng)"
          />
          <div v-else>{{ item.title }}</div>
        </td>
        <td class="align-middle">
          <input
            class="form-control form-control-sm"
            type="number"
            step="any"
            v-model="item.lat"
            v-if="item._id == isUpdate"
            v-on:keyup.enter="updateMaps(item._id, item.title, item.lat, item.lng)"
          />
          <div v-else>{{ item.lat }}</div>
        </td>
        <td class="align-middle">
          <input
            class="form-control form-control-sm"
            type="number"
            step="any"
            v-model="item.lng"
            v-if="item._id == isUpdate"
            v-on:keyup.enter="updateMaps(item._id, item.title, item.lat, item.lng)"
          />
          <div v-else>{{ item.lng }}</div>
        </td>
        <td class="align-middle">
          <button class="btn btn-sm btn-primary" @click="updateMaps(item._id, item.title, item.lat, item.lng)" v-if="item._id == isUpdate">
            <i class="bi bi-save"></i> Save
          </button>
          <button class="btn btn-sm btn-success" @click="isUpdate = item._id" v-else>
            <i class="bi bi-pencil-fill"></i> Update
          </button>
          <span class="ms-1"></span>
          <button class="btn btn-sm btn-secondary" @click="isUpdate = -1" v-if="item._id == isUpdate">
            <i class="bi bi-x-circle"></i> Cancel
          </button>
          <button class="btn btn-sm btn-danger" @click="showModalChild(item._id)" v-else>
            <i class="bi bi-trash-fill"></i> Delete
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import ActionButton from "@/components/ActionButton.vue";
import { mapState, mapActions } from "vuex";
export default {
  name: "TableMaps",
  components: {
    ActionButton,
  },
  data() {
    return {
      isUpdate: '',
    };
  },
  computed: {
    ...mapState({
      table: (state) => state.maps.tableMaps,
    }),
  },
  methods: {
    updateMaps(id, title, lat, lng) {
      let data = { title: title, lat: lat, lng: lng };
      this.$store.dispatch("editMaps", {id:id,data}).then(() => {
        // this.$store.dispatch("getMaps");
        this.isUpdate = -1;
        this.$emit('showInfoParent', 'Data updated successfully.')
      });
    },
    deleteMaps(id) {
      this.$store.dispatch("deleteMaps", id).then(() => {
        this.$store.dispatch("getMaps");
      });
    },
    showModalChild(id){
      this.$emit('showModalParent', id)
    }
  },
  created() {
    this.$store.dispatch("getMaps");
  },
};
</script>