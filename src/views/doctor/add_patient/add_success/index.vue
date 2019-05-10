<template lang="pug">
  .add_patitent_success.full_box
    .success_box.mgauto
      .icon.mgauto
        svg.ali_icon(aria-hidden="true")
          use(xlink:href="#iconsuccess")
      p 已添加
      p {{listItem.patient_name}}
      p
        span.age {{age}}岁
        span.male(v-show="listItem.gender && listItem.gender==='0'") 男
        span.female(v-show="listItem.gender && listItem.gender==='1'") 女
      p {{listItem.phone}}
      p {{listItem.region}} {{listItem.address}}
    .btn(@click="saveClick") 完成
</template>

<script>
  import { HbDoctorPatientsNew } from '_api/doctor'
  import {mapState,mapActions} from 'vuex'
  export default {
    data() {
      return {
        listItem:{},
        age:'',
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
        this.listItem = this.storeData.patientListItem || {}
        if(!this.listItem.patient_name){
          this.$router.go(-1)
        }
        let year = new Date().getFullYear()
        this.age = year - parseInt(this.listItem.birthday.substring(0,4))
      },
      saveClick(){
        HbDoctorPatientsNew(this.listItem,'post').then((res) => {
          if(parseInt(res.data.res)=== 0){
            this.$createToast({
              txt: '新增成功',
              type: 'txt'
            }).show()
            this.STORE_DATA()
            this.$router.push(`/doctor`)
          }else {
            this.$createToast({
              txt: res.data.errmsg,
              type: 'txt'
            }).show()
          }
        }).catch(() => {
          this.$createToast({
            txt: '新增失败',
            type: 'txt'
          }).show()
        })
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .add_patitent_success
    .success_box
      width 361px
      height 382px
      background url(./success_bg.png)
      background-size cover
      margin 0 auto
      padding-top 1px
      text-align center
      .icon
        width 70px
        height 70px
        margin-top 34px
      p
        display flex
        justify-content center
        align-items center
        text-align center
        &:nth-of-type(1)
          font-size 20px
          color #999
          margin-top 12px
        &:nth-of-type(2)
          font-size 18px
          color #545454
          margin-top 53px
        &:nth-of-type(4),&:nth-of-type(5)
          width 220px
          margin 0 auto
          font-size 14px
          color #545454
          margin-bottom 12px
        &:nth-of-type(5)
          line-height 20px
        span
          display flex
          align-items center
          justify-content center
          width 52px
          height 20px
          border-radius 4px
          font-size 12px
          margin-top 12px
          margin-bottom 26px
          &.age
            color #CC9900
            border 1px solid #CC9900
            margin-right 12px
          &.male
            color #199ED7
            border 1px solid #199ED7
          &.female
            color #FE6773
            border 1px solid #FE6773
    .btn
      height 48px
      border-radius 24px
      margin 18px 15px 0
      font-size 16px
      color #FFF
      background #4690F9
      display flex
      align-items center
      justify-content center
</style>
