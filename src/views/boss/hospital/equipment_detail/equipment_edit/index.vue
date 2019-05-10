<template lang="pug">
  .equipment-edit(v-if="isLoad")
    .equipment-top
      .card
        .card-top
          .icon
            svg.ali_icon(aria-hidden="true")
              use(xlink:href="#iconicon_treatment_")
          .info
            span {{deviceListItem.device_name}}
            p 设备号:{{deviceListItem.device_id}}
            p 可使用次数：{{deviceListItem.left_usage}}
        .card-bottom
          .icon
            svg.ali_icon(aria-hidden="true")
              use(xlink:href="#iconicon_hospital_")
          span {{deviceListItem.hospital_name}}
    .equipment-tab(@click="showBtn")
      button 移除
</template>

<script>
  import { HbDeviceDelete } from '_api/boss'
  import {mapState, mapActions} from 'vuex'
  export default {
    data() {
      return {
        isLoad:false,
        deviceListItem:{}
      }
    },
    computed: {
      ...mapState({
        storeData: state => state.storeData
      }),
    },
    mounted(){
      this.initData()
    },
    methods: {
      ...mapActions([
        'STORE_DATA'
      ]),
      initData(){
        this.deviceListItem = this.storeData.deviceListItem
        this.isLoad = true
        if(!this.deviceListItem.device_id){
          this.$router.go(-1)
        }
      },
      showBtn() {
        this.$createDialog({
          type: 'confirm',
          title: '',
          content: '确定移除该设备吗，移除该设备对应的患者数据不会被移除',
          confirmBtn: {
            text: '移除',
            active: true,
            disabled: false,
            href: 'javascript:;'
          },
          cancelBtn: {
            text: '取消',
            active: false,
            disabled: false,
            href: 'javascript:;'
          },
          onConfirm: () => {
            HbDeviceDelete({},'delete',this.deviceListItem.device_id).then((res) => {
              if(parseInt(res.data.res) ===0){
                this.$createToast({
                  txt: '删除成功',
                  type: 'txt'
                }).show()
                this.$router.go(-2)
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
          },
          onCancel: () => {

          }
        }).show()
      }
    }
  }
</script>

<style scoped lang="stylus">
  .equipment-edit
    .equipment-top
      padding 10px
      .card
        background #ffffff
        display flex
        flex-direction column
        padding 20px 0 18px 20px
        border-radius 8px
        .card-top
          display flex
          flex-direction row
          .icon
            width 24px
            height 24px
            margin-right 10px
          .info
            display flex
            flex-direction column
            span
              font-size 14px
              color #545454
            p
              font-size 12px
              color #999999
              margin-top 6px
        .card-bottom
          display flex
          flex-direction row
          align-items center
          margin-top 22px
          .icon
            width 24px
            height 24px
            margin-right 10px
          span
            font-size 14px
            color #545454
    .equipment-tab
      width 100%
      display flex
      justify-content flex-end
      align-items center
      position fixed
      bottom 0
      background #ffffff
      height 64px
      padding-right 20px
      button
        width 100px
        height 36px
        line-height 36px
        text-align center
        font-size 15px
        color #FFFFFF
        background #568CEA
        border-radius 20px
</style>
<style lang="stylus">
  .cube-dialog-content
    margin 30px 0 28px 0
    .cube-dialog-content-def
      padding 0 20px
      p
        margin initial
        font-size 16px
        color #545454
        line-height 24px
  .cube-dialog-btns
    position relative
    &:after
      border-right 0
    a:before
      border-top 0
    a:last-child
      color #FF5454
</style>
