<template lang="pug">
  .patient_list.full_box(v-if="isLoad")
    PatientListItem(:patientListItem="patientListItem" type="hospital" v-if="patientListItem.length")
    NoParams(v-else)
</template>

<script>
  import { HbPatientsList } from '_api/patient'
  import PatientListItem from '_components/patient_list_item/'
  import NoParams from '_components/no_params/'
  export default {
    components: {
      PatientListItem,
      NoParams,
    },
    data() {
      return {
        isLoad:false,
        type:'',
        patientListItem:[],
      }
    },
    mounted() {
      this.initData()
    },
    methods: {
      initData(){
        this.id = this.$route.query.id || ''
        this.type = this.$route.query.type || ''
        HbPatientsList({type:this.type?this.type:'',id:this.id?this.id:''},'get').then((res) => {
          this.patientListItem = res.data
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
  .patient_list
    /*padding 10px*/
</style>
