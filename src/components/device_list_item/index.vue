<template lang="pug">
  .device_list_item
    .item(v-for="(item,index) in deviceListItem" :key="index" @click="toDetail(item)")
      .title
        .icon
          svg.ali_icon(aria-hidden="true")
            use(xlink:href="#iconicon_treatment_")
        .device_info
          p {{item.device_name}}
          p {{item.device_category}}
        .to_detail 详情
      .used_info
        .item
          .icon
            svg.ali_icon(aria-hidden="true")
              use(xlink:href="#iconicon_shiyong")
          p 可使用次数
          p {{item.left_usage}}
            span 次
        .item
          .icon
            svg.ali_icon(aria-hidden="true")
              use(xlink:href="#iconicon_jinri")
          p 今日治疗病人
          p {{item.today_patients}}
            span 人
        .item
          .icon
            svg.ali_icon(aria-hidden="true")
              use(xlink:href="#iconicon_zuori_")
          p 昨日治疗病人
          p {{item.yesterday_patients}}
            span 人
</template>

<script>
  export default {
    data() {
      return {}
    },
    props:['deviceListItem'],
    methods: {
      toDetail(item){
        this.$router.push(`/boss/hospital/equipment_detail?id=${item.device_id}`)
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .device_list_item
    >.item
      margin-top 10px
      box-shadow 0px 0px 8px 0px rgba(182,205,214,0.79)
      background #FFF
      border-radius 8px
      .title
        padding 23px 15px
        display flex
        align-items center
        border-bottom 1px solid #E5EEF2
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
        .to_detail
          width 72px
          height 28px
          border-radius 14px
          background #F1FAFF
          color #568CEA
          font-size 14px
          display flex
          align-items center
          justify-content center
      .used_info
        display flex
        justify-content space-around
        padding 20px 0
        .item
          display flex
          flex-direction column
          align-items center
          .icon
            width 28px
            height 28px
          p
            &:nth-of-type(1)
              font-size 12px
              color #AAA
              margin-top 10px
            &:nth-of-type(2)
              font-size 18px
              color #545454
              margin-top 10px
              display flex
              align-items center
              span
                font-size 11px
                margin-left 3px
                margin-top 3px

  .aaa
    color: #000
</style>
