<template lang="pug">
  .therapeutic-equipment(v-if="isLoad")
    .therapeutic-manage(v-show="optionIndex===0")
      .therapeutic-manage-left
        router-link.manage-item(to="/boss/recharge/select")
          .icon
            svg.ali_icon(aria-hidden="true")
              use(xlink:href="#iconicon_recharge")
          p 次数充值
        .manage-item(@click="toHospitalCreate")
          .icon
            svg.ali_icon(aria-hidden="true")
              use(xlink:href="#iconicon_addhospital")
          p 添加医院
        router-link.manage-item(to="/boss/hospital/select")
          .icon
            svg.ali_icon(aria-hidden="true")
              use(xlink:href="#iconicon_binding")
          p 绑定设备
        router-link.manage-item(to="/boss/doctor/hospital/select")
          .icon
            svg.ali_icon(aria-hidden="true")
              use(xlink:href="#iconicon_boctors")
          p 添加医生
      .therapeutic-manage-right(@click="optionClick(1)")
        img(src="./icon_more.png")
    .therapeutic-manage(v-show="optionIndex===1")
      .therapeutic-manage-right.left(@click="optionClick(0)")
        img(src="./icon_left.png")
      .therapeutic-manage-left.right
        router-link.manage-item(to="/boss/hospital/select")
          .icon
            svg.ali_icon(aria-hidden="true")
              use(xlink:href="#iconicon_binding")
          p 绑定设备
        router-link.manage-item(to="/boss/doctor/hospital/select")
          .icon
            svg.ali_icon(aria-hidden="true")
              use(xlink:href="#iconicon_boctors")
          p 添加医生
        router-link.manage-item(to="/boss/admin")
          .icon
            svg.ali_icon(aria-hidden="true")
              use(xlink:href="#iconicon_administrator")
          p 管理员
        a.manage-item(href="https://cdn-dsd.oss-cn-shenzhen.aliyuncs.com/apps/dsdczsc.pdf")
          .icon
            img(src="./icon_description.png")
          p 使用说明
    router-link.pandect-item(to="/boss/equipment")
      .pandect-item-top
        .left 设备总览
        .right
          span 全部
          img(src="./arrow_right.png")
      .pandect-item-content
        .card-item
          img(src="./icon_shebeishu.png")
          span 设备数
          p {{devices_summary.devices_total}}
            span 台
        .card-item
          img(src="./icon_today.png")
          span 今日治疗病人
          p {{devices_summary.today}}
            span 人
        .card-item
          img(src="./iocn_yesterday.png")
          span 昨日治疗病人
          p {{devices_summary.yesterday}}
            span 人
    router-link.pandect-item(to="/boss/hospital")
      .pandect-item-top
        .left 医院总览
        .right
          span 全部
          img(src="./arrow_right.png")
      .pandect-item-content
        .card-item
          img(src="./icon_shebeishu.png")
          span 设备数
          p {{hospitals_summary.devices_total}}
            span 台
        .card-item
          img(src="./icon_hospital.png")
          span 医院数
          p {{hospitals_summary.hospitals_total}}
            span 家
        .card-item
          img(src="./icon_docotor.png")
          span 医生数
          p {{hospitals_summary.doctors_total}}
            span 人
    router-link.pandect-item(to="/boss/patient")
      .pandect-item-top
        .left 患者总览
        .right
          span 全部
          img(src="./arrow_right.png")
      .pandect-item-content(style="flex-direction:column;")
        .list-item
          span
          p 共{{patients_summary.patients_total}}位患者
        .list-item
          span
          p 平均每家医院有{{patients_summary.per_hospital}}位患者
        .list-item
          span
          p 平均每台设备治疗{{patients_summary.per_device}}位患者
        .list-item
          span
          p 本月有{{patients_summary.month}}位患者接受治疗
</template>

<script>
  import { HbMain } from '_api/boss'
  import {mapActions} from 'vuex'
  export default {
    data() {
      return {
        isLoad: false,
        optionIndex: 0,
        devices_summary:{},
        hospitals_summary:{},
        patients_summary:{},
      }
    },
    mounted() {
      this.initData()
    },
    methods: {
      ...mapActions([
        'STORE_DATA'
      ]),
      initData(){
        if (this.$route.query.type === '0') {
          this.optionIndex = 0
        } else if (this.$route.query.type === '1') {
          this.optionIndex = 1
        }
        HbMain({},'get').then((res) => {
          this.devices_summary = res.data.devices_summary
          this.hospitals_summary = res.data.hospitals_summary
          this.patients_summary = res.data.patients_summary
          this.isLoad = true
        }).catch(() =>{
          this.$createToast({
            txt: '获取数据失败',
            type: 'txt'
          }).show()
        })
      },
      optionClick(index){
        this.optionIndex =  index
        if (index === 0) {
          this.$router.replace(this.$route.path + '?type=0')
        } else {
          this.$router.replace(this.$route.path + '?type=1')
        }
      },
      toHospitalCreate(){
        this.STORE_DATA({
          hospitalStatus: 'create'
        })
        this.$router.push(`/boss/hospital/create`)
      },
    }
  }
</script>

<style scoped lang="stylus">
  .therapeutic-equipment
    width 100%
    height 100%
    display flex
    flex-direction column
    background #E6EAED
    overflow-y scroll
    line-height 1
    .therapeutic-manage
      display flex
      flex-direction row
      padding 20px 0
      margin-bottom 10px
      background #ffffff
      justify-content space-between
      .therapeutic-manage-left
        display flex
        flex 1
        flex-direction row
        justify-content space-between
        padding 0 25px 0 30px
        .manage-item
          display flex
          flex-direction column
          justify-content center
          align-items center
          .icon
            width 28px
            height 28px
            margin-bottom 12px
            img
              width 28px
              height 28px
          p
            font-size 12px
            color #545454
      .right
        padding-right 27px
      .therapeutic-manage-right
        display flex
        padding-right 12px
        align-items center
        img
          width 14px
          height 14px
      .left
        padding-left 9px
        padding-right 7px
    .pandect-item
      display flex
      flex-direction column
      margin 0 10px 10px
      background #ffffff
      box-shadow 0px 0px 8px 0px rgba(182,205,214,0.79)
      border-radius 8px
      .pandect-item-top
        display flex
        flex-direction row
        justify-content space-between
        padding 15px
        border 1px solid #E5EEF2
        .left
          font-size 18px
          font-weight 500
          color #545454
        .right
          display flex
          flex-direction row
          align-items center
          span
            font-size 15px
            color #999999
          img
            width 6px
            height 12px
            margin-left 6px
      .pandect-item-content
        display flex
        flex-direction row
        padding 20px 0
        justify-content space-between
        .card-item
          display flex
          flex 1
          flex-direction column
          justify-content center
          align-items center
          img
            width 32px
            height 32px
            margin-bottom 6px
          span
           font-size 12px
           color #AAAAAA
           margin-bottom 3px
          p
            font-size 20px
            color #545454
            font-weight 500
            span
              font-size 11px
              font-weight 400
              margin-left 2px
        .list-item
          display flex
          flex-direction row
          align-items center
          padding-left 15px
          margin-bottom 20px
          &:last-child
            margin-bottom 0
          span
            width 8px
            height 8px
            border-radius 8px
            background #545454
            margin-right 6px
          p
            font-size 14px
            color #545454
</style>
