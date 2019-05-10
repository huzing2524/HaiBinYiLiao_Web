<template lang="pug">
  .tab-content.full_box
    .tab-top
      .tab-item(@click="optionClick(1)")
        .icon(v-if="selectedIndex === 1")
          svg.ali_icon(aria-hidden="true")
            use(xlink:href="#iconicon_day_filling")
        .icon(v-else)
          svg.ali_icon(aria-hidden="true")
            use(xlink:href="#iconicon_day")
        span(:class="selectedIndex === 1?'selected':''") 日
      .tab-item(:class="selectedIndex === 2?'selected':''", @click="optionClick(2)")
        .icon(v-if="selectedIndex === 2")
          svg.ali_icon(aria-hidden="true")
            use(xlink:href="#iconicon_week_filling")
        .icon(v-else)
          svg.ali_icon(aria-hidden="true")
            use(xlink:href="#iconicon_week")
        span(:class="selectedIndex === 2?'selected':''") 周
      .tab-item(:class="selectedIndex === 3?'selected':''", @click="optionClick(3)")
        .icon(v-if="selectedIndex === 3")
          svg.ali_icon(aria-hidden="true")
            use(xlink:href="#iconicon_month_filling")
        .icon(v-else)
          svg.ali_icon(aria-hidden="true")
            use(xlink:href="#iconicon_month")
        span(:class="selectedIndex === 3?'selected':''") 月
    <!--.tab-calendar-->
      <!--.tab-calendar-box(@click="toDatePickerClick")-->
        <!--span 2019年11月27日-->
        <!--.icon-->
          <!--svg.ali_icon(aria-hidden="true")-->
            <!--use(xlink:href="#iconicon_select")-->
</template>

<script>
  // import {getYMDDateString} from '_utils/public'
  export default {
    name: 'calendarTab',
    data() {
      return {
        selectedIndex: 1,
        type:'',
      }
    },
    methods: {
      optionClick(index){
        this.selectedIndex = index
        if(index===1){
          this.type = 'daily'
        }else if(index===2){
          this.type = 'weekly'
        }else {
          this.type = 'monthly'
        }
        this.$emit('dataTypeClick',this.type)
      },
      toDatePickerClick(){
        this.$router.push(`/boss/equipment/rank/date_picker`)
      }
    }
  }
</script>

<style scoped lang="stylus">
  .tab-content
    display flex
    flex-direction column
    padding 16px 0 20px
    background #ffffff
    .tab-top
      display flex
      flex-direction row
      justify-content space-evenly
      .tab-item
        display flex
        flex-direction column
        align-items center
        .icon
          width 20px
          height 20px
          margin-bottom 6px
        span
          font-size 12px
          color #5D535E
        .selected
          color #49B4F3
    .tab-calendar
      display flex
      flex-direction row
      align-items center
      justify-content center
      margin-top 20px
      .tab-calendar-box
        display flex
        flex-direction row
        background #F1FAFF
        padding 12px 20px
        align-items center
        span
          font-size 14px
          color #545454
          margin-right 22px
        .icon
          width 20px
          height 20px
          position relative
          &:before
            display block
            content:''
            width 2px
            height 16px
            background #DDE9F1
            position absolute
            left -10px
            top 50%
            margin-top -8px
</style>
