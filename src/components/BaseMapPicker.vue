<template>
  <div class="BaseMapPicker" @click="triggerShowBasemap()">
  <div class="mapboxgl-ctrl-group mapboxgl-ctrl BaseMapPicker__btnGrp">
    <button class="mapboxgl-ctrl-icon mapbox-gl-change_layer icon icon-layers BaseMapPicker__btn">
    </button>
  </div>
  <div id="BaseMapPicker__dropdownItem" class="BaseMapPicker__dropdownContent">
    <div class="BaseMapPicker__basemap" v-for="(basemap, key) in basemaps" :key="key" :style="setBasemapSelectorStyle(basemap)" @click="setBasemap(basemap.id)">
    </div>
  </div>
  </div>
</template>

<script lang="ts">
import { store } from "@/Store"
import { BASEMAPS, SingleBasemap } from "@/classes/BaseMap"
import { defineComponent } from "vue"
import { Colors } from "@/utils/Colors"

export default defineComponent({
  components: {},
  name: "BaseMap-Picker",

  data: () => ({
    showBasemaps: false,
    basemaps: BASEMAPS,
    currentBasemap: 0
  }),

  mounted () {
    // Close the dropdown menu if the user clicks outside of it
    window.onclick = function (event) {
      const target = event.target as HTMLTextAreaElement
      if (!target.matches(".BaseMapPicker__btn")) {
        const dropdowns = document.getElementsByClassName("BaseMapPicker__dropdownContent")
        for (let i = 0; i < dropdowns.length; i++) {
          const openDropdown = dropdowns[i]
          if (openDropdown.classList.contains("BaseMapPicker__show")) {
            openDropdown.classList.remove("BaseMapPicker__show")
          }
        }
      }
    }
  },

  methods: {
    triggerShowBasemap () {
      document.getElementById("BaseMapPicker__dropdownItem")?.classList.toggle("BaseMapPicker__show")
    },
    setBasemapSelectorStyle (basemap: SingleBasemap) {
      return {
        border: this.currentBasemap === basemap.id ? `${Colors.ORANGE} solid 2px` : "none",
        backgroundImage: `url(${basemap.img})`
      }
    },
    setBasemap (id: number) {
      this.currentBasemap = id
      store.updateBasemap(id)
    }
  }
})
</script>
<style scoped>
.BaseMapPicker {
  display: flex;
  flex-flow: column nowrap;
  width: 29px;
  height: 29px;
  margin-top: 8px;
  margin-right: 8px;
  position: relative;
  display: inline-block;
}

.BaseMapPicker__btnGrp {
  overflow: hidden;
}

/* Dropdown Content (Hidden by Default) */
.BaseMapPicker__dropdownContent {
  display: none;
  position: absolute;
  background-color: none;
  min-width: 160px;
  z-index: 1;
}
.BaseMapPicker__show {
  display: block;
}

.BaseMapPicker__basemap{
  margin-top: 8px;
  width: 29px;
  height: 29px;
  border-radius: 50%;
  background-size: 45px;
  background-color: white;
  box-shadow: 0px 3px 5px -1px rgba(0, 0, 0, 0.2),
    0px 6px 10px 0px rgba(0, 0, 0, 0.14), 0px 1px 18px 0px rgba(0, 0, 0, 0.12);
}
</style>
