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
    isSelectable() {
      return Math.random() < 0.5;
    },
    daySelected(dt) {
      this.startDate = new Date(2021, 1, 19);
      console.log(dt);
    },
  },
});
</script>

<template>
  <div id="app">
    <vue2-simple-calendar
      :isSelectable="isSelectable"
      @daySelected="daySelected"
      :startDate="startDate"
    />
  </div>
</template>
