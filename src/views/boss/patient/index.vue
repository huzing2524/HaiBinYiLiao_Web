<template lang="pug">
  .patient.full_box(v-if="isLoad")
    CardWithHead(icon="iconhuanzhezong" title="患者总览")
      .patient_info
        p 共{{patientsMain.patients_summary.total}}位患者
        p 平均每家医院有{{patientsMain.patients_summary.average_hospitals}}位患者
        p 平均每台设备治疗{{patientsMain.patients_summary.average_equipments}}位患者
        p 每月有{{patientsMain.patients_summary.this_month}}位患者接受治疗
    CardWithHead(icon="iconicon_statistics" title="设备使用统计" iconRight="iconicon_amplification" router="/boss/patient/used_statistic")
      UsedStatistic(:statisticListItem="patientsMain.recent_treatment")
    CardWithHead
      .to_list
        router-link.column(to="/boss/patient/patient_list")
          .icon
            svg.ali_icon(aria-hidden="true")
              use(xlink:href="#iconicon_huanzhe")
          p
            span 患者
            span {{patientsMain.patients_total}}位
        router-link.column(to="/boss/patient/treatment_record_list")
          .icon
            svg.ali_icon(aria-hidden="true")
              use(xlink:href="#iconicon_jilu")
          p
            span 治疗记录
            span {{patientsMain.records_total}}条
    CardWithHead(icon="iconicon_analysis" title="患者数据分析" iconRightSmall="iconArrow_" router="/boss/patient/analyse")
      PatientParsed(:analysisListItem="patientsMain.patients_analysis")
    CardWithHead(icon="iconicon_ranking" title="医生治疗排行" iconRightSmall="iconArrow_" router="/boss/patient/used_rank")
      UsedRank(:rankListItem="patientsMain.doctors_rank")
</template>

<script>
  import CardWithHead from '_components/card_with_head/'
  import PatientParsed from '_components/patient_parsed/'
  import UsedRank from '_components/used_rank/'
  import UsedStatistic from '_components/used_statistic/'
  import {HbPatientsMain} from '_api/boss/'

  export default {
    components: {
      CardWithHead,
      PatientParsed,
      UsedRank,
      UsedStatistic
    },
    data() {
      return {
        patientsMain: {},
        isLoad: false
      }
    },
    mounted() {
      this.getHbPatientsMain()
    },
    methods: {
      getHbPatientsMain() {
        HbPatientsMain().then(res => {
          this.patientsMain = res.data
          this.isLoad = true
        }).catch()
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .patient
    padding 10px

    > .item
      > .patient_info
        padding 20px 15px 1px

        p
          position relative
          padding-left 18px
          color #545454
          font-size 14px
          margin-bottom 20px

          &:before
            content ''
            position absolute
            width 8px
            height 8px
            background #545454
            border-radius 50%
            left 0
            top 50%
            margin-top -4px

      .to_list
        padding 20px 16px
        display flex

        .column
          flex 1
          display flex
          align-items center
          padding 15px
          border-radius 4px

          &:nth-of-type(1)
            background #30CBA6
            margin-right 15px

          &:nth-of-type(2)
            background #FCA68F

          .icon
            width 30px
            height 30px
            margin-right 16px

          p
            font-size 14px
            color #FFF
            height 100%
            display flex
            justify-content space-between
            flex-direction column
</style>
