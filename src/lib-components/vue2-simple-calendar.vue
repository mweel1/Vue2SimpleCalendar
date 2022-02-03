<template>
  <div class="vue2-simple" v-if="calendar">
    <div class="wrapper">
      <div class="monthHeader">
        <div class="monthWrapper">
          <div class="monthHeaderLeft">
            <button @click.prevent="moveMonth(-1)" style="height: 100%">
              <
            </button>
          </div>
          <div class="monthHeaderMonth" v-if="_startDate">
            {{ _startDate.toLocaleString("default", { month: "long" }) }}
            {{ _startDate.getFullYear() }}
          </div>
          <div class="monthHeaderYear">
            <button @click.prevent="moveMonth(1)" style="height: 100%">
              >
            </button>
          </div>
        </div>
      </div>
      <div class="day" v-for="d in days">{{ d }}</div>
      <div class="item" v-for="c in calendar">
        <div v-if="isSelected(c)" class="selected">{{ c }}</div>
        <div
          v-else-if="isSelectable(c)"
          :class="selectableClass"
          @click="daySelected(c)"
        >
          {{ c }}
        </div>
        <div v-else class="nonSelectableClass">
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
    startDate: { type: Date, default: () => new Date() },
  },
  data() {
    return {
      calendar: null,
      days: null,

      _startDate: null,
      selectedDay: null,
      selectable: true,
    };
  },
  created() {
    this.bind();
  },
  methods: {
    daySelected(day) {
      this.selectedDay = day;

      var dt = new Date(
        this._startDate.getFullYear(),
        this._startDate.getMonth(),
        day
      );
      this.$emit("daySelected", dt);
    },
    isSelected(day) {
      return this.selectedDay == day;
    },
    moveMonth(a) {
      this._startDate.setMonth(this._startDate.getMonth() + a);
      this.bind();
    },
    bind() {
      this.days = ["S", "M", "T", "W", "T", "F", "S"];

      this.calendar = [];

      if (!this._startDate)
        if (!this._startDate) this._startDate = new Date();
        else this._startDate = this.startDate;

      this.selectedDay = this._startDate.getDate();

      //get first day of month

      var firstDay = new Date(
        this._startDate.getFullYear(),
        this._startDate.getMonth(),
        1
      );

      let start = firstDay.getDay();

      // how many days in the month
      let daysInMonth = new Date(
        this._startDate.getFullYear(),
        this._startDate.getMonth() + 1,
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
.day {
  text-align: center;
  padding: 2px;
  text-align: center;
  width: 40px;
  margin-top: 15px;
  margin-left: 2px;
  margin-right: 2px;
}
.item {
  text-align: center;
  padding: 2px;
  text-align: center;
  width: 40px;
  margin: 2px;
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

.item > .nonSelectableClass {
  padding: 10px;
  color: gray;
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
  border-bottom: solid 1px #ccc;
}
.monthWrapper {
  display: grid;
  margin: 5px;
  grid-template-columns: 50px auto 50px;
}
.wrapper {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  justify-content: center;
}
.day {
  font-weight: 400;
}
</style>
