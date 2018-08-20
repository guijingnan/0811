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
  RECEIVE_CHAT_MSG,
  MSG_READ
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
          console.log("2",state);
          var {users,chatMsgs,meId} = action.data;
          console.log("chatMsgs",chatMsgs)
            return {
                users,
                chatMsgs,
                unReadCount: chatMsgs.reduce((preTotal, msg) => preTotal + (!msg.read&&msg.to===meId ? 1 : 0), 0),
            }
        case RECEIVE_CHAT_MSG:
            var {chatMsg,meId} = action.data;
            console.log("chatMsg",state.unReadCount)
            return {
                users: state.users,
                chatMsgs: [...state.chatMsgs, chatMsg],
                unReadCount: state.unReadCount + (!chatMsg.read&&chatMsg.to===meId ? 1 : 0),
            }
        case MSG_READ:
            var {count,targetId,meId} = action.data;
            console.log("chatMsgs",state.chatMsgs)
            return {
                users:state.users,
                chatMsgs: state.chatMsgs.map(msg => {
                    if(msg.from===targetId && msg.to===meId && !msg.read) {
                        return {...msg, read: true}
                    } else {
                        return msg
                    }
                }),
                unReadCount:state.unReadCount - count
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


