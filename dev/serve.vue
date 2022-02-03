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
      return d == 15 || d == 15 || d == 10;
    },
    daySelected(dt) {
      console.log(dt);
    },
    monthChanged(dt) {
      this.startDate = new Date(dt.getFullYear(), dt.getMonth(), 15);
    },
  },
});
</script>

<template>
  <div id="app" style="margin: 10px">
    <vue2-simple-calendar
      :isSelectable="isSelectable"
      @daySelected="daySelected"
      @monthChanged="monthChanged"
      :startDate="startDate"
    />
  </div>
</template>

<style scoped>
* {
  box-sizing: border-box;
}
</style>
