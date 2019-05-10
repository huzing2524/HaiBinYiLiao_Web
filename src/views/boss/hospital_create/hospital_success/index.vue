<template lang="pug">
  .hospital-success
    .hospital-success-content
      .hospital-success-card
        .card-top
          img(src="./icon_success.png")
          span 已新增医院
        .card-info
          .info-item
            span 医院名称：
            p {{hospitalListItem.hospital_name}}
          .info-item
            span 联系人：
            p {{hospitalListItem.contacts}}
          .info-item
            span 联系电话：
            p {{hospitalListItem.phone}}
          .info-item(style="margin-bottom:28px;")
            span 医院地址：
            p {{hospitalListItem.region}}
          .info-item(style="margin-bottom:0;")
            span(style="width:80px;") 详细地址：
            p {{hospitalListItem.address}}
      .hospital-success-button
        button(@click="finishClick") 完成
</template>

<script>
  import {HbHospital} from "_api/boss"
  import {mapState,mapActions} from 'vuex'
  export default {
    data() {
      return {
        hospitalListItem:{},
      }
    },
    computed: {
      ...mapState({
        storeData: state => state.storeData
      })
    },
    mounted() {
      this.initData()
    },
    methods: {
      ...mapActions([
        'STORE_DATA'
      ]),
      initData(){
        this.hospitalListItem = this.storeData.hospitalListItem
      },
      finishClick(){
        HbHospital(this.hospitalListItem,'post').then((res) => {
          if(parseInt(res.data.res)=== 0){
            this.$createToast({
              txt: '提交成功',
              type: 'txt'
            }).show()
            this.STORE_DATA()
            this.$router.replace(`/boss`)
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
      },
      // finishClick(){
      //
      //   this.$router.replace(`/boss`)
      // }
    }
  }
</script>

<style scoped lang="stylus">
  .hospital-success
    width 100%
    height 100%
    background #E6EAED
    padding 12px 7px 0 7px
    .hospital-success-content
      display flex
      flex-direction column
      .hospital-success-card
        width 100%
        height 464px
        display flex
        flex-direction column
        background url("./new_success_bg.png") no-repeat
        background-size 100% 100%
        padding 34px 0
        .card-top
          display flex
          flex-direction column
          align-items center
          img
            width 70px
            height 70px
            margin-bottom 12px
          span
            font-size 20px
            font-weight 500
            color #999999
        .card-info
          display flex
          flex-direction column
          margin-top 74px
          padding 0 28px
          .info-item
            display flex
            flex-direction row
            justify-content space-between
            margin-bottom 33px
            span
              display flex
              font-size 14px
              color #999999
            p
              width 200px
              text-align right
              font-size 14px
              color #545454
              overflow hidden
              text-overflow ellipsis
              white-space nowrap
      .hospital-success-button
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
