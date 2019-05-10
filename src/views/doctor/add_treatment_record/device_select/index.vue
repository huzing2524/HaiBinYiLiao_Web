<template lang="pug">
  .device-select(v-if="isLoad")
    .device-select-list
      .list-content
        .list-item(v-for="(item,index) in listItem" :key="index" @click="confirmClick(item)")
          .list-item-left
            .icon
              svg.ali_icon(aria-hidden="true")
                use(xlink:href="#iconicon_treatment_")
            .list-info
              span {{item.device_name}}
              p 设备号：{{item.device_id}}
</template>

<script>
  import { HbDevicesList } from '_api/boss'
  import {mapState, mapActions} from 'vuex'
  export default {
    data() {
      return {
        isLoad: false,
        treatmentListItem:{},
        listItem:[],
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
        // this.treatmentListItem = this.storeData.treatmentListItem
        // if(!this.treatmentListItem.id){
        //   this.$router.go(-2)
        // }
        let type = this.treatmentListItem.hospital_id
        HbDevicesList({type:type},'get').then((res) => {
          this.listItem = res.data
          this.isLoad = true
        }).catch(() =>{
          this.$createToast({
            txt: '获取数据失败',
            type: 'txt'
          }).show()
        })
      },
      confirmClick(item){
        this.STORE_DATA({
          treatmentListItem: {
            id:this.treatmentListItem.id,
            name:this.treatmentListItem.name,
            equipment_id:item.device_id,
            device_name:item.device_name,
            treatments: this.treatmentListItem.treatments,
            remark: this.treatmentListItem.remark,
          }
        })
        this.$router.replace(`/doctor/add_treatment_record/success`)
      },
    },
    created(){
      this.treatmentListItem = this.storeData.treatmentListItem || {}
      if(!this.treatmentListItem.id){
        this.$router.go(-2)
      }
    }
  }
</script>

<style scoped lang="stylus">
  .device-select
    width 100%
    height 100%
    background #E6EAED
    padding-bottom 64px
    overflow-y scroll
    padding-top 10px
    .list-content
      display flex
      flex-direction column
      padding 0 10px
      .list-item
        display flex
        flex-direction row
        background #ffffff
        padding 21px 20px 21px 16px
        margin-bottom 10px
        border-radius 8px
        justify-content space-between
        align-items center
        .list-item-left
          display flex
          flex-direction row
          align-items center
          .icon
            width 40px
            height 40px
            margin-right 12px
          .list-info
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
        .list-item-right
          display flex
          span
            width 18px
            height 18px
            background #E6EAED
            border-radius 18px
          .icon
            width 22px
            height 22px
    .list-button
      display flex
      width 100%
      height 64px
      position fixed
      bottom 0
      padding 12px 20px
      background #ffffff
      justify-content flex-end
      button
        width 120px
        height 40px
        line-height 40px
        font-size 16px
        color #ffffff
        background #4690F9
        text-align center
        border-radius 20px
</style>
