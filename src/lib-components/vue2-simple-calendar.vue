<template>
  <div class="vue2-simple" v-if="calendar">
    <div class="wrapper">
      <div class="monthHeader">
        <div class="monthWrapper">
          <div class="monthHeaderLeft">
            <button @click.prevent="moveMonth(-1)" :class="buttonClass">
              <
            </button>
          </div>
          <div class="monthHeaderMonth" v-if="__startDate">
            {{ __startDate.toLocaleString("default", { month: "long" }) }}
            {{ __startDate.getFullYear() }}
          </div>
          <div class="monthHeaderYear">
            <button @click.prevent="moveMonth(1)" :class="buttonClass">
              >
            </button>
          </div>
        </div>
      </div>

      <div class="day" v-for="d in days">{{ d }}</div>

      <div class="item" v-for="c in calendar">
        <div
          @click="daySelected(c, getDayClasses(c))"
          :class="getDayClasses(c)"
        >
          {{ c }}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default /*#__PURE__*/ {
  name: "vue2-simple-calendar",
  props: {
    isSelectable: { type: Function, default: () => false },
    selected: { type: Function, default: () => false },
    selectableClass: { type: String, default: "selectable" },
    nonSelectableClass: { type: String, default: "nonSelectable" },
    buttonClass: { type: String, default: "nonSelectable" },
    startDate: { type: Date, default: new Date() },
  },
  data() {
    return {
      calendar: null,
      days: null,
      __startDate: new Date(),
      selectedDay: null,
      selectable: true,
    };
  },
  watch: {
    startDate: {
      immediate: true,
      handler: function (newVal, oldVal) {
        this.__startDate = new Date(newVal);
        this.bind();
      },
    },
  },
  created() {},
  methods: {
    isToday(d) {
      let todayDay = new Date().getDate();
      return d == todayDay;
    },
    getDayClasses(d) {
      let c;

      var dt = new Date(
        this.__startDate.getFullYear(),
        this.__startDate.getMonth(),
        d
      );

      if (this.isSelected(d)) c = "selected ";
      else if (this.isSelectable(dt)) c = "selectable ";
      else c = "nonSelectable ";

      if (this.isToday(d)) {
        c = c + "today";
      }

      return c;
    },
    daySelected(day, css) {
      // leave if this isnt selectable, didnt use isSelectable because that might not be performant
      if (css.indexOf("nonSelectable") > -1) {
        return;
      }

      this.selectedDay = day;

      var dt = new Date(
        this.__startDate.getFullYear(),
        this.__startDate.getMonth(),
        day
      );

      this.$emit("daySelected", dt);
    },
    isSelected(day) {
      return this.selectedDay == day;
    },
    moveMonth(a) {
      this.__startDate = new Date(
        this.__startDate.getFullYear(),
        this.__startDate.getMonth() + a,
        1
      );
      this.__startDate.setMonth(this.__startDate.getMonth() + a);
      this.$emit("monthChanged", this.__startDate);
      this.bind();
    },
    bind() {
      this.days = ["S", "M", "T", "W", "T", "F", "S"];

      this.calendar = [];

      this.selectedDay = this.__startDate.getDate();

      //get first day of month

      var firstDay = new Date(
        this.__startDate.getFullYear(),
        this.__startDate.getMonth(),
        1
      );

      let start = firstDay.getDay();

      // how many days in the month
      let daysInMonth = new Date(
        this.__startDate.getFullYear(),
        this.__startDate.getMonth() + 1,
        0
      ).getDate();

      for (let i = 0; i < start; i++) {
        this.calendar.push("");
      }

      for (let i = 1; i <= daysInMonth; i++) {
        this.calendar.push(i);
      }
    },
  },
};
</script>

<style scoped>
* {
  font-size: 8px;
}

.day {
  font-weight: bold;
}
.item {
  text-align: center;
}

.monthHeaderMonth {
  font-size: 1.5em;
  font-weight: bold;
  padding: 10px;
}

.item > .selectable {
  padding: 10px;
  border-radius: 50%;
  color: 2a96cc;
  border: 2px solid #2a96cc;
  color: #2a96cc;
  cursor: pointer;
}

.item > .selected {
  padding: 10px;
  border-radius: 50%;
  background-color: #2a96cc;
  color: white;
  border: 1px solid #2a96cc;
}

.item > .nonSelectable {
  color: gray;
}

.today {
  font-weight: bolder;
  text-decoration: underline;
}

.monthHeaderMonth {
  text-align: center;
}
.monthHeaderYear {
  text-align: right;
}
.monthHeader {
  grid-column-start: 1;
  grid-column-end: span 7;
  min-width: 100%;
  border-bottom: solid 1px #efefef;
  padding-bottom: 10px;
}
.monthWrapper {
  display: grid;
  grid-template-columns: 50px auto 50px;
}
.wrapper {
  display: grid;
  justify-items: center;
  grid-template-columns: repeat(7, 40px);
  grid-template-rows: repeat(6, 40px);
  gap: 5px;
  align-items: center;
}
</style>
