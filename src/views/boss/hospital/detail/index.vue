<template lang="pug">
  .boss_hospital_detail.full_box(v-if="isLoad && loading")
    .content
      CardWithHead(icon="iconicon_hospital_" :title="hospitalListItem.hospital_name" edit="1" path="/boss/hospital/create" :hospitalListItem="hospitalListItem")
        .info
          .column
            .icon
              svg.ali_icon(aria-hidden="true")
                use(xlink:href="#icondianhau")
            p {{hospitalListItem.phone}}
          .column
            .icon
              svg.ali_icon(aria-hidden="true")
                use(xlink:href="#iconicon_address1")
            p {{hospitalListItem.region}}{{hospitalListItem.address}}
      CardWithHead(icon="iconicon_statistics" title="设备使用统计" iconRight="iconicon_amplification" router="/boss/hospital/used_statistic" :id="this.id")
        UsedStatistic(:statisticListItem="statisticListItem")
      CardWithHead
        .to_list
          .column(@click="toPatientList")
            .icon
              svg.ali_icon(aria-hidden="true")
                use(xlink:href="#iconicon_huanzhe")
            p
              span 患者
              span {{listItem.patients_total}}位
          .column(@click="toTreatmentRecord")
            .icon
              svg.ali_icon(aria-hidden="true")
                use(xlink:href="#iconicon_jilu")
            p
              span 治疗记录
              span {{listItem.records_total}}条
      CardWithHead(icon="iconicon_analysis" title="患者数据分析" iconRightSmall="iconArrow_" router="/boss/patient/data_analyse" :id="this.id")
        PatientParsed(:analysisListItem="analysisListItem")
      CardWithHead(icon="iconicon_ranking" title="医生")
        .doctor_list(@click="toHospitalDoctorList")
          p 共{{listItem.doctors_total}}位医生
          .avatar_box
            .item(v-for="(item, idx) in listItem.images" :key="idx" :style="{right:idx*30+'px',index: idx +1}")
              img(:src="item")
          .icon
            svg.ali_icon(aria-hidden="true")
              use(xlink:href="#iconarrow")
      .device_list(v-if="deviceListItem.length>0")
        .title 设备总览
        DeviceListItem(:deviceListItem="deviceListItem")
</template>

<script>
  import { HbHospital } from '_api/boss'
  import { HbHospitalDetail } from '_api/hospital'
  import CardWithHead from '_components/card_with_head'
  import UsedStatistic from '_components/used_statistic'
  import PatientParsed from '_components/patient_parsed/'
  import DeviceListItem from '_components/device_list_item/'
  export default {
    components: {
      PatientParsed,
      UsedStatistic,
      DeviceListItem,
      CardWithHead,
    },
    data() {
      return {
        isLoad:false,
        loading:false,
        listItem:{},
        hospitalListItem:{},
        analysisListItem:{},
        statisticListItem:[],
        deviceListItem:[]
      }
    },
    mounted(){
      this.initData()
    },
    methods: {
      initData(){
        this.id = this.$route.query.id || ''
        HbHospital({hospital_id :this.id},'get').then((res) => {
          this.hospitalListItem = res.data
          this.isLoad = true
        }).catch(() => {
          this.$createToast({
            txt: '获取数据失败',
            type: 'txt'
          }).show()
        })
        HbHospitalDetail({},'get',this.id).then((res) => {
          this.listItem = res.data
          this.analysisListItem = res.data.patients_analysis
          this.statisticListItem = res.data.recent_use
          this.deviceListItem = res.data.devices_detail
          this.loading = true
        }).catch(() => {
          this.$createToast({
            txt: '获取数据失败',
            type: 'txt'
          }).show()
        })
      },
      toPatientList(){
        this.$router.push(`/boss/patient/patient_list?type=hospital&id=${this.id}`)
      },
      toTreatmentRecord(){
        this.$router.push(`/boss/patient/treatment_record_list?type=hospital&id=${this.id}`)
      },
      toHospitalDoctorList(){
        this.$router.push(`/boss/hospital/doctor_list?id=${this.id}`)
      },
    }
  }
</script>

<style lang="stylus" scoped>
  .boss_hospital_detail
    padding 10px
    .content
      >.item
        .info
          font-size 14px
          padding 20px 16px
          color #545454
          .column
            display flex
            align-items center
            &:nth-of-type(2)
              margin-top 20px
            .icon
              width 20px
              height 20px
              margin-right 10px
            p
              flex 1
              overflow hidden
              text-overflow ellipsis
              white-space nowrap
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
        .doctor_list
          padding 25px 16px
          display flex
          align-items center
          p
            color #545454
            font-size 14px
          .avatar_box
            flex 1
            position relative
            height 50px
            .item
              position absolute
              /*right 0*/
              top 0
              img
                width 50px
                height 50px
                border-radius 4px
              /*&:nth-of-type(1)*/
                /*background: pink*/
              /*&:nth-of-type(2)*/
                /*background: green*/
              /*&:nth-of-type(3)*/
                /*background: yellowgreen*/
          .icon
            width 16px
            height 16px
            margin-left 16px
      .device_list
        margin-top 20px
        .title
          color #999
          font-size 15px
    .aaa
      margin 0
</style>
