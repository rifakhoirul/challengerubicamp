<template>
  <div class="container mt-5 mb-5">
    <div class="card">
      <router-link to="/" style="text-decoration: none">
        <div class="card-header bg-danger text-start text-white">
          <i class="bi bi-arrow-left-circle"></i> <strong>Line Chart</strong>
        </div>
      </router-link>
      <div class="card-body">
        <div id="my_dataviz"></div>
      </div>
    </div>
  </div>
</template>

<style>
</style>

<script>
import { mapState } from "vuex";

export default {
  name: "Linee",
  computed: {
    ...mapState({
      table: (state) => state.datadate.tableDataDate,
    }),
  },
  created() {
    this.$store.dispatch("getDataDate").then(() => {
      // set the dimensions and margins of the graph
      var margin = { top: 10, right: 30, bottom: 30, left: 60 },
        width = 460*1.2 - margin.left - margin.right,
        height = 400*1.2 - margin.top - margin.bottom;

      // append the svg object to the body of the page
      var svg = d3
        .select("#my_dataviz")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
      
      let data = this.table
      data.forEach(element => {
        element.letter = d3.timeParse("%Y-%m-%d")(element.letter)
      });
      console.log(data)
      // Add X axis --> it is a date format
      var x = d3
        .scaleTime()
        .domain(
          d3.extent(data, function (d) {
            return d.letter;
          })
        )
        .range([0, width]);
      svg
        .append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));
      // Add Y axis
      var y = d3
        .scaleLinear()
        .domain([
          0,
          d3.max(data, function (d) {
            return +d.frequency;
          }),
        ])
        .range([height, 0]);
      svg.append("g").call(d3.axisLeft(y));

      // Add the line
      svg
        .append("path")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", "steelblue")
        .attr("stroke-width", 1.5)
        .attr(
          "d",
          d3
            .line()
            .x(function (d) {
              return x(d.letter);
            })
            .y(function (d) {
              return y(d.frequency);
            })
        );
    });
  },
};
</script>