/**
 * Created by ll on 3/28/19
 */
import {
  STORE_DATA
} from "./mutations_type"
export default {
  [STORE_DATA](state,data){
    state.storeData = data || {
      adminListItem:{},
      hospitalListItem:{},
      rechargeListItem:{},
      deviceListItem:{},
      doctorsListItem:{},
      patientListItem:{},
      treatmentListItem:{
        treatments:[]
      },
    }
  }
}
