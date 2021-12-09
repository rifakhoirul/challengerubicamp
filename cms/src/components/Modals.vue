<template>
  <div class="Modals">
    <div class="" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Confirmation</h5>
            <button
              type="button"
              class="btn-close"
              @click="closeChild"
            ></button>
          </div>
          <div class="modal-body">
            <p>Are you sure want to delete this data?</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="closeChild">
              Cancel
            </button>
            <button type="button" class="btn btn-danger" @click="deleteData">
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.Modals {
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  width: 100%;
  height:100%;
  text-align: center;
  padding: 80px;
  transform: translate(0, -9%);
  z-index: 99;
}
</style>

<script>
export default {
  name: "Modals",
  props: {
    id: String,
  },
  methods: {
    closeChild() {
      this.$emit("closeParent", 'close');
    },
    deleteData() {
      if (this.id.split(" ")[0] == "Data") {
        this.$store.dispatch("deleteData", this.id.split(" ")[1]).then(() => {
          this.$store.dispatch("getData", this.id.split(" ")[1]).then(() => {
            this.$emit("closeParent", false);
          });
        });
      } else if(this.id.split(" ")[0] == "Maps") {
        this.$store.dispatch("deleteMaps", this.id.split(" ")[1]).then(() => {
          this.$store.dispatch("getMaps", this.id.split(" ")[1]).then(() => {
            this.$emit("closeParent", false);
          });
        });
      } else {
        this.$store.dispatch("deleteDataDate", this.id.split(" ")[1]).then(() => {
          this.$store.dispatch("getDataDate", this.id.split(" ")[1]).then(() => {
            this.$emit("closeParent", false);
          });
        });
      }
    },
  },
};
</script>

