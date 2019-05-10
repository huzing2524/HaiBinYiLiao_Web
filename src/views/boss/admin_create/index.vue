<template lang="pug">
  .admin-create(v-if="isLoad")
    .admin-avatar-content
      .admin-avatar-list
        .admin-avatar-item
          .item-left
            img(:src="super_manager.image")
            .item-info
              span {{super_manager.name}}
              p 超级管理员
    .admin-avatar-content
      .admin-avatar-title 普通管理员
      .admin-avatar-list
        .admin-avatar-item(@click="toDetailClick(item)", v-for="(item,index) in manager", :key="index")
          .item-left
            img(:src="item.image")
            .item-info
              span {{item.name?item.name:item.phone}}
              p {{item.phone}}
          .item-right
            img(src="./arrow_right.png")
      .admin-avatar-bottom 共{{manager.length}}位管理员
    .admin-create-button(@click="toCreateClick")
      img(src="./icon_add.png")
</template>

<script>
  import {HbManager} from '_api/boss'
  import { mapActions } from 'vuex'
  export default {
    data() {
      return {
        isLoad:false,
        listItem:{},
        super_manager:{},
        manager:[],
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
        HbManager({},'get').then((res) => {
          this.super_manager = res.data.super_manager
          this.manager = res.data.manager
          this.isLoad = true
        }).catch(() =>{
           this.$createToast({
             txt: '获取数据失败',
             type: 'txt'
           }).show()
        })
      },
      toDetailClick(item){
        this.STORE_DATA({
          adminListItem: item
        })
        this.$router.push(`/boss/admin/detail?phone=${item.phone}`)
      },
      toCreateClick(){
        this.$router.push(`/boss/admin/add`)
      }
    }
  }
</script>

<style scoped lang="stylus">
  .admin-create
    width 100%
    height 100%
    overflow-x hidden
    overflow-y scroll
    padding 10px 0
    .admin-avatar-content
      display flex
      flex-direction column
      .admin-avatar-title
        display flex
        flex-direction row
        padding 20px 0 6px 20px
        font-size 16px
        color #666666
      .admin-avatar-list
        display flex
        flex-direction column
        padding-left 20px
        background #ffffff
        .admin-avatar-item
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
                margin-bottom 4px
              p
                font-size 12px
                color #999999
          .item-right
            img
              width 8px
              height 14px
              margin-right 20px
      .admin-avatar-bottom
        display flex
        justify-content center
        font-size 14px
        color #999999
        margin-top 10px
    .admin-create-button
      position fixed
      bottom 18px
      right 18px
      img
        width 84px
        height 84px
</style>
