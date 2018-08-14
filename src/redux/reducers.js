/*
包含n个reducer函数: 根据老的state和指定的action返回一个新的state
 */
import {combineReducers} from 'redux'
import {getRedirectPath} from '../utils'

import {
  AUTH_SUCCESS,
  ERROR_MSG,
  RECEIVE_USER,
  RESET_USER

} from './action-types'



const initUser = {
  username: '',
  type: '',
  msg: '',
  redirectTo: ''
}

function user(state=initUser, action) {
  switch (action.type) {
    case AUTH_SUCCESS:
      const redirectTo = getRedirectPath(action.data.type,action.data.header)
      return {...action.data, redirectTo};
    case ERROR_MSG:
      return {...state, msg: action.data};
      case RECEIVE_USER:
        return action.data;
      case RESET_USER:
        return {...initUser,msg:action.data};
    default:
      return state
  }
}

export default combineReducers({
  user
})


