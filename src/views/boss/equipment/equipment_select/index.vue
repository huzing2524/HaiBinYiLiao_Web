<template lang="pug">
  .recharge-select(v-if="isLoad")
    .recharge-select-top(@click="toEquipment")
      .select-left
        span 设备总览
        p 体外冲击波治疗仪
      .select-right
        img(src="./arrow_right.png")
    .recharge-select-list(v-for="(item,index) in in_hospital" :key="index")
      .recharge-list-header
        h3 {{item.hospital_name}}
      ul.recharge-list-content
        li.recharge-list-item(@click="toEquipmentDetail(items)", v-for="(items,indexs) in item.list", :key="indexs")
          .item-left
            .icon
              svg.ali_icon(aria-hidden="true")
                use(xlink:href="#iconicon_treatment_")
          .item-right
            span {{items.device_name?items.device_name:'-'}}
            p 设备号：{{items.device_id}}
            p 可使用次数：{{items.left_usage?items.left_usage:0}}
    .recharge-select-list
      .recharge-list-header
        h3 未添加到医院的设备
      ul.recharge-list-content
        li.recharge-list-item(@click="toEquipmentDetail(item)", v-for="(item,index) in out_hospital" :key="index")
          .item-left
            .icon
              svg.ali_icon(aria-hidden="true")
                use(xlink:href="#iconicon_treatment_")
          .item-right
            span {{item.device_name?item.device_name:'-'}}
            p 设备号：{{item.device_id}}
            p 可使用次数：{{item.left_usage}}
</template>

<script>
  import { HbDevicesList } from '_api/boss'
  export default {
    data() {
      return {
        isLoad:false,
        in_hospital:{},
        out_hospital:{},
      }
    },
    mounted() {
      this.initData()
    },
    methods: {
      initData(){
        let type = 1
        HbDevicesList({type:type},'get').then((res) => {
          this.in_hospital = res.data.in_hospital
          this.out_hospital = res.data.out_hospital
          this.isLoad = true
        }).catch(() =>{
          this.$createToast({
            txt: '获取数据失败',
            type: 'txt'
          }).show()
        })
      },
      toEquipment(){
        this.$router.push(`/boss/equipment`)
      },
      toEquipmentDetail(item){
        this.$router.push(`/boss/equipment/detail?id=${item.device_id}`)
      }
    }
  }
</script>

<style scoped lang="stylus">
  .recharge-select
    width 100%
    height 100%
    background #E6EAED
    padding-bottom 20px
    overflow-x hidden
    overflow-y scroll
    .recharge-select-top
      display flex
      flex-direction row
      justify-content space-between
      align-items center
      padding 12px 20px
      margin-bottom 10px
      background #ffffff
      .select-left
        display flex
        flex-direction column
        span
          font-size 14px
          font-weight 500
          color #545454
          margin-bottom 6px
        p
          font-size 12px
          color #999999
      .select-right
        display flex
        flex-direction row
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
      padding 0 10px
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
            .icon
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
