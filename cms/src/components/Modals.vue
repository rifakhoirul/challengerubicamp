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

<script>
export default {
  name: "Modals",
  props: {
    id: String,
  },
  methods: {
    closeChild() {
      this.$emit("closeParent", false);
    },
    deleteData() {
      this.$store.dispatch("deleteData", this.id).then(() => {
        this.$store.dispatch("getData", this.id).then(() => {
          this.$emit("closeParent", false);
        });
      });
    },
  },
};
</script>

<style scoped>
.Modals {
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  width: 100%;
  text-align: center;
  top: 25%;
  left: 50%;
  padding: 20px;
  transform: translate(-50%, 0);
}
</style>