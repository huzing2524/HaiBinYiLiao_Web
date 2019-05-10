<template lang="pug">
  .boss_hospital(v-if="isLoad")
    .item(@click="toHospitalDetail(item)", v-if="listItem.length>0", v-for="(item,index) in listItem", :key="index")
      .hospital_name
        p {{item.hospital_name}}
        .arrow
          img(src="./icon_arrow.png")
      .info
        .column
          .icon
            svg.ali_icon(aria-hidden="true")
              use(xlink:href="#iconicon_shebeishu")
          p 设备数
          p
            span {{item.devices_count}}
            span 台
        .column
          .icon
            svg.ali_icon(aria-hidden="true")
              use(xlink:href="#iconicon_yisheng")
          p 医生数
          p
            span {{item.doctors_count}}
            span 人
        .column
          .icon
            svg.ali_icon(aria-hidden="true")
              use(xlink:href="#iconicon_jinri")
          p 今日治疗病人数
          p
            span {{item.today_patients}}
            span 人
    .nodata(v-else)
      img(src="./nodata.png")
      p 还没有医院，去首页添加医院吧
</template>

<script>
  import { HbHospitalsMain } from '_api/hospital'
  export default {
    data() {
      return {
        isLoad:false,
        listItem:[],
      }
    },
    mounted(){
      this.initData()
    },
    methods: {
      initData(){
        HbHospitalsMain().then((res) => {
          this.listItem = res.data
          this.isLoad = true
        }).catch(() => {
          this.$createToast({
            txt: '获取数据失败',
            type: 'txt'
          }).show()
        })
      },
      toHospitalDetail(item){
        this.$router.push(`/boss/hospital/detail?id=${item.hospital_id}`)
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .boss_hospital
    padding 10px
    .item
      width 100%
      background #FFF
      border-radius 8px
      margin-bottom 10px
      .hospital_name
        padding 18px
        display flex
        justify-content space-between
        font-size 15px
        border-bottom 1px solid #E5EEF2
        color #545454
        .arrow
          width 6px
          height 12px
          img
            width 100%
            height 100%
      .info
        display flex
        padding 20px 0
        .column
          flex 1
          display flex
          flex-direction column
          align-items center
          .icon
            width 28px
            height 28px
          p
            &:nth-of-type(1)
              font-size 12px
              color #AAAAAA
              margin-top 8px
            &:nth-of-type(2)
              margin-top 10px
              display flex
              align-items center
              color #545454
            span
              &:nth-of-type(1)
                font-size 18px
              &:nth-of-type(2)
                font-size 11px
                margin-left 3px
                margin-top 3px
    .nodata
      img
        width 131px
        height 118px
        margin 60px auto 40px
      p
        color #999999
        font-size 16px
        text-align center
</style>
