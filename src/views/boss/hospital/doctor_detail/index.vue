<template lang="pug">
  .doctor-detail.full_box(v-if="isLoad")
    .doctor-info
      .doctor-info-header
        .info-left
          span {{listItem.name?listItem.name:listItem.id}}
          p ID:{{listItem.id}}
        img(:src="listItem.image")
      .doctor-info-cotent
        .info-item
          .icon
            svg.ali_icon(aria-hidden="true")
              use(xlink:href="#iconicon_hospital_")
          span {{listItem.hospital_name}}
        .info-item
          .icon
            svg.ali_icon(aria-hidden="true")
              use(xlink:href="#icon_icon_phone")
          span {{listItem.phone}}
      .doctor-info-bottom(@click="toEdit") 修改
    .statistic-item(@click="toPatientList")
      .item-header
        .left
          .icon
            svg.ali_icon(aria-hidden="true")
              use(xlink:href="#iconicon_hospital_")
          span 治疗患者统计
        img(src="./arrow_right.png")
      .item-content
        .item
          .icon
            svg.ali_icon(aria-hidden="true")
              use(xlink:href="#iconicon_zong")
          span 患者总数
          p {{patients_stats.total}}
            span 次
        .item
          .icon
            svg.ali_icon(aria-hidden="true")
              use(xlink:href="#iconicon_yue")
          span 本月新增
          p {{patients_stats.month}}
            span 次
        .item
          .icon
            svg.ali_icon(aria-hidden="true")
              use(xlink:href="#iconicon_zhou")
          span 本周新增
          p {{patients_stats.week}}
            span 次
        .item
          .icon
            svg.ali_icon(aria-hidden="true")
              use(xlink:href="#iconicon_jinri")
          span 今日新增
          p {{patients_stats.day}}
            span 次
    .statistic-item(@click="toTreatmentRecord")
      .item-header
        .left
          .icon
            img(src="./icon_zhiliao.png" style="width:20px;height:20px;margin-right:10px;")
          span 治疗次数统计
        img(src="./arrow_right.png")
      .item-content
        .item
          .icon
            svg.ali_icon(aria-hidden="true")
              use(xlink:href="#iconicon_zong")
          span 患者治疗
          p {{treatment_stats.total}}
            span 次
        .item
          .icon
            svg.ali_icon(aria-hidden="true")
              use(xlink:href="#iconicon_yue")
          span 本月治疗
          p {{treatment_stats.month}}
            span 次
        .item
          .icon
            svg.ali_icon(aria-hidden="true")
              use(xlink:href="#iconicon_zhou")
          span 本周治疗
          p {{treatment_stats.week}}
            span 次
        .item
          .icon
            svg.ali_icon(aria-hidden="true")
              use(xlink:href="#iconicon_jinri")
          span 今日治疗
          p {{treatment_stats.day}}
            span 次
</template>

<script>
  import { HbHospitalDoctor } from '_api/boss'
  import {mapActions} from 'vuex'
  export default {
    data() {
      return {
        isLoad:false,
        id:'',
        listItem:{},
        patients_stats:{},
        treatment_stats:{},
      }
    },
    mounted(){
      this.initData()
    },
    methods:{
      ...mapActions([
        'STORE_DATA'
      ]),
      initData(){
        this.id = this.$route.query.id || ''
        HbHospitalDoctor({},'get',this.id).then((res) => {
          this.listItem = res.data
          this.patients_stats = res.data.patients_stats
          this.treatment_stats = res.data.treatment_stats
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
          doctorsListItem: this.listItem
        })
        this.$router.push(`/boss/hospital/doctor_edit`)
      },
      toPatientList(){
        this.$router.push(`/boss/patient/patient_list?type=doctor&id=${this.listItem.phone}`)
      },
      toTreatmentRecord(){
        this.$router.push(`/boss/patient/treatment_record_list?type=doctor&id=${this.listItem.phone}`)
      },
    }
  }
</script>

<style lang="stylus" scoped>
  .doctor-detail
    display flex
    flex-direction column
    padding 10px
    .doctor-info
      display flex
      flex-direction column
      background #ffffff
      box-shadow 0px 0px 8px 0px rgba(182,205,214,0.79)
      border-radius 8px
      margin-bottom 10px
      .doctor-info-header
        display flex
        flex-direction row
        justify-content space-between
        padding 20px 20px 0 20px
        margin-bottom 30px
        .info-left
          display flex
          flex-direction column
          span
            font-size 18px
            font-weight 500
            color #545454
            margin-bottom 8px
          p
            font-size 12px
            color #999999
        img
          width 52px
          height 52px
          border-radius 4px
      .doctor-info-cotent
        display flex
        flex-direction column
        padding 0 20px 5px 20px
        .info-item
          display flex
          flex-direction row
          align-items center
          margin-bottom 15px
          .icon
            width 24px
            height 24px
            margin-right 10px
          span
            font-size 14px
            color #545454

      .doctor-info-bottom
        display flex
        font-size 15px
        color #568CEA
        justify-content center
        padding 15px 0
        border-top 1px solid #D8D8D8
    .statistic-item
      display flex
      flex-direction column
      background #ffffff
      box-shadow 0px 0px 8px 0px rgba(182,205,214,0.79)
      border-radius 8px
      margin-bottom 10px
      .item-header
        display flex
        flex-direction row
        justify-content space-between
        align-items center
        padding 20px 20px 20px 16px
        border-bottom 1px solid #E5EEF2
        .left
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
        img
          width 6px
          height 12px
      .item-content
        display flex
        flex-direction row
        justify-content space-around
        padding 20px 0
        .item
          display flex
          flex-direction column
          justify-content center
          align-items center
          .icon
            width 28px
            height 28px
            margin-bottom 6px
          span
            font-size 12px
            color #AAAAAA
            margin-bottom 6px
          p
            font-size 18px
            font-weight 500
            color #545454
            span
              font-size 11px
              color #545454
</style>
