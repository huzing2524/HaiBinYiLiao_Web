<template lang="pug">
  .equipment-detail.full_box
    .equipment-type HB-ESWT-01型
    .equipment-content
      .equipment-tab
        .equipment-tab-top
          .tab-left
            img(src="./icon_treatment.png")
            .info
              span {{listItem.device_name}}
              p {{listItem.hospital_name}}
          .tab-right(@click="toEdit")
            span 编辑
        .equipment-tab-content
          .tab-content-item
            .item-left
              span 设备号
            .item-right
              span {{listItem.device_id}}
              p 复制
          .tab-content-item
            .item-left
              span 可用次数
            .item-right
              span {{listItem.left_usage}}
          .tab-content-item
            .item-left
              span 累积次数
            .item-right
              span {{listItem.total_usage}}
      .equipment-tip
        img(src="./icon_remind.png")
        span 若需充值使用次数，需向海滨医疗管理员提供设备号
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
          .card-top(@click="toEquipmentRank")
            .card-top-left
              .icon
                svg.ali_icon(aria-hidden="true")
                  use(xlink:href="#iconicon_ranking")
              span 医生治疗排行
            .card-top-right
              img(src="./arrow_right.png")
          UsedRank(:rankListItem="rankListItem")
      .equipment-item
        .equipment-item-card
          .card-top(@click="toPatientAnalyse")
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
  import UsedStatistic from '_components/used_statistic'
  import UsedRank from '_components/used_rank'
  import PatientParsed from '_components/patient_parsed'
  import { HbDeviceDetail } from '_api/boss'
  import {mapActions} from 'vuex'
  export default {
    data() {
      return {
        id:'',
        isLoad: false,
        listItem:{},
        rankListItem:[],
        analysisListItem:{},
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
      ...mapActions([
        'STORE_DATA'
      ]),
      initData(){
        this.id = this.$route.query.id || ''
        HbDeviceDetail({},'get',this.id).then((res) => {
          this.listItem = res.data
          this.rankListItem = res.data.doctor_rank
          this.analysisListItem = res.data.patients_analysis
          this.statisticListItem = res.data.recent_use
          this.isLoad = true
        }).catch(() => {
          this.$createToast({
            txt: '获取数据失败',
            type: 'txt'
          }).show()
        })
      },
      toEdit(){
        this.STORE_DATA({
          deviceListItem: this.listItem
        })
        this.$router.push(`/boss/hospital/equipment_edit`)
      },
      toEquipmentStatistic(){
        this.$router.push(`/boss/equipment/statistic?equipment_id=${this.id}`)
      },
      toEquipmentRank(){
        this.$router.push(`/boss/equipment/rank?id=${this.id}`)
      },
      toPatientAnalyse(){
        this.$router.push(`/boss/patient/analyse?device_id=${this.id}`)
      },
    }
  }
</script>

<style scoped lang="stylus">
  .equipment-detail
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
        flex-direction column
        .equipment-tab-top
          display flex
          flex-direction row
          padding 22px 20px 22px 16px
          background #ffffff
          justify-content space-between
          border-radius 8px 8px 0 0
          .tab-left
            display flex
            flex-direction row
            align-items center
            img
              width 36px
              height 36px
              margin-right 10px
            .info
              display flex
              flex-direction column
              span
                font-size 15px
                font-weight 500
                color #545454
                margin-bottom 4px
              p
                font-size 12px
                color #999999
          .tab-right
            display flex
            flex-direction row
            align-items center
            span
              background #F1FAFF
              width 72px
              height 28px
              border-radius 14px
              color #568CEA
              font-size 14px
              display flex
              align-items center
              justify-content center
        .equipment-tab-content
          display flex
          flex-direction column
          background #434F5E
          padding 10px 20px 10px 16px
          border-radius 0 0 8px 8px
          .tab-content-item
            display flex
            flex-direction row
            justify-content space-between
            align-items center
            margin 10px 0
            .item-left
              display flex
              span
                font-size 14px
                color #999999
            .item-right
              display flex
              flex-direction row
              align-items center
              span
                font-size 14px
                color #10C185
              p
                width 50px
                height 20px
                line-height 20px
                text-align center
                font-size 11px
                margin-left 10px
                color #10C185
                border 2px solid #10C185
                border-radius 4px
      .equipment-tip
        display flex
        flex-direction row
        padding 8px 0 10px
        align-items center
        img
          width 10px
          height 15px
          margin-right 4px
        span
          font-size 12px
          color #999999
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
