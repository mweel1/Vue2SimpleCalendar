<script>
import Vue from "vue";
// Uncomment import and local "components" registration if library is not registered globally.
// import { Vue2SimpleCalendarSample } from '@/entry.esm';

export default Vue.extend({
  name: "ServeDev",
  // components: {
  //  Vue2SimpleCalendarSample,
  // }
  data() {
    return {
      startDate: new Date(2021, 1, 15),
    };
  },
  methods: {
    isSelectable(d) {
      return d.getDate() == 15 || d.getDate() == 15 || d.getDate() == 10;
    },
    daySelected(dt) {},
    monthChanged(dt) {
      this.startDate = new Date(dt.getFullYear(), dt.getMonth(), 15);
    },
  },
});
</script>

<template>
  <div id="app" style="margin: 10px">
    <button @click="startDate = new Date(2025, 1, 17)">
      Set start date to 2025-01-15
    </button>
    <br />
    <vue2-simple-calendar
      :isSelectable="isSelectable"
      @daySelected="daySelected"
      @monthChanged="monthChanged"
      :startDate="startDate"
    />
  </div>
</template>

<style scoped></style>
