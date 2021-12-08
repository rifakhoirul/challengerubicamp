<template>
  <div class="pie container mt-5 mb-5">
    <div class="card">
      <router-link to="/" style="text-decoration: none">
        <div class="card-header bg-warning text-start text-white">
          <i class="bi bi-arrow-left-circle"></i> <strong>Pie Chart</strong>
        </div>
      </router-link>
      <div class="card-body">
        <svg width="500" height="400"></svg>
      </div>
    </div>
  </div>
</template>

<style>
.arc text {
  font: 10px sans-serif;
  text-anchor: middle;
}

.arc path {
  stroke: #fff;
}

.title {
  fill: teal;
  font-weight: bold;
}
</style>

<script>
import { mapState } from "vuex";

export default {
  name: "Bar",
  computed: {
    ...mapState({
      table: (state) => state.data.tableData,
    }),
  },
  created() {
    this.$store.dispatch("getData").then(() => {
      let data = this.table;
      let total = 0
      data.forEach(element => {
        total += element.frequency
      });
      data.forEach(element => {
        element.frequency = element.frequency/total * 100
      });

      var svg = d3.select("svg"),
        width = svg.attr("width"),
        height = svg.attr("height"),
        radius = Math.min(width, height) / 2;

      var g = svg
        .append("g")
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

      var color = d3.scaleOrdinal([
        "#922b21",
        "#922b21",
        "#76448a",
        "#6c3483",
        "#1f618d",
        "#2874a6",
        "#148f77",
        "#117a65",
        "#1e8449",
        "#239b56",
      ]);

      var pie = d3.pie().value(function (d) {
        return d.frequency;
      });

      var path = d3
        .arc()
        .outerRadius(radius - 10)
        .innerRadius(0);

      var label = d3
        .arc()
        .outerRadius(radius)
        .innerRadius(radius - 80);

      var arc = g
        .selectAll(".arc")
        .data(pie(data))
        .enter()
        .append("g")
        .attr("class", "arc");

      arc
        .append("path")
        .attr("d", path)
        .attr("fill", function (d) {
          return color(d.data.letter);
        });

      console.log(arc);

      arc
        .append("text")
        .attr("transform", function (d) {
          return "translate(" + label.centroid(d) + ")";
        })
        .text(function (d) {
          return `${d.data.letter} (${d.data.frequency.toFixed(2)}%)`;
        })
        .style("fill","white")

      svg
        .append("g")
        .attr("transform", "translate(" + (width / 2 - 200) + "," + 20 + ")")
        .append("text")
        .text("Pie Chart")
        .attr("class", "title");
    });
  },
};
</script>