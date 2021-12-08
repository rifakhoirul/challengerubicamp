<template>
  <div class="bar">
    <div>
      <button @click="check" class="btn btn-dark mt-3">Show</button>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { BarChart } from "d3";

export default {
  name: "Bar",
  components: {},
  data() {
    return {
      isUpdate: "",
      w: 300,
      h: 300,
      padding: 60,
    };
  },
  computed: {
    ...mapState({
      table: (state) => state.data.tableData,
    }),
  },
  methods: {
    check() {
      
      console.log('halo')
      // let dataset = this.table;
      // let svg = d3
      //   .select(".bar")
      //   .append("svg")
      //   .attr("width", this.w)
      //   .attr("height", this.h);
      // svg
      //   .selectAll("rect")
      //   .data(dataset)
      //   .enter()
      //   .append("rect")
      //   .attr("x", (d, i) => i * 30)
      //   .attr("y", (d, i) => this.h - 20 * d.frequency)
      //   .attr("width", 25)
      //   .attr("height", (d) => d.frequency * 20);
      // let xAxis = d3.axisBottom();
      // svg.append("g")
      //  .attr("transform", "translate(0," + (this.h - this.padding) + ")")
      //  .call(xAxis);
    },
  },
  created() {
    this.$store.dispatch("getData");
  },
};
</script>