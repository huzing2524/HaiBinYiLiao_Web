<template lang="pug">
  .equipment-overview.full_box(v-if="isLoad")
    .equipment-type HB-ESWT-01型
    .equipment-content
      .equipment-tab(@click="toEquipmentSelect")
        .tab-left
          img(src="./icon_treatment.png")
          span 设备总览
        .tab-right
          span 切换
          img(src="./arrow_right.png")
      .equipment-item
        .equipment-item-card
          .card-top(@click="toEquipmentStatistic")
            .card-top-left
              .icon
                svg.ali_icon(aria-hidden="true")
                  use(xlink:href="#iconicon_statistics")
              span 设备使用统计
            .card-top-right
              .icon
                svg.ali_icon(aria-hidden="true")
                  use(xlink:href="#iconicon_amplification")
          UsedStatistic(:statisticListItem="statisticListItem")
      .equipment-item
        .equipment-item-card
          router-link.card-top(to="/boss/equipment/rank")
            .card-top-left
              .icon
                svg.ali_icon(aria-hidden="true")
                  use(xlink:href="#iconicon_ranking")
              span 医院使用排行
            .card-top-right
              img(src="./arrow_right.png")
          UsedRank(:rankListItem="rankListItem")
      .equipment-item
        .equipment-item-card
          router-link.card-top(to="/boss/patient/analyse")
            .card-top-left
              .icon
                svg.ali_icon(aria-hidden="true")
                  use(xlink:href="#iconicon_analysis")
              span 患者数据分析
            .card-top-right
              img(src="./arrow_right.png")
          PatientParsed(:analysisListItem="analysisListItem")
</template>

<script>
  import { HbDevicesMain } from '_api/boss'
  import UsedStatistic from '_components/used_statistic'
  import UsedRank from '_components/used_rank'
  import PatientParsed from '_components/patient_parsed'
  export default {
    data() {
      return {
        isLoad:false,
        analysisListItem:{},
        rankListItem:[],
        statisticListItem:[],
      }
    },
    components: {
      UsedStatistic,
      UsedRank,
      PatientParsed
    },
    mounted() {
      this.initData()
    },
    methods: {
      initData(){
        HbDevicesMain().then((res) => {
          this.analysisListItem = res.data.patients_analysis
          this.rankListItem = res.data.hospital_rank
          this.statisticListItem = res.data.recent_use
          this.isLoad = true
        }).catch(() => {
          this.$createToast({
            txt: '获取数据失败',
            type: 'txt'
          }).show()
        })
      },
      toEquipmentSelect(){
        this.$router.push(`/boss/equipment/select`)
      },
      toEquipmentStatistic(){
        this.statisticListItem = []
        this.$router.push(`/boss/equipment/statistic`)
      }
    }
  }
</script>

<style scoped lang="stylus">
  .equipment-overview
    .equipment-type
      height 40px
      display flex
      flex-direction row
      font-size 14px
      color #545454
      justify-content center
      align-items center
      background #ffffff
    .equipment-content
      display flex
      flex-direction column
      padding 10px
      .equipment-tab
        display flex
        flex-direction row
        justify-content space-between
        padding 21px 20px 20px 16px
        margin-bottom 10px
        background #ffffff
        border-radius 8px
        .tab-left
          display flex
          flex-direction row
          align-items center
          img
            width 20px
            height 20px
            margin-right 10px
          span
            font-size 15px
            color #545454
        .tab-right
          display flex
          flex-direction row
          align-items center
          span
            font-size 15px
            color #999999
            margin-right 6px
          img
            width 6px
            height 12px

      .equipment-item
        display flex
        flex-direction column
        border-radius 8px
        background #ffffff
        margin-bottom 10px
        .equipment-item-card
          display flex
          flex-direction column
          .card-top
            display flex
            flex-direction row
            padding 21px 20px 20px 16px
            justify-content space-between
            align-items center
            border-bottom 1px solid #E9EEF0
            .card-top-left
              display flex
              flex-direction row
              align-items center
              .icon
                width 20px
                height 20px
                margin-right 10px
              span
                font-size 15px
                font-weight 500
                color #545454
            .card-top-right
              .icon
                width 20px
                height 20px
                margin-right 10px
              img
                width 6px
                height 12px
</style>
