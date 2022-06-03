<template>
  <div class="BaseMapPicker" @click="triggerShowBasemap()">
    <button class="mapboxgl-ctrl-icon BaseMapPicker__btn">
    </button>
     <div id="BaseMapPicker__dropdownItem" class="BaseMapPicker__dropdownContent">
        <div class="BaseMapPicker__basemap" v-for="(basemap, key) in basemaps.basemaps" :key="key" :style="setBasemapSelectorStyle(basemap)" @click="setBasemap(basemap.id)">
        </div>
      </div>
  </div>
</template>

<script lang="ts">
import { store } from "@/Store"
import { SingleBasemap } from "@/classes/BaseMap"
import { defineComponent, PropType } from "vue"

export default defineComponent({
  components: {},
  name: "BaseMap-Picker",
  props: {
    basemaps: {
      type: Object as PropType<{
        currentBaseMapIndex: number,
        basemaps: Array<SingleBasemap>
      }>,
      required: true
    }
  },
  data: () => ({ showBasemaps: false }),

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
        // border: this.basemaps.currentBaseMapIndex === basemap.id ? "#428fdf solid 3px" : "",
        backgroundImage: `url(${basemap.img})`
      }
    },
    setBasemap (id: number) {
      store.updateBasemap(id)
    }
  }
})
</script>
<style scoped>
.BaseMapPicker {
  display: flex;
  flex-flow: column nowrap;

  position: relative;
  display: inline-block;
}
/* Dropdown Button */
.BaseMapPicker__btn {
  width: 29px;
  height: 29px;
  margin-top: 8px;
  margin-left: 8px;
  background-color: white;
  border: 10px solid rgba(229, 231, 235, 0.5);
  border-radius: 6px;
  cursor: pointer;
}

/* Dropdown button on hover & focus */
.BaseMapPicker__btn:hover,
.BaseMapPicker__btn:focus {

  background-color: #f2f2f2;
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
  margin-left: 8px;
  width: 29px;
  height: 29px;
  border-radius: 50%;
  background-size: 45px;
  background-color: white;
  box-shadow: 0px 3px 5px -1px rgba(0, 0, 0, 0.2),
    0px 6px 10px 0px rgba(0, 0, 0, 0.14), 0px 1px 18px 0px rgba(0, 0, 0, 0.12);
}
</style>
