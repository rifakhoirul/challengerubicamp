<template>
  <table class="table table-striped table-hover">
    <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Letter</th>
        <th scope="col">Frequency</th>
        <th scope="col">Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item, index) in table" :key="item._id">
        <td class="align-middle">{{ index + 1 }}</td>
        <td class="align-middle">
          <input
            class="form-control form-control-sm"
            type="date"
            v-model="item.letter"
            v-if="item._id == isUpdate"
            v-on:keyup.enter="updateData(item._id, item.letter, item.frequency)"
          />
          <div v-else>{{ item.letter }}</div>
        </td>
        <td class="align-middle">
          <input
            class="form-control form-control-sm"
            type="number"
            step="any"
            v-model="item.frequency"
            v-if="item._id == isUpdate"
            v-on:keyup.enter="updateData(item._id, item.letter, item.frequency)"
          />
          <div v-else>{{ item.frequency }}</div>
        </td>
        <td class="align-middle">
          <button class="btn btn-sm btn-primary" @click="updateData(item._id, item.letter, item.frequency)" v-if="item._id == isUpdate">
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
import { mapState } from "vuex";
export default {
  name: "TableDataDate",
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
      table: (state) => state.datadate.tableDataDate,
    }),
  },
  methods: {
    updateData(id, letter, frequency) {
      let data = { letter: letter, frequency: frequency };
      this.$store.dispatch("editDataDate", {id:id,data}).then(() => {
        // this.$store.dispatch("getData");
        this.isUpdate = -1;
        this.$emit('showInfoParent', 'Data updated successfully.')
      });
    },
    deleteData(id) {
      this.$store.dispatch("deleteDataDate", id).then(() => {
        this.$store.dispatch("getDataDate");
      });
    },
    showModalChild(id){
      this.$emit('showModalParent', id)
    }
  },
  created() {
    this.$store.dispatch("getDataDate");
  },
};
</script>