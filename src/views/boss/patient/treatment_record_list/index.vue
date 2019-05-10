<template lang="pug">
  .treatment_record_list.full_box(v-if="isLoad")
    TreatmentRecordListItem(:recordsListItem="recordsListItem" type="hospital" v-if="recordsListItem.length")
    NoParams(v-else)
</template>

<script>
  import { HbTreatmentRecords } from '_api/boss'
  import TreatmentRecordListItem from '_components/treatment_record_list_item/'
  import NoParams from '_components/no_params/'
  export default {
    components: {
      TreatmentRecordListItem,
      NoParams,
    },
    data() {
      return {
        isLoad:false,
        type:'',
        recordsListItem:[],
      }
    },
    mounted() {
      this.initData()
    },
    methods: {
      initData(){
        this.id = this.$route.query.id || ''
        this.type = this.$route.query.type || ''
        HbTreatmentRecords({type:this.type?this.type:'',id:this.id?this.id:''},'get').then((res) => {
          this.recordsListItem = res.data
          this.isLoad = true
        }).catch(() => {
          this.$createToast({
            txt: '获取数据失败',
            type: 'txt'
          }).show()
        })
      },
    }
  }
</script>

<style lang="stylus" scoped>
  .treatment_record_list
    /*padding 10px*/
</style>
