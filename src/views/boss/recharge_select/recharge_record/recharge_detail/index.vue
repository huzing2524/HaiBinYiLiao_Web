<template lang="pug">
  .recharge-detail(v-if="isLoad")
    .recharge-detail-card
      .card-header
        img(:src="listItem.user_image")
        p {{listItem.user_name?listItem.user_name:listItem.user_phone}}
        .num
          span +
          | {{listItem.recharge_counts}}
      .card-info
        .info-item
          span 充值状态：
          p {{listItem.state | RechargeState}}
        .info-item
          span 所属医院：
          p {{listItem.hospital_name}}
        .info-item
          span 设备名称：
          p {{listItem.equipment_name}}
        .info-item
          span 设备号：
          p {{listItem.device_id}}
        .info-item
          span 手机号：
          p {{listItem.user_phone}}
        .info-item
          span 充值时间：
          p {{listItem.time | GetYMDHMDateString}}
</template>

<script>
  import { HbRechargeDetail } from '_api/boss'
  export default {
    data() {
      return {
        isLoad:false,
        id:'',
        listItem:{}
      }
    },
    mounted() {
      this.initData()
    },
    methods: {
      initData(){
        this.id = this.$route.query.id || ''
        HbRechargeDetail({},'get',this.id).then((res) => {
          this.listItem = res.data
          this.isLoad = true
        }).catch(() =>{
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
  .recharge-detail
    width 100%
    height 100%
    background #E6EAED
    padding 10px
    .recharge-detail-card
      display flex
      flex-direction column
      background #ffffff
      border-radius 8px
      padding 20px 15px 30px 15px
      .card-header
        display flex
        flex-direction column
        justify-content center
        align-items center
        border-bottom 1px dashed #E0E0E0
        img
          width 44px
          height 44px
          border-radius 4px
          margin-bottom 12px
        p
          font-size 14px
          color #545454
          margin-bottom 27px
        .num
          display flex
          flex-direction row
          font-size 28px
          font-weight 500
          color #545454
          margin-bottom 20px
          >span
            margin-right 2px
            font-size 28px
            font-weight 500
            color #545454
      .card-info
        display flex
        flex-direction column
        padding 20px 10px 0 10px
        .info-item
          display flex
          flex-direction row
          justify-content space-between
          margin-bottom 20px
          span
            font-size 14px
            color #999999
          p
            font-size 14px
            color #545454
</style>
