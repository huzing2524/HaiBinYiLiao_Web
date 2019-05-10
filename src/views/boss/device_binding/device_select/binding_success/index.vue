<template lang="pug">
  .binding-success
    .binding-success-content
      .binding-success-card
        .card-top
          .icon
            svg.ali_icon(aria-hidden="true")
              use(xlink:href="#iconsuccess")
          span 已绑定
        .card-content
          span {{deviceListItem.hospital_name}}
          p 已有{{deviceListItem.count}}台设备
      .binding-success-button
        button(@click="saveClick") 完成
</template>

<script>
  import { HbDeviceBinding } from '_api/boss'
  import {mapState, mapActions} from 'vuex'
  export default {
    data() {
      return {
        deviceListItem:{},
        bindingListItem:[]
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
        this.deviceListItem = this.storeData.deviceListItem || {}
        this.bindingListItem = this.storeData.deviceListItem.bindingListItem
        if(!this.deviceListItem.hospital_name){
          this.$router.replace(`/boss/hospital/select`)
        }
      },
      saveClick(){
        HbDeviceBinding({
          'hospital_id': this.deviceListItem.hospital_id,
          'device_id': this.bindingListItem
        },'post').then((res) => {
          if(parseInt(res.data.res) === 0){
            this.$createToast({
              txt: '提交成功',
              type: 'txt'
            }).show()
            this.STORE_DATA()
            this.$router.replace(`/boss/hospital/select`)
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
    }
  }
</script>

<style scoped lang="stylus">
  .binding-success
    width 100%
    height 100%
    background #E6EAED
    padding 12px 7px 0 7px
    .binding-success-content
      display flex
      flex-direction column
      .binding-success-card
        width 100%
        height 331px
        display flex
        flex-direction column
        background url("./binding_success_bg.png") no-repeat
        background-size 100% 100%
        padding 34px 0
        align-items center
        .card-top
          display flex
          flex-direction column
          align-items center
          .icon
            width 70px
            height 70px
            margin-bottom 12px
          span
            font-size 20px
            font-weight 500
            color #999999
        .card-content
          height 100px
          display flex
          flex-direction column
          padding 22px 88px
          margin-top 53px
          background #F7FBFF
          border-radius 8px
          align-items center
          span
            font-size 14px
            font-weight 500
            color #999999
            margin-bottom 10px
          p
            font-size 20px
            font-weight 500
            color #545454
      .binding-success-button
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
