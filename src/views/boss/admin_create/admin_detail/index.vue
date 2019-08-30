<template lang="pug">
  .admin-detail(v-if="isLoad")
    .admin-card
      .card-top
        img(:src="adminListItem.image")
        span {{adminListItem.name?adminListItem.name:adminListItem.phone}}
        p 超级管理员
      .card-middle
        span 邀请人：{{adminListItem.invitor?adminListItem.invitor:'暂无'}}
        p(v-if="adminListItem.time") 邀请时间：{{adminListItem.time | GetYMDDateDecimalString}}
        p(v-else) 邀请时间：暂无
      .card-bottom(@click="showBtn")
        img(src="./icon_delete.png")
</template>

<script>
  import {mapState, mapActions} from 'vuex'
  import {HbManager} from '_api/boss'
  export default {
    data() {
      return {
        isLoad:false,
        adminListItem:{}
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
        this.adminListItem = this.storeData.adminListItem
        this.isLoad = true
        if(!this.adminListItem.phone){
          this.$router.push(`/boss/admin`)
        }
      },
      showBtn() {
        this.$createDialog({
          type: 'confirm',
          title: '',
          content: '确定删除该管理员吗？',
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
            let phone = ''+ this.adminListItem.phone
            HbManager({phone:phone},'delete').then((res) => {
              if(parseInt(res.data.res) ===0){
                this.$createToast({
                  txt: '删除成功',
                  type: 'txt'
                }).show()
                this.$router.push(`/boss/admin`)
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
  .admin-detail
    width 100%
    height 100%
    padding 10px 20px 0 20px
    .admin-card
      height 339px
      display flex
      flex-direction column
      align-items center
      background #ffffff
      padding 26px 0 20px 0
      box-shadow 0px 0px 8px 0px rgba(182,205,214,0.79)
      border-radius 8px
      .card-top
        display flex
        flex-direction column
        justify-content center
        align-items center
        img
          width 80px
          height 80px
          margin-bottom 15px
        span
          font-size 16px
          font-weight 500
          color #545454
          margin-bottom 10px
        p
          font-size 14px
          color #999999
      .card-middle
        display flex
        flex-direction column
        justify-content center
        align-items center
        margin-top 30px
        span
          font-size 12px
          color #BEBEBE
          margin-bottom 15px
        p
          font-size 12px
          color #BEBEBE
      .card-bottom
        display flex
        flex-direction column
        justify-content center
        align-items center
        margin-top 60px
        img
          width 22x
          height 24px
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
  .cube-dialog-btns
    &:after
      border-right 0
    a:before
      border-top 0
    a:last-child
      color #FF5454
</style>

