<template lang="pug">
  .device-select(v-if="isLoad")
    .device-select-list
      .list-top
        span {{deviceListItem.hospital_name}}
        p 已有{{deviceListItem.count}}台设备
      .list-content
        .list-item(v-for="(item,index) in listItem" :key="index" @click="confirmClick(item,index)")
          .list-item-left
            .icon
              svg.ali_icon(aria-hidden="true")
                use(xlink:href="#iconicon_treatment_")
            .list-info
              span {{item.device_name}}
              p 设备号：{{item.device_id}}
          .list-item-right
            .icon(v-if="item.isSelected")
              svg.ali_icon(aria-hidden="true")
                use(xlink:href="#iconxuanzhong")
            span(v-else)
      .list-button
        button(@click="saveClick") 确定 ({{bindingListItem.length}})
</template>

<script>
  import { HbDevicesList } from '_api/boss'
  import {mapState, mapActions} from 'vuex'
  export default {
    data() {
      return {
        isLoad: false,
        deviceListItem:{},
        listItem:[],
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
        if(!this.deviceListItem.hospital_name){
          this.$router.replace(`/boss/hospital/select`)
        }
        let type = 0
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
      confirmClick(item,index){
        if(item.isSelected){
          this.$set(this.listItem, index, Object.assign(item, {isSelected: false}))
          this.bindingListItem.forEach((items,indexs)=> {
            if(items.device_id === item.device_id){
              this.bindingListItem.splice(indexs,1)
            }
          })
        }else {
          this.$set(this.listItem, index, Object.assign(item, {isSelected: true}))
          this.bindingListItem.push(item)
        }
      },
      saveClick(){
        let arr = []
        this.bindingListItem.forEach((item) => {
          arr.push(item.device_id)
        })
        if(this.bindingListItem.length === 0){
          this.$createToast({
            txt: '请至少选择一台设备',
            type: 'txt'
          }).show()
          return
        }
        let count = parseInt(this.deviceListItem.count) + parseInt(this.bindingListItem.length)
        this.STORE_DATA({
          deviceListItem: {
            'hospital_id': this.deviceListItem.hospital_id,
            'hospital_name': this.deviceListItem.hospital_name,
            'count': '' + count,
            'bindingListItem': arr
          }
        })
        this.$router.replace(`/boss/device/success`)

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
    .list-top
      height 147px
      display flex
      flex-direction column
      align-items center
      font-size 16px
      color #ffffff
      background #3A3A3A
      padding-top 30px
      margin-bottom -51px
      border-radius 0px 0px 12px 12px
      span
        font-size 16px
        margin-bottom 4px
      p
        font-size 12px
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
