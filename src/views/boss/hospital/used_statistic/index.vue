<template lang="pug">
  .use-statistic.full_box
    .main
      .tab
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
      .chart
        UsedStatistic(:statisticListItem="statisticListItem")
      .record
        .record-title
          .icon
            svg.ali_icon(aria-hidden="true")
              use(xlink:href="#iconicon_part")
          span 使用记录
        TreatmentRecordListItem(:recordsListItem="recordsListItem" type="hospital")
</template>

<script>
  import calendarTab from '_components/calendar_tab'
  import UsedStatistic from '_components/used_statistic'
  import TreatmentRecordListItem from '_components/treatment_record_list_item/'
  import { HbPatientsStatistics } from '_api/boss'
  export default {
    data() {
      return {
        equipment_id:'',
        hospital_id:'',
        type:'',
        selectedIndex: 1,
        statisticListItem:[],
        recordsListItem:[],
      }
    },
    components: {
      calendarTab,
      UsedStatistic,
      TreatmentRecordListItem,
    },
    mounted(){
      this.initData()
    },
    methods: {
      initData(){
        this.hospital_id = this.$route.query.id || ''
        let type = 'day'
        HbPatientsStatistics({
          equipment_id: '',
          hospital_id: this.hospital_id,
          usage:'devices'
        },'get',type).then((res) => {
          this.recordsListItem = res.data.records
          if(res.data.summary.length<=5){
            this.statisticListItem = res.data.summary
          }else{
            this.statisticListItem = res.data.summary.splice(-5)
          }
        }).catch(() => {
          this.$createToast({
            txt: '获取数据失败',
            type: 'txt'
          }).show()
        })
      },
      optionClick(index){
        this.selectedIndex = index
        if(index===1){
          this.type = 'day'
        }else if(index===2){
          this.type = 'week'
        }else {
          this.type = 'month'
        }
        HbPatientsStatistics({
          equipment_id: '',
          hospital_id: this.hospital_id,
          usage:'devices'
        },'get',this.type).then((res) => {
          this.recordsListItem = res.data.records
          if(res.data.summary.length<=5){
            this.statisticListItem = res.data.summary
          }else{
            this.statisticListItem = res.data.summary.splice(-5)
          }
        }).catch(() => {
          this.$createToast({
            txt: '获取数据失败',
            type: 'txt'
          }).show()
        })
      }
    }
  }
</script>

<style scoped lang="stylus">
  .use-statistic
    .main
      display flex
      flex-direction column
      .tab
        display flex
        flex-direction row
        background #ffffff
        margin-bottom 10px
        justify-content space-evenly
        padding 10px 0 8px
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
      .chart
        background #ffffff
      .record
        display flex
        flex-direction column
        padding 10px
        .record-title
          display flex
          flex-direction row
          align-items center
          padding 10px 0
          .icon
            width 22px
            height 22px
            margin-right 6px
          span
            font-size 16px
            color #599CB9
</style>
