/**
 * Created by ll on 3/28/19
 */
import {
  STORE_DATA
} from "./mutations_type"
export default {
  [STORE_DATA]({commit}, data){
    commit(STORE_DATA, data)
  }
}
