<template lang="pug">
  .patient_detail.full_box(v-if="isLoad")
    .patient_info
      .info
        .header
          .avatar
            img(src="./male.png" v-if="1")
            img(src="./female.png" v-else)
          .name
            p {{patients_summary.name}}&nbsp;&nbsp;
              span.age(v-if="patients_summary.age") {{patients_summary.age}}岁
              span.male(v-show="patients_summary.gender && patients_summary.gender==='0'") 男
              span.female(v-show="patients_summary.gender && patients_summary.gender==='1'") 女
            p
              span 保健次数：{{records.count}}次
        .info_list
          .item(v-if="patients_summary.id")
            .icon
              svg.ali_icon(aria-hidden="true")
                use(xlink:href="#iconid")
            p {{patients_summary.id}}
          .item(v-if="device.name")
            .icon
              svg.ali_icon(aria-hidden="true")
                use(xlink:href="#iconicon_treatment_")
            p {{device.name}}
          .item(v-if="patients_summary.hospital")
            .icon
              svg.ali_icon(aria-hidden="true")
                use(xlink:href="#iconicon_hospital_")
            p {{patients_summary.hospital}}
          .item(v-if="patients_summary.phone")
            .icon
              svg.ali_icon(aria-hidden="true")
                use(xlink:href="#icon_icon_phone")
            p {{patients_summary.phone}}
          .item(v-if="patients_summary.address")
            .icon
              svg.ali_icon(aria-hidden="true")
                use(xlink:href="#iconicon_address")
            p {{patients_summary.address}}
      .to_edit(@click="toEdit") 修改
    .history
      p 病史：
        span {{patients_summary.medical_history?patients_summary.medical_history:'暂无'}}
      p 保健前评估：
        span {{patients_summary.before_healthcare?patients_summary.before_healthcare:'暂无'}}
      p 保健后评估：
        span {{patients_summary.after_healthcare?patients_summary.after_healthcare:'暂无'}}
    .record
      .title
        .icon
          svg.ali_icon(aria-hidden="true")
            use(xlink:href="#iconid")
        p 治疗记录
        p {{records.count}}次
      .record_item(v-for="(item,index) in records.record_list" :key="index")
        .date
          p {{item.day}}
            span {{item.month}}月
          p(v-if="item.doctor") {{item.doctor}}
        .record_info(v-for="(items,index) in item.detail" :key="index")
          p {{items.treatment_part}}
            span 治疗档位：{{items.treatment_gear}}
            span 脉冲次数：{{items.treatment_pulse}}
          .tips(v-if="item.remark") {{item.remark}}
</template>

<script>
  import { HbPatientsDetail } from '_api/patient'
  import {mapActions} from 'vuex'
  export default {
    data() {
      return {
        id:'',
        type:'',
        isLoad:false,
        device:{},
        patients_summary:{},
        records:{},
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
        this.id = this.$route.query.id || ''
        this.type = this.$route.query.type || ''
        HbPatientsDetail({},'get',this.id).then((res) => {
          this.device = res.data.device
          this.patients_summary = res.data.patients_summary
          this.records = res.data.records
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
          patientListItem: {
            deviceName:this.device.name,
            patient_name:this.patients_summary.name,
            gender:this.patients_summary.gender,
            age:this.patients_summary.age,
            birthday:this.patients_summary.birthday,
            phone:this.patients_summary.phone,
            region:this.patients_summary.region,
            address:this.patients_summary.address,
            medical_history:this.patients_summary.medical_history,
            before_healthcare:this.patients_summary.before_healthcare,
            after_healthcare:this.patients_summary.after_healthcare,
            remark:this.patients_summary.remark,
          }
        })
        this.$router.push(`/boss/patient/patient_edit`)
      },
    }
  }
</script>

<style lang="stylus" scoped>
  .patient_detail
    padding-top 1px
    .patient_info
      margin-top 10px
      background #FFF
      .info
        border-bottom 1px solid #D8D8D8
        .header
          background #F4FAFF
          padding 20px 15px
          display flex
          align-items center
          .avatar
            width 52px
            height 52px
            img
              width 100%
              height 100%
          .name
            display flex
            height 44px
            flex-direction column
            justify-content space-between
            margin-left 10px
            font-size 16px
            p
              font-size 16px
              span
                font-size 12px
                padding 2px 12px
                border 1px solid #979797
                border-radius 4px
                margin-right 10px
                color #999
                &.age
                  color #CC9900
                  border 1px solid #CC9900
                &.male
                  color #199ED7
                  border 1px solid #199ED7
                &.female
                  color #FE6773
                  border 1px solid #FE6773
        .info_list
          padding 0 15px 15px
          color #545454
          font-size 14px
          >.item
            display flex
            align-items center
            margin-top 15px
            .icon
              width 20px
              height 20px
              margin-right 10px
      .to_edit
        display flex
        align-items center
        justify-content center
        font-size 15px
        color #568CEA
        height 51px
    .history
      padding 1px 15px 15px
      margin-top 10px
      background #FFF
      font-size 14px
      p
        margin-top 14px
        line-height 18px
        color #999
        span
          color #545454
    .record
      margin-top 10px
      background #FFF
      padding 15px
      .title
        display flex
        align-items center
        .icon
          width 24px
          height 24px
        p
          font-size 15px
          margin-left 10px
          &:nth-of-type(1)
            color #999
      .record_item
        .date
          display flex
          align-items flex-end
          justify-content space-between
          margin-top 20px
          p
            color #545454
            &:nth-of-type(1)
              font-size 28px
              span
                font-size 14px
            &:nth-of-type(2)
              font-size 14px
        .record_info
          padding 20px 15px 1px
          background #F5FBFF
          margin-left 15px
          margin-top 10px
          border-radius 8px
          p
            font-size 14px
            color #545454
            margin-bottom 20px
            span
              font-size 12px
              color #999
              padding 2px 10px
              border 1px solid #979797
              margin-right 10px
              border-radius 4px
              &:nth-of-type(1)
                margin-left 20px
          .tips
            font-size 12px
            margin-bottom 20px
            color #30CBA6
</style>
