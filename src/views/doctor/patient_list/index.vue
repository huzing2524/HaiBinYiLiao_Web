<template lang="pug">
  .treatment_record_list.full_box(v-if="isLoad")
    PatientListItem(:patientListItem="doctorPatientList" v-if="doctorPatientList.length" type="doctor")
    NoParams(v-else)
</template>

<script>
  import PatientListItem from '_components/patient_list_item/'
  import NoParams from '_components/no_params/'
  import {DoctorPatientList} from '_api/doctor/'
  export default {
    components: {
      PatientListItem,
      NoParams,
    },
    data() {
      return {
        isLoad:false,
        doctorPatientList: []
      }
    },
    mounted() {
      this.getDoctorPatientList()
    },
    methods: {
      getDoctorPatientList() {
        DoctorPatientList().then(res => {
          this.doctorPatientList = res.data
          this.isLoad = true
        })
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .treatment_record_list
    /*padding 10px*/
</style>
