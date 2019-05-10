<template lang="pug">
  .about.full_box
    header
      .header-item 日
      .header-item 一
      .header-item 二
      .header-item 三
      .header-item 四
      .header-item 五
      .header-item 六
    calendar(class="event-calendar"
    v-model="value"
    :disabled-days-of-week="disabled"
    :format="format"
    :placeholder="placeholder"
    :pane="6"
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
        months: [
          "一月",
          "二月",
          "三月",
          "四月",
          "五月",
          "六月",
          "七月",
          "八月",
          "九月",
          "十月",
          "十一月",
          "十二月"
        ],
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
          "content": 613 + '次',
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
  .about
    overflow-x hidden
    header
      display flex
      flex-direction row
      align-items center
      height 50px
      line-height 50px
      background #EFF9FF
      padding-left 16px
      .header-item
        font-size 14px
        font-weight 500
        color #545454
        margin 0 18px
    .datepicker{
      color: rgba(0, 0, 0, 1);
    }
    .datepicker-popup{
      border-radius 0
    }
    .event-calendar {
      .datepicker-popup{
        margin-top 0
      }
      .datepicker-ctrl{
        span{
          display none
        }
      }
      .datepicker-inner {
        width 375px
        float initial
      }
      .datepicker-body {
        p{
          margin-bottom 20px
        }
        span {
          width: 50px;
          height: 50px;
          vertical-align: top;
        }
        .event {
          color: #E56700;
        }
        .low {
          color: red;
          font-weight: bold;
        }
        .datepicker-weekRange{
          display none
        }
        .datepicker-dateRange{
          span{
            font-size 16px
            font-weight 500
            /*color #B3B3B3*/
          }
          .datepicker-dateRange-item-active{
             background #ffffff!important
             color rgba(0,0,0,0.65)!important
          }
          .event{
            font-size 12px
            color #999999
            margin-top 10px
          }
        }
        .datepicker-dateRange span:hover{
          background #ffffff
        }
        .datepicker-monthRange span {
          width: 100px;
          height: 100px;
          vertical-align: middle;
          line-height: 100px;

        }
      }
  }
</style>
