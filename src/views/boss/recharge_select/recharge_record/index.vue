<template lang="pug">
  .recharge-record(v-if="isLoad")
    ul.recharge-record-list
      li.recharge-record-item(
      @click="toRechargeDetail(item)"
      v-for="(item,index) in listItem"
      :key="index")
        .item-left
          img(:src="item.user_image")
          .item-left-info
            span {{item.user_name}}
            p {{item.hospital_name}}
        .item-right
          span +{{item.recharge_counts}}
          p.blue(v-if="item.state==='0'") {{item.state | RechargeState}}
          p.green(v-else-if="item.state==='1'") {{item.state | RechargeState}}
          p.red(v-else) {{item.state | rechargeState}}
</template>

<script>
  import { HbRechargeList } from '_api/boss'
  export default {
    data() {
      return {
        isLoad:false,
        listItem:[],
      }
    },
    mounted() {
      this.initData()
    },
    methods: {
      initData(){
        HbRechargeList({},'get').then((res) => {
          this.listItem = res.data
          this.isLoad = true
        }).catch(() =>{
          this.$createToast({
            txt: '获取数据失败',
            type: 'txt'
          }).show()
        })
      },
      toRechargeDetail(item){
        this.$router.push(`/boss/recharge/detail?id=${item.id}`)
      }
    }
  }
</script>

<style scoped lang="stylus">
  .recharge-record
    width 100%
    height 100%
    background #E6EAED
    padding 10px
    overflow-y scroll
    .recharge-record-list
      display flex
      flex-direction column
      .recharge-record-item
        display flex
        flex-direction row
        background #fff
        border-radius 8px
        padding 19px 20px 19px 16px
        margin-bottom 10px
        justify-content space-between
        align-items center
        .item-left
          display flex
          flex-direction row
          img
            width 44px
            height 44px
            margin-right 12px
            border-radius 4px
          .item-left-info
            display flex
            flex-direction column
            justify-content center
            span
              font-size 14px
              font-weight 500
              color #545454
              margin-bottom 10px
            p
              font-size 12px
              color #999999
        .item-right
          display flex
          flex-direction column
          text-align right
          span
            font-size 16px
            font-weight 500
            color #545454
            margin-bottom 8px
          p
            font-size 12px
          .blue
            color #4690F9
          .green
            color #00D379
          .red
            color #F4616C
</style>
