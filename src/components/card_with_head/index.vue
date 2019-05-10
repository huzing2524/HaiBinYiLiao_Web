<template lang="pug">
  .item.card
    .title(v-if="title", @click="toNext")
      .icon
        svg.ali_icon(aria-hidden="true")
          use(:xlink:href="'#'+icon")
      p {{title}}
      .to_edit(v-if="edit", @click="toEdit") 编辑
      .icon(v-if="iconRight")
        svg.ali_icon(aria-hidden="true")
          use(:xlink:href="'#'+iconRight")
      .iconRightSmall(v-if="iconRightSmall")
        svg.ali_icon(aria-hidden="true")
          use(:xlink:href="'#'+iconRightSmall")
    slot
</template>

<script>
  import { mapActions } from 'vuex'
  export default {
    data() {
      return {

      }
    },
    props: ['icon', 'title', 'edit','iconRight','iconRightSmall','router','path','hospitalListItem','id'],
    methods: {
      ...mapActions([
        'STORE_DATA'
      ]),
      toNext(){
        if(this.router && this.id){
          this.$router.push(this.router + '?id=' + this.id)
        }else {
          this.$router.push(this.router)
        }
      },
      toEdit(){
        this.STORE_DATA({
          hospitalStatus:'edit',
          hospitalListItem: this.hospitalListItem
        })
        this.$router.push(`/boss/hospital/create?from=${this.$route.fullPath}`)
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .card
    background #FFF
    border-radius 8px
    margin-bottom 10px
    box-shadow 0px 0px 8px 0px rgba(182,205,214,0.79)
    .title
      padding 20px
      display flex
      align-items center
      border-bottom 1px solid #E9EEF0
  .item
    .title
      .icon
        width 20px
        height 20px
      p
        color #545454
        font-size 15px
        margin-left 10px
        flex 1
      .to_edit
        background #F1FAFF
        width 72px
        height 28px
        border-radius 14px
        color #568CEA
        font-size 14px
        display flex
        align-items center
        justify-content center
      .iconRightSmall
        width 12px
        height 20px
</style>
