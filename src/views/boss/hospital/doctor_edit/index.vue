<template lang="pug">
  .doctor-edit.full_box(v-if="isLoad")
    .doctor-info
      img(:src="doctorsListItem.image")
      .info
        span {{doctorsListItem.name?doctorsListItem.name:doctorsListItem.id}}
        p {{doctorsListItem.phone}}
    .doctor-bottom
      p(v-if="doctorsListItem.invitor") 邀请人：潘玮柏{{doctorsListItem.invitor}}
      p(v-if="doctorsListItem.invite_time") 邀请时间：{{doctorsListItem.invite_time | GetYMDDateDecimalString}}
    .doctor-footer
      button(@click="showBtn") 移除
</template>

<script>
  import { HbHospitalDoctor } from '_api/boss'
  import {mapState,mapActions} from 'vuex'
  export default {
    data() {
      return {
        isLoad:false,
        doctorsListItem:{}
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
      initData() {
        this.doctorsListItem = this.storeData.doctorsListItem
        this.isLoad = true
        if (!this.doctorsListItem.phone) {
          this.$router.go(-1)
        }
      },
      showBtn() {
        this.$createDialog({
          type: 'confirm',
          title: '',
          content: '确定移除该医生吗，移除该医生对应的患者数据不会被移除？',
          confirmBtn: {
            text: '删除',
            active: true,
            disabled: false,
            href: 'javascript:;',
          },
          cancelBtn: {
            text: '取消',
            active: false,
            disabled: false,
            href: 'javascript:;'
          },
          onConfirm: () => {
            HbHospitalDoctor({},'delete',this.doctorsListItem.phone).then((res) => {
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
  .doctor-edit
    padding-top 10px
    .doctor-info
      display flex
      flex-direction row
      background #ffffff
      padding 20px 16px
      align-items center
      img
        width 50px
        height 50px
        margin-right 10px
      .info
        display flex
        flex-direction column
        span
          font-size 16px
          font-weight 500
          color #545454
          margin-bottom 10px
        p
          font-size 14px
          color #999999
    .doctor-bottom
      padding 10px
      display flex
      flex-direction column
      text-align right
      p
        text-align right
        font-size 12px
        color #999999
        margin-bottom 6px
    .doctor-footer
      width 100%
      position fixed
      bottom 0
      padding 14px 20px
      display flex
      justify-content flex-end
      background #ffffff
      button
        width 100px
        height 36px
        line-height 36px
        background #568CEA
        color #ffffff
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
