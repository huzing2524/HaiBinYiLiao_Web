<template lang="pug">
  .frequency-recharge
    .frequency-recharge-content(v-show="rechargeState==='create'")
      .frequency-info
        .frequency-info-left
          .icon
            svg.ali_icon(aria-hidden="true")
              use(xlink:href="#iconicon_treatment_")
        .frequency-info-right
          span {{rechargeListItem.device_name}}
          p 设备号:{{rechargeListItem.device_id}}
          p 可使用次数：{{rechargeListItem.left_usage}}
      .frequency-input
        span 增加次数
        input(type="num", placeholder="填写增加次数" v-model="rechargeListItem.recharge_times")
      .frequency-button
        button(@click="toNext") 下一步
    .frequency-confirm-content(v-show="rechargeState==='next'")
      .confirm-frequency
        span 增加的次数
        p {{rechargeListItem.recharge_times}}
      .confirm-content
        .confirm-content-left
          .icon
            svg.ali_icon(aria-hidden="true")
              use(xlink:href="#iconicon_treatment_")
        .confirm-content-right
          span {{rechargeListItem.device_name}}
          p 设备号:{{rechargeListItem.device_id}}
          p 可使用次数：{{rechargeListItem.left_usage}}
      .confirm-hospital
        .icon
          svg.ali_icon(aria-hidden="true")
            use(xlink:href="#iconicon_hospital_")
        span {{rechargeListItem.hospital_name}}
      .confirm-button
        button(@click="confirmClick") 确认
</template>

<script>
  import {mapState, mapActions} from 'vuex'
  export default {
    data() {
      return {
        rechargeState:'',
        rechargeListItem:{}
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
        this.rechargeState = this.storeData.rechargeState
        this.rechargeListItem = this.storeData.rechargeListItem
        if(!this.rechargeState){
          this.$router.replace(`/boss/recharge/select`)
        }
      },
      toNext(){
        if(!this.rechargeListItem.recharge_times){
          this.$createToast({
            txt: '增加次数不能为空',
            type: 'txt'
          }).show()
          return
        }
        this.rechargeState = 'next'
        this.rechargeListItem = {...this.rechargeListItem,recharge_times:this.rechargeListItem.recharge_times}
      },
      confirmClick(){
        this.STORE_DATA({
          rechargeListItem: this.rechargeListItem
        })
        this.$router.replace(`/boss/recharge/success`)
      }
    }
  }
</script>

<style scoped lang="stylus">
  .frequency-recharge
    width 100%
    height 100%
    background #E6EAED
    padding 20px 10px 0 10px
    .frequency-recharge-content
      padding 26px
      background #ffffff
      box-shadow 0px 0px 8px 0px rgba(182,205,214,0.79)
      border-radius 8px
      .frequency-info
        display flex
        flex-direction row
        padding-top 2px
        .frequency-info-left
          display flex
          .icon
            width 46px
            height 46px
            margin-right 20px
        .frequency-info-right
          display flex
          flex-direction column
          justify-content flex-start
          span
            font-size 14px
            font-weight 500
            color #545454
          p
            font-size 12px
            color #999999
            margin-top 5px
      .frequency-input
        display flex
        flex-direction column
        margin-top 41px
        span
          font-size 14px
          color #545454
          margin-bottom 10px
        input
          font-size 18px
          font-weight 500
          padding-bottom 6px
          border-bottom 1px solid #E4E4E4
      .frequency-button
        display flex
        margin-top 26px
        button
          width 100%
          display flex
          font-size 16px
          color #FFFFFF
          padding 13px 0
          justify-content center
          align-items center
          background #4690F9
          border-radius 24px
    .frequency-confirm-content
      padding 26px
      background #ffffff
      box-shadow 0px 0px 8px 0px rgba(182,205,214,0.79)
      border-radius 8px
      .confirm-frequency
        display flex
        flex-direction column
        text-align center
        span
          font-size 14px
          color #999999
          margin-bottom 10px
        p
          font-size 24px
          font-weight 500
          color #545454
      .confirm-content
        display flex
        flex-direction row
        margin 26px 0 24px 0
        .confirm-content-left
          .icon
            width  24px
            height 24px
            margin-right 10px
        .confirm-content-right
          display flex
          flex-direction column
          span
            font-size 14px
            font-weight 500
            color #545454
            margin-top 2px
          p
            font-size 12px
            color #999999
            margin-top 5px
      .confirm-hospital
        display flex
        flex-direction row
        align-items center
        .icon
          width  24px
          height 24px
          margin-right 10px
        span
          font-size 14px
          color #545454
      .confirm-button
        display flex
        margin-top 26px
        button
          width 100%
          display flex
          font-size 16px
          color #FFFFFF
          padding 13px 0
          justify-content center
          align-items center
          background #4690F9
          border-radius 24px
</style>
