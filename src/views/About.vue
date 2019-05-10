<template lang="pug">
  .about
    h1 This is an about page
    calendar(class="event-calendar"
    v-model="value"
    :disabled-days-of-week="disabled"
    :format="format"
    :placeholder="placeholder"
    :pane="2"
    :has-input="false"
    :on-day-click="onDayClick"
    :change-pane="changePane")
      .event(v-for="(evt, index) in events" :key="index" :slot="evt.date") {{evt.content}} <i ></i>
        i(:class="{low : evt.low}" v-if="evt.low") ↓
    p {{date}}
</template>
<script>
  import Calendar from 'vue2-slot-calendar'

  export default {
    data() {
      return {
        disabled: [],
        value: this.stringify(new Date()),
        date: '',
        events: [],
        lurevents: [],
        format: 'yyyy-MM-dd',
        placeholder: 'placeholder is displayed',
      }
    },
    components: {
      Calendar
    },
    methods: {
      onDayClick(date, str) {
        this.date = str
      },
      changePane() {
        this.events = [{"date": "2019-03-22", "content": 613, "low": 0}, {
          "date": "2019-03-24",
          "content": 613,
          "low": 0
        },]
      },
      stringify(v) {
        if (!this.isDate(v)) return null
        return v.getFullYear() + '-' + this.filled(v.getMonth() * 1 + 1) + '-' + this.filled(v.getDate())
      },
      isDate(v) {
        if (v instanceof Date) {
          return true
        }
        return false
      },
      filled(v) {
        return String(v).replace(/^(\d)$/, '0$1')
      },
    }
  }
</script>
<style lang="stylus">
  .event-calendar {
    .datepicker-inner {
      width: 440px;
    }

    .datepicker-body {
      span {
        width: 60px;
        height: 60px;
        vertical-align: top;
      }

      .event {
        color: #E56700;
      }

      .low {
        color: red;
        font-weight: bold;
      }

      .datepicker-monthRange span {
        width: 100px;
        height: 100px;
        vertical-align: middle;
        line-height: 100px;
        // font-weight: 600;
      }
    }

  }
</style>
