<template lang="pug">
  .treatment_record_list.full_box
    PatientListItem(:patientListItem="doctorPatientList")
</template>

<script>
  import PatientListItem from '_components/patient_list_item/'
  import {DoctorPatientList} from '_api/doctor/'
  export default {
    components: {
      PatientListItem
    },
    data() {
      return {
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
        })
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .treatment_record_list
    /*padding 10px*/
</style>
