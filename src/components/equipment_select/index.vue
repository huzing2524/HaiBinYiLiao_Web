<template lang="pug">
  .recharge-select
    .recharge-select-top
      .recharge-select-options
        .select-options-left
          span 选择充值设备
        .select-options-right
          p(@click="toRechargeRecord") 充值记录
          img(src="./arrow_select.png")
      .recharge-select-tip
        p 友情提醒
        p 1.请根据医生提供的设备号为对应的设备进行充值
        p 2.充值时，充值设备需处于开机状态
    .recharge-select-list
      .recharge-list-header
        h3 深圳仁爱医院
      ul.recharge-list-content
        li.recharge-list-item(@click="toRechargeFrequency")
          .item-left
            img(src="./frequency.png")
          .item-right
            span 体外冲击波治疗仪
            p 设备号:5425652148253654856
            p 可使用次数：365000
    .recharge-select-list
      .recharge-list-header
        h3 北京同济医院
      ul.recharge-list-content
        li.recharge-list-item
          .item-left
            img(src="./frequency.png")
          .item-right
            span 体外冲击波治疗仪
            p 设备号:5425652148253654856
            p 可使用次数：365000
        li.recharge-list-item
          .item-left
            img(src="./frequency.png")
          .item-right
            span 体外冲击波治疗仪
            p 设备号:5425652148253654856
            p 可使用次数：365000
    .recharge-select-list
      .recharge-list-header
        h3 未添加到医院的设备
      ul.recharge-list-content
        li.recharge-list-item
          .item-left
            img(src="./frequency.png")
          .item-right
            span 体外冲击波治疗仪
            p 设备号:5425652148253654856
            p 可使用次数：365000
        li.recharge-list-item
          .item-left
            img(src="./frequency.png")
          .item-right
            span 体外冲击波治疗仪
            p 设备号:5425652148253654856
            p 可使用次数：365000
        li.recharge-list-item
          .item-left
            img(src="./frequency.png")
          .item-right
            span 体外冲击波治疗仪
            p 设备号:5425652148253654856
            p 可使用次数：365000
</template>

<script>
  export default {
    data() {
      return {}
    },
    methods: {
      toRechargeRecord(){
        this.$router.push(`/recharge/record`)
      },
      toRechargeFrequency(){
        this.$router.push(`/recharge/frequency`)
      }
    }
  }
</script>

<style scoped lang="stylus">
  .recharge-select
    width 100%
    height 100%
    background #E6EAED
    padding 20px 10px
    overflow-x hidden
    overflow-y scroll
    .recharge-select-top
      display flex
      flex-direction column
      .recharge-select-options
        display flex
        flex-direction row
        justify-content space-between
        align-items center
        margin-bottom 10px
        .select-options-left
          display flex
          span
            font-size 16px
            font-weight 500
            color #545454
        .select-options-right
          display flex
          flex-direction row
          p
            font-size 14px
            color #568CEA
            margin-right 4px
          img
            width 6px
            height 10px
      .recharge-select-tip
        height 80px
        display flex
        flex-direction column
        padding 5px 0 5px 20px
        background #D3DFE9
        border-radius 4px
        p
          font-size 12px
          color #999999
          margin 5px 0
    .recharge-select-list
      display flex
      flex-direction column
      margin-top 20px
      .recharge-list-header
        display flex
        flex-direction row
        h3
          font-size 16px
          color #999999
      .recharge-list-content
        display flex
        flex-direction column
        .recharge-list-item
          display flex
          flex-direction row
          align-items center
          background #ffffff
          padding 16px
          margin-top 10px
          box-shadow 0px 0px 8px 0px rgba(182,205,214,0.79)
          border-radius 8px
          .item-left
            display flex
            flex-direction row
            img
              width 46px
              height 46px
              margin-right 20px
          .item-right
            display flex
            flex-direction column
            span
              font-size 14px
              font-weight 500
              color #545454
            p
              font-size 12px
              color #999999
              margin-top 5px
</style>
