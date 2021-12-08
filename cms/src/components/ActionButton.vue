<template>
  <div class="ActionButton">
    <button class="btn btn-sm btn-success">
      <i class="bi bi-pencil-fill"></i> Update
    </button>
    <span class="ms-1"></span>
    <button class="btn btn-sm btn-danger">
      <i class="bi bi-trash-fill"></i> Delete
    </button>
  </div>
</template>

<script>
export default {
  name: "ActionButton",
  props: {
    msg: String,
  },
};
</script>
