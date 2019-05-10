<template lang="pug">
  .doctor-list.full_box(v-if="isLoad")
    .doctor-avatar-content
      .doctor-avatar-list
        .doctor-avatar-item(@click="toDetailClick(item)", v-for="(item,index) in listItem", :key="index")
          .item-left
            img(:src="item.image")
            .item-info
              span {{item.name?item.name:item.phone}}
              p {{item.phone}}
          .item-right
            img(src="./arrow_right.png")
      .doctor-avatar-bottom 共{{listItem.length}}位医生
</template>

<script>
  import {HbDoctorsList} from '_api/boss'
  export default {
    data() {
      return {
        isLoad:false,
        listItem:[],
      }
    },
    mounted() {
      this.initData()
    },
    methods: {
      initData(){
        this.id = this.$route.query.id || ''
        HbDoctorsList({hospital_id:this.id},'get').then((res) => {
          this.listItem = res.data
          this.isLoad = true
        }).catch(() =>{
          this.$createToast({
            txt: '获取数据失败',
            type: 'txt'
          }).show()
        })
      },
      toDetailClick(item){
        this.$router.push(`/boss/hospital/doctor_detail?id=${item.phone}`)
      },
    }
  }
</script>

<style lang="stylus" scoped>
  .doctor-list
    padding-top 10px
    .doctor-avatar-content
      display flex
      flex-direction column
      .doctor-avatar-list
        display flex
        flex-direction column
        padding-left 20px
        background #ffffff
        .doctor-avatar-item
          display flex
          flex-direction row
          padding 18px 0
          align-items center
          justify-content space-between
          border-bottom 1px solid rgba(216,216,216,0.3544)
          &:last-child
            border-bottom 0
          .item-left
            display flex
            flex-direction row
            align-items center
            img
              width 46px
              height 46px
              margin-right 12px
              border-radius 4px
            .item-info
              display flex
              flex-direction column
              span
                font-size 14px
                font-weight 500
                color #545454
                margin-bottom 10px
              p
                font-size 12px
                color #999999
          .item-right
            img
              width 8px
              height 14px
              margin-right 20px
      .doctor-avatar-bottom
        display flex
        justify-content center
        font-size 14px
        color #999999
        margin-top 10px
</style>
