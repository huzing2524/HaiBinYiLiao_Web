<template lang="pug">
  .recharge-success
    .recharge-success-content
      .recharge-success-card
        .card-top
          img(src="./recharge.png")
          span 充值中..
          p 充值成功后会第一时间通知你
          .num
            p
              span +
              | {{rechargeListItem.recharge_times}}
        .card-center
          .card-item-left
            .icon
              svg.ali_icon(aria-hidden="true")
                use(xlink:href="#iconicon_treatment_")
          .card-item-right
            span {{rechargeListItem.device_name}}
            p 设备号：{{rechargeListItem.device_id}}
            p 可使用次数：{{rechargeListItem.left_usage}}
        .card-bottom
          .icon
            svg.ali_icon(aria-hidden="true")
              use(xlink:href="#iconicon_hospital_")
          span {{rechargeListItem.hospital_name}}
      .recharge-success-button
        button(@click="confirmClick") 知道了
</template>

<script>
  import { HbRechargeNew } from '_api/boss'
  import {mapState, mapActions} from 'vuex'
  export default {
    data() {
      return {
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
        this.rechargeListItem = this.storeData.rechargeListItem
        if(!this.rechargeListItem.device_id){
          this.$router.replace(`/boss/recharge/select`)
        }
      },
      confirmClick(){
        HbRechargeNew({
          'device_id': this.rechargeListItem.device_id,
          'recharge_times': this.rechargeListItem.recharge_times
        },'post').then((res) => {
          if(parseInt(res.data.res) === 0){
            this.$createToast({
              txt: '提交成功',
              type: 'txt'
            }).show()
            this.$router.replace(`/boss/recharge/select`)
          }else {
            this.$createToast({
              txt: res.data.errmsg,
              type: 'txt'
            }).show()
          }
        }).catch(() => {
          this.$createToast({
            txt: '获取数据失败',
            type: 'txt'
          }).show()
        })
      }
    }
  }
</script>

<style scoped lang="stylus">
  .recharge-success
    width 100%
    height 100%
    background #E6EAED
    padding 12px 7px 0 7px
    .recharge-success-content
      display flex
      flex-direction column
      .recharge-success-card
        width 100%
        height 467px
        display flex
        flex-direction column
        background url("./recharge_success.png") no-repeat
        background-size 100% 100%
        padding 34px 0
        .card-top
          display flex
          flex-direction column
          align-items center
          img
            width 70px
            height 70px
            margin-bottom 12px
          span
            font-size 20px
            font-weight 500
            color #999999
            margin-bottom 10px
          p
            font-size 12px
            color #999999
          .num
            width 295px
            display flex
            flex-direction column
            align-items center
            background #F7FBFF
            border-radius 8px
            margin 20px 33px 0 33px
            padding 20px 0
            span
              font-size 14px
              color #999999
              margin-bottom 5px
            p
              font-size 28px
              font-weight 500
              color #545454
              span
                font-size 28px
                font-weight 500
                color #545454
                margin-right 2px
        .card-center
          display flex
          flex-direction row
          margin-top 74px
          padding-left 34px
          .card-item-left
            display flex
            .icon
              width 24px
              height 24px
              margin-right 10px
          .card-item-right
            display flex
            flex-direction column
            span
              font-size 14px
              color #545454
              margin-top 2px
            p
              font-size 12px
              color #999999
              margin-top 5px
        .card-bottom
          display flex
          flex-direction row
          margin-top 26px
          padding-left 39px
          align-items center
          .icon
            width  24px
            height 24px
            margin-right 10px
          span
            font-size 14px
            color #545454
      .recharge-success-button
        display flex
        flex-direction row
        align-items center
        margin-top 18px
        padding 0 8px
        button
          width 100%
          height 48px
          line-height 48px
          font-size 16px
          font-weight 500
          color #ffffff
          background #4690F9
          border-radius 24px
</style>
