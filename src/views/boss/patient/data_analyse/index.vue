<template lang="pug">
  .data-analyse.full_box(v-if="isLoad")
    .main
      .tab
        calendarTab(@dataTypeClick="getAnalysisData")
      .patient-parsed
        PatientParsed(:analysisListItem="analysisListItem")
      .patient-card(v-if="patientsListItem.length>0")
        .card-top
          .icon
            svg.ali_icon(aria-hidden="true")
              use(xlink:href="#iconicon_compared")
          span 患者增减对比
        .card-middle
          .left(v-if="patientsChange.change!==0") {{patientsChange.date}}患者相比{{patientsChange.type}}{{patientsChange.change>0?'增长':'减少'}}
          .left(v-else) {{patientsChange.date}}患者相比{{patientsChange.type}}持平
          .right
            span(v-show="patientsChange.change!==0")(:class="patientsChange.change>0?'':'active'") {{patientsChange.change}}人
            img(v-show='patientsChange.change>0' src="./icon_increase.png")
            img(v-show='patientsChange.change<0' src="./icon_down.png")
        PatientCompare(:patientsListItem="patientsListItem")
      .patient-card(v-if="treatmentListItem.length>0")
        .card-top
          .icon
            svg.ali_icon(aria-hidden="true")
              use(xlink:href="#iconicon_part")
          span 治疗部位TOP 10
        TreatmentList(:treatmentListItem="treatmentListItem")
</template>

<script>
  import { HbPatientsAnalysis } from '_api/boss'
  import calendarTab from '_components/calendar_tab'
  import PatientParsed from '_components/patient_parsed'
  import PatientCompare from '_components/patient_compare'
  import TreatmentList from '_components/treatment_list'
  export default {
    data() {
      return {
        isLoad:false,
        device_id:'',
        hospital_id :'',
        type:'',
        analysisListItem:{},
        patientsListItem:[],
        patientsChange:{},
        treatmentListItem:[],
      }
    },
    components: {
      calendarTab,
      PatientParsed,
      PatientCompare,
      TreatmentList
    },
    mounted() {
      this.initData()
    },
    methods: {
      initData(){
        this.device_id = this.$route.query.device_id || ''
        this.hospital_id = this.$route.query.id || ''
        let type = 'daily'
        HbPatientsAnalysis({
          type: type,
        },'get',this.device_id?this.device_id:'all',this.hospital_id?this.hospital_id:'all').then((res) => {
          this.analysisListItem = res.data.patients_analysis
          this.patientsListItem = res.data.recent_patients
          this.patientsChange = res.data.patients_change
          this.treatmentListItem = res.data.treatment_part
          this.isLoad = true
        }).catch(() => {
          this.$createToast({
            txt: '获取数据失败',
            type: 'txt'
          }).show()
        })
      },
      getAnalysisData(type){
        this.analysisListItem = {}
        this.patientsListItem = []
        this.patientsChange = {}
        this.treatmentListItem = []
        this.type = type
        HbPatientsAnalysis({
          type: type
        },'get',this.device_id?this.device_id:'all',this.hospital_id?this.hospital_id:'all').then((res) => {
          this.analysisListItem = res.data.patients_analysis
          this.patientsListItem = res.data.recent_patients
          this.patientsChange = res.data.patients_change
          this.treatmentListItem = res.data.treatment_part
          this.isLoad = true
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
  .data-analyse
    padding-bottom 10px
    .main
      display flex
      flex-direction column
      .tab
        display flex
        flex-direction column
        background #ffffff
        margin-bottom 10px
      .patient-parsed
        display flex
        flex-direction column
        background #ffffff
        margin-bottom 10px
      .patient-card
        display flex
        flex-direction column
        padding 0 10px 20px 10px
        margin-bottom 10px
        background #ffffff
        .card-top
          display flex
          flex-direction row
          padding 15px 0
          border-bottom 1px solid #E9EEF0
          align-items center
          .icon
            width 20px
            height 20px
            margin 0 10px
          span
            font-size 15px
            font-weight 500
            color #545454
        .card-middle
          display flex
          flex-direction row
          padding 20px 10px
          .left
            font-size 14px
            color #999999
            margin-right 6px
          .right
            display flex
            flex-direction row
            align-items center
            .active
              color #FF6701
            span
              font-size 14px
              font-weight 500
              color #19CAAD
              margin-right 4px
            img
              width 12px
              height 12px
</style>
