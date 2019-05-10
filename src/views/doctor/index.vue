<template lang="pug">
  .doctor.full_box
    .hospital_name.card
      .icon
        svg.ali_icon(aria-hidden="true")
          use(xlink:href="#iconicon_hospital_")
      p {{doctorMain.hospital_name}}
    .doctor_info.card
      .info
        .name
          p {{doctorMain.doctor_name?doctorMain.doctor_name:doctorMain.id}}
          p ID: {{doctorMain.id}}
        .avatar
          img(:src="doctorMain.avatar")
      .btn
        .item(@click="toAddRecord")
          .icon
            svg.ali_icon(aria-hidden="true")
              use(xlink:href="#iconicon_hospital_")
          p 添加治疗记录
        router-link.item(to="/doctor/add_patient")
          .icon
            svg.ali_icon(aria-hidden="true")
              use(xlink:href="#iconadd_huanzhe_")
          p 添加患者
        .item(@click="toPatientList")
          .icon
            svg.ali_icon(aria-hidden="true")
              use(xlink:href="#iconhuanzhe_")
          p 我的患者
    .patient_num.card
      .title 本院最近的患者数
      PatientCompare(:patientsListItem="patientsListItem")
    .hospital_device.card
      .title 医院设备
        router-link.iconfont(to="/doctor/contact_admin") 联系管理员充值
          i &#xe65b;
      .tips 提示：请根据医生提供的设备号为对应的设备进行充值
      .device_item(v-for="(item, idx) in doctorMain.devices")
        .icon
          svg.ali_icon(aria-hidden="true")
            use(xlink:href="#iconicon_treatment_")
        .info_list
          p {{item.equipment_name}}
          p 设备号:{{item.equipment_id}}
            span 复制
          p 可使用次数：{{item.available_counts}}
</template>

<script>
  import {DoctorMain} from '_api/doctor/'
  import PatientCompare from '_components/patient_compare'
  import {mapActions} from 'vuex'
  export default {
    data() {
      return {
        doctorMain: {},
        patientsListItem:[],
      }
    },
    components: {
      PatientCompare,
    },
    mounted() {
      this.getDoctorMain()
    },
    methods: {
      ...mapActions([
        'STORE_DATA'
      ]),
      getDoctorMain() {
        DoctorMain().then(res => {
          this.doctorMain = res.data
          this.patientsListItem = res.data.recent_counts
        })
      },
      toAddRecord(){
        this.STORE_DATA()
        this.$router.push(`/doctor/add_treatment_record`)
      },
      toPatientList(){
        this.STORE_DATA()
        this.$router.push(`/doctor/patient_list`)
        // this.$router.push(`/doctor/patient_list?from=${this.$route.fullPath}`)
      },
    }
  }
</script>

<style lang="stylus" scoped>
  .doctor
    .card
      margin-bottom 10px
      background #FFF
      padding 20px
      .title
        color #545454
        font-size 15px
        padding-left 12px
        position relative
        &:before
          content ''
          position absolute
          left 0
          top 50%
          border-radius 50%
          background #545454
          width 6px
          height 6px
          margin-top -3px
    .hospital_name
      display flex
      align-items center
      justify-content center
      .icon
        width 24px
        height 24px
      p
        font-size 14px
        color #545454
        margin-left 10px
    .doctor_info
      .info
        display flex
        justify-content space-between
        padding-bottom 20px
        border-bottom 1px solid #D8D8D8
        .name
          p
            &:nth-of-type(1)
              color #545454
              font-size 18px
            &:nth-of-type(2)
              color #999
              font-size 12px
              margin-top 8px
        .avatar
          width 52px
          height 52px
          border-radius 4px
          overflow hidden
          img
            width 100%
            height 100%
      .btn
        display flex
        padding-top 20px
        >.item
          display flex
          flex 1
          flex-direction column
          align-items center
          .icon
            width 40px
            height 40px
          p
            font-size 14px
            color #545454
            margin-top 10px
    .patient_num
    .hospital_device
      .title
        display flex
        justify-content space-between
        a
          color #568CEA
          display flex
          align-items center
          i
            font-size 12px
            margin-left 4px
      .tips
        font-size 12px
        color #999
        height 30px
        background #F4FAFF
        display flex
        align-items center
        justify-content center
        border-radius 15px
        margin 10px 0
      .device_item
        padding 20px 10px 10px
        display flex
        align-items center
        position relative
        &:after
          content ''
          width (100vw - 8px)
          background #E7E7E7
          height 1px
          position absolute
          bottom 0
        .icon
          width 46px
          height 46px
        .info_list
          margin-left 20px
          p
            font-size 12px
            color #999
            &:nth-of-type(1)
              font-size 14px
              color #545454
            &:nth-of-type(2)
              margin 8px 0
              span
                color #568CEA
                margin-left 6px
</style>
