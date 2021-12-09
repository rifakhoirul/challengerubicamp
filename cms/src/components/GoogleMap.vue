<template>
  <div>
    <gmap-map
      ref="gmap"
      :center="center"
      :zoom="12"
      style="width: 100%; height: 80vh"
    >
      <gmap-marker
        :key="index"
        v-for="(m, index) in markers"
        :position="m.position"
        @click="toggleInfoWindow(m, index)"
      >
      </gmap-marker>

      <gmap-info-window
        :options="infoOptions"
        :position="infoWindowPos"
        :opened="infoWinOpen"
        @closeclick="infoWinOpen = false"
      >
        <div v-html="infoContent"></div>
      </gmap-info-window>
    </gmap-map>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  name: "GoogleMap",
  data() {
    return {
      //a default center for the map
      center: { lat: 52.51195, lng: 6.089625 },
      map: null,
      infoContent: "",
      infoWindowPos: {
        lat: 0,
        lng: 0,
      },
      infoWinOpen: false,
      currentMidx: null,
      //optional: offset infowindow so it visually sits nicely on top of our marker
      infoOptions: {
        pixelOffset: {
          width: 0,
          height: -35,
        },
      },
      markers: [],
    };
  },
  computed: {
    ...mapState({
      importMarkers: (state) => state.maps.tableMaps,
    }),
  },
  mounted() {
    this.$store.dispatch("getMaps").then(() => {
      this.importMarkers.forEach((item) => {
        item.position = { lat: item.lat, lng: item.lng };
      });
      this.markers = this.importMarkers;
      this.$refs.gmap.$mapPromise.then((map) => {
        const bounds = new google.maps.LatLngBounds();
        for (let m of this.markers) {
          bounds.extend(m.position);
        }
        map.fitBounds(bounds);
      });
    });
  },
  methods: {
    toggleInfoWindow: function (marker, idx) {
      this.infoWindowPos = marker.position;
      this.infoContent = this.getInfoWindowContent(marker);

      //check if its the same marker that was selected if yes toggle
      if (this.currentMidx == idx) {
        this.infoWinOpen = !this.infoWinOpen;
      }
      //if different marker set infowindow to open and reset current marker index
      else {
        this.infoWinOpen = true;
        this.currentMidx = idx;
      }
    },

    getInfoWindowContent: function (marker) {
      return `<div>
      <h4 class="title is-4">${marker.title}</h4>
    <div>
      This is marker for ${marker.title}
      <br>
    </div>
  </div>
</div>`;
    },
  },
};
</script>