<template lang="pug">
  .treatment_record_list_item
    .item(v-for="(item,index) in recordsListItem" :key="index")
      .header
        .left
          .avatar
            img(src="./male.png" v-if="1")
            img(src="./female.png" v-else)
          .name_sex
            p {{item.name?item.name:'-'}}
            p
              span.age(v-if="item.age") {{item.age}}岁
              span.male(v-if="item.gender==='0'") 男
              span.female(v-else-if="item.gender==='1'") 女
        .right {{item.time | GetMDHMDateString}}
      .part_list(v-show="item.treatments.length>0")
        .item(v-for="(items,indexs) in item.treatments" :key="indexs")
          p {{items.treatment_part}}
          p
            span 治疗档位：{{items.treatment_gear}}
            span 脉冲次数：{{items.treatment_pulse}}
        .tips {{item.remark}}
</template>

<script>
  export default {
    data() {
      return {}
    },
    props:['recordsListItem','type'],
  }
</script>

<style lang="stylus" scoped>
  .treatment_record_list_item
    padding 10px
    >.item
      border-radius 8px
      margin-bottom 10px
      overflow hidden
      .header
        padding 15px 20px 15px 15px
        background #F4FAFF
        display flex
        justify-content space-between
        align-items center
        .left
          display flex
          flex-direction row
          .avatar
            width 52px
            height 52px
            border-radius 8px
            img
              width 100%
              height 100%
          .name_sex
            margin-left 10px
            display flex
            flex-direction column
            justify-content center
            p
              &:nth-of-type(1)
                color #545454
                font-size 16px
                margin-bottom 14px
              &:nth-of-type(2)
                font-size 12px
                span
                  padding 1px 12px
                  border-radius 4px
                  margin-right 12px
                  background #FFF
                  &.age
                    color #CC9900
                    border 1px solid #CC9900
                  &.male
                    color #199ED7
                    border 1px solid #199ED7
                  &.female
                    color #FE6773
                    border 1px solid #FE6773
        .right
          font-size 14px
          color #999999
      .part_list
        background #FFF
        padding 20px 15px 1px
        >.item
          display flex
          margin-bottom 25px
          p
            font-size 14px
            color #545454
            &:nth-of-type(1)
              padding-right 15px
            span
              padding 2px 10px
              border 1px solid #5D535E
              border-radius 4px
              margin-right 10px
        .tips
          color #30CBA6
          font-size 12px
          margin-bottom 20px
</style>
