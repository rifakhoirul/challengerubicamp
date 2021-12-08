<template>
  <div class="container mt-5 mb-5">
    <div class="card">
      <router-link to="/" style="text-decoration: none">
        <div class="card-header bg-info text-start text-white">
          <i class="bi bi-arrow-left-circle"></i> <strong>Bar Chart</strong>
        </div>
      </router-link>
      <div class="card-body">
        <svg width="600" height="500"></svg>
      </div>
    </div>
  </div>
</template>

<style>
.bar {
  fill: steelblue;
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
      var svg = d3.select("svg"),
        margin = 200,
        width = svg.attr("width") - margin,
        height = svg.attr("height") - margin;
      var xScale = d3.scaleBand().range([0, width]).padding(0.4),
        yScale = d3.scaleLinear().range([height, 0]);
      var g = svg
        .append("g")
        .attr("transform", "translate(" + 100 + "," + 100 + ")");
      let data = this.table;
      xScale.domain(
        data.map(function (d) {
          return d.letter;
        })
      );
      yScale.domain([
        0,
        d3.max(data, function (d) {
          return d.frequency;
        }),
      ]);
      g.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(xScale));

      g.append("g").call(
        d3
          .axisLeft(yScale)
          .tickFormat(function (d) {
            return d;
          })
          .ticks(10)
      );

      g.selectAll(".bar")
        .data(data)
        .enter()
        .append("rect")
        .attr("class", "bar")
        .attr("x", function (d) {
          return xScale(d.letter);
        })
        .attr("y", function (d) {
          return yScale(d.frequency);
        })
        .attr("width", xScale.bandwidth())
        .attr("height", function (d) {
          return height - yScale(d.frequency);
        });
      svg
        .append("text")
        .attr("transform", "translate(100,0)")
        .attr("x", 50)
        .attr("y", 50)
        .attr("font-size", "24px")
        .text("Bar Chart");
      g.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(xScale))
        .append("text")
        .attr("y", height - 250)
        .attr("x", width - 100)
        .attr("text-anchor", "end")
        .attr("stroke", "black")
        .text("Letter");
      g.append("g")
        .call(
          d3
            .axisLeft(yScale)
            .tickFormat(function (d) {
              return d;
            })
            .ticks(10)
        )
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", "-5.1em")
        .attr("text-anchor", "end")
        .attr("stroke", "black")
        .text("Frequency");
    });
  },
};
</script>