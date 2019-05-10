<template lang="pug">
  .hospital-select(v-if="isLoad")
    .hospital-select-list
      .list-top 选择医院
      .list-content
        .list-item(v-for="(item,index) in listItem" :key="index" @click="confirmClick(item)")
          .list-item-left
            .icon
              svg.ali_icon(aria-hidden="true")
                use(xlink:href="#iconicon_hospital_")
          .list-item-right
            span {{item.hospital_name}}
            p 已有{{item.count}}台设备
</template>

<script>
  import {HbHospitalList} from '_api/boss'
  import { mapActions } from 'vuex'
  export default {
    data() {
      return {
        isLoad: false,
        listItem:{}
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
        let type = 'devices'
        HbHospitalList({},'get',type).then((res) => {
          this.listItem = res.data
          this.isLoad = true
        }).catch(() => {
          this.$createToast({
            txt: '获取数据失败',
            type: 'txt'
          }).show()
        })
      },
      confirmClick(item){
        this.STORE_DATA({
          deviceListItem: item
        })
        this.$router.push(`/boss/device/select`)
      }
    }
  }
</script>

<style scoped lang="stylus">
  .hospital-select
    width 100%
    height 100%
    background #E6EAED
    .list-top
      height 124px
      display flex
      flex-direction row
      justify-content center
      font-size 16px
      color #ffffff
      background #3A3A3A
      padding-top 30px
      margin-bottom -50px
      border-radius 0px 0px 12px 12px
    .list-content
      display flex
      flex-direction column
      padding 0 10px
      .list-item
        display flex
        flex-direction row
        background #ffffff
        padding 20px 0 20px 16px
        margin-bottom 10px
        border-radius 8px
        align-items center
        .list-item-left
          .icon
            width 40px
            height 40px
            margin-right 12px
        .list-item-right
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
</style>
