/*
包含n个reducer函数: 根据老的state和指定的action返回一个新的state
 */
import {combineReducers} from 'redux'
import {getRedirectPath} from '../utils'

import {
  AUTH_SUCCESS,
  ERROR_MSG,
  RECEIVE_USER,
  RESET_USER,
  RECEIVE_USER_LIST,
  RECEIVE_CHAT_MSGS,
  RECEIVE_CHAT_MSG

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
const initUserList=[];
function userList(state=initUserList,action) {
    switch (action.type){
        case RECEIVE_USER_LIST:
          return action.data
        default :
          return state
    }
}
const initChat = {
  users:{},
  chatMsg:[],
  unReadCount:0
}
function chat(state = initChat,action) {
    switch (action.type){
        case RECEIVE_CHAT_MSGS:
          console.log("2");
          const {users,chatMsgs} = action.data;
          console.log("chatMsgs",chatMsgs)
          return {
              users:users,
              chatMsgs:chatMsgs,
              unReadCount:0
          }
        case RECEIVE_CHAT_MSG:
            const chatMsg = action.data;
            console.log("chatMsg",chatMsg)
            return {
                users:state.users,
                chatMsgs:[...state.chatMsgs,chatMsg],
                unReadCount:0
            }
        default :
          return state;
    }
}
export default combineReducers({
  user,
  userList,
  chat
})


