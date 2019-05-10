<template lang="pug">
  .add_patitent_success
    .success_box.mgauto
      .icon.mgauto
        svg.ali_icon(aria-hidden="true")
          use(xlink:href="#iconsuccess")
      p 已添加
      p 治疗人：
        span {{treatmentListItem.name}}
      p 治疗部位：
        <!--span(v-for="(item,index) in treatmentListItem.treatments" :key="index") {{item.treatment_part}}、-->
        span {{treatmentsStr?treatmentsStr:'暂无'}}
      .device
        .icon
          svg.ali_icon(aria-hidden="true")
            use(xlink:href="#iconicon_treatment_")
        .device_info
          p {{treatmentListItem.device_name}}
          p 设备号：{{treatmentListItem.equipment_id}}
    .btn(@click="saveClick") 完成
</template>

<script>
  import {HbDoctorRecordsNew} from '_api/doctor'
  import {mapState, mapActions} from 'vuex'
  export default {
    data() {
      return {
        treatmentListItem:{},
        treatmentsList:[],
        treatmentsStr:'',
      }
    },
    computed: {
      ...mapState({
        storeData: state => state.storeData
      }),
    },
    mounted() {
      this.initData()
    },
    methods: {
      ...mapActions([
        'STORE_DATA'
      ]),
      initData(){
        // this.treatmentListItem = this.storeData.treatmentListItem
        // if(!this.treatmentListItem.id){
        //   this.$router.go(-2)
        // }
        this.treatmentListItem.treatments.forEach((item) => {
          this.treatmentsList.push(item.treatment_part)
        })
        this.treatmentsStr = this.treatmentsList.join('、')
      },
      saveClick(){
        let parmas = {
          treatments: this.treatmentListItem.treatments,
          id: this.treatmentListItem.id,
          equipment_id: this.treatmentListItem.equipment_id,
          remark: this.treatmentListItem.remark,
        }
        HbDoctorRecordsNew(parmas,'post').then((res) => {
          if(parseInt(res.data.res)=== 0){
            this.$createToast({
              txt: '新增成功',
              type: 'txt'
            }).show()
            this.STORE_DATA()
            this.$router.push(`/doctor`)
          }else {
            this.$createToast({
              txt: res.data.errmsg,
              type: 'txt'
            }).show()
          }
        }).catch(() => {
          this.$createToast({
            txt: '提交失败',
            type: 'txt'
          }).show()
        })
      }
    },
    created(){
      this.treatmentListItem = this.storeData.treatmentListItem || {}
      if(!this.treatmentListItem.id){
        this.$router.go(-2)
      }
    }

  }
</script>

<style lang="stylus" scoped>
  .add_patitent_success
    .success_box
      width 361px
      height 356px
      background url(./success_bg.png)
      background-size cover
      margin 0 auto
      padding 34px 28px
      .icon
        width 70px
        height 70px
      >p
        font-size 14px
        color #999
        span
          color #545454
        &:nth-of-type(1)
          font-size 20px
          margin-top 12px
          text-align center
        &:nth-of-type(2)
          margin-top 56px
          margin-bottom 24px
      .device
        display flex
        align-items center
        margin-top 26px
        .icon
          width 40px
          height 40px
        .device_info
          flex 1
          margin-left 12px
          display flex
          height 40px
          flex-direction column
          justify-content space-between
          p
            line-height 18px
            &:nth-of-type(1)
              font-size 14px
              color #545454
            &:nth-of-type(2)
              font-size 12px
              color #999
    .btn
      height 48px
      border-radius 24px
      margin 18px 15px 0
      font-size 16px
      color #FFF
      background #4690F9
      display flex
      align-items center
      justify-content center
</style>
