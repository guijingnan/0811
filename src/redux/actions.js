import {AUTH_SUCCESS,ERROR_MSG,RECEIVE_USER,RESET_USER,RECEIVE_USER_LIST,RECEIVE_CHAT_MSGS,RECEIVE_CHAT_MSG} from './action-types';
import {reqRegister,reqLogin,reqUpdateUser,reqUser,reqUserList,reqMsgList} from "../api/index";
import io from 'socket.io-client'
/*action对象*/
const errMsg=(msg)=>({type:ERROR_MSG,data:msg});
const authSuccess=(user)=>({type:AUTH_SUCCESS,data:user});
const receiveUser = (user) =>({type:RECEIVE_USER,data:user});
export const resetUser = (msg)=>({type:RESET_USER,data:msg});
const receiveUserList = (userList) =>({type:RECEIVE_USER_LIST,data:userList});
const receiveChatMsgs = ({users, chatMsgs}) => ({type: RECEIVE_CHAT_MSGS, data: {users, chatMsgs}})
const receiveChatMsg = (chatMsg) =>({type:RECEIVE_CHAT_MSG,data:chatMsg});
export function register({username,password,password2,type}) {
    // 进行前台表单验证, 如果不合法返回一个同步action对象, 显示提示信息
    if(!username || !password || !type){
        return errMsg('用户名密码必须输入');
    }
    if(password !== password2){
        return errMsg('两次密码不一致');
    }
    return async dispatch=>{
        const respond = await reqRegister({username,password,type});
        const result = respond.data;
        if(result.code === 0){
            const user = result.data;
            getChatMsgs(dispatch,user._id)
            dispatch(authSuccess(user))
        }else{
            dispatch(errMsg(result.msg))
        }
    }
}
export function login({username,password}) {
    if(!username || !password){
        return errMsg('用户名密码必须输入');
    }
    return async dispatch=>{

        const respond = await reqLogin({username,password})
        const result = respond.data;

        if(result.code === 0){
            const user = result.data;
            getChatMsgs(dispatch,user._id)
            dispatch(authSuccess(user))
        }else{
            dispatch(errMsg(result.msg));
        }
    }
}
export function updateUser(user){
    return async dispatch=>{
        const response = await reqUpdateUser(user);
        console.log("respond",response)
        const result = response.data;
        if(result.code === 0){
            dispatch(receiveUser(result.data))
        }else{
            dispatch(resetUser(result.msg))
        }
    }
}
export function getUser () {
    return async dispatch => {
        // 1. 发送异步ajax请求
        const response = await reqUser()
        const result = response.data
        // 2. 根据结果分发同步action
        if(result.code === 0) {
            const user = result.data;
            getChatMsgs(dispatch,user._id)
            dispatch(receiveUser(user))
        } else {
            dispatch(resetUser(result.msg))
        }
    }
}
export function getUserList(type) {
    return async dispatch=>{
        const response = await reqUserList(type);
        console.log("type",response)
        const result = response.data;
        if(result.code===0){
            const userList = result.data
            dispatch(receiveUserList(userList))
        }
    }
}
/*连接服务器，然后某个浏览器绑定监听，用于接受服务器发送的消息，只需要监听一次*/
/*通过meId来判断是否是我发的消息，和发给我的消息*/
/*通过判断有没有socked，可以实现只连接一次*/
function initSocketIO(dispatch,meId) {
    if(!io.socket) {
        io.socket = io('ws://localhost:4000');
        io.socket.on('receiveMsg', (chatMsg) => {
            console.log('浏览器接收到服务发送的消息', chatMsg);
            if(chatMsg.from===meId || chatMsg.to===meId) {
                dispatch(receiveChatMsg(chatMsg))
            }
        })
    }


}

/*异步actions，用于发送消息，然后设置监听，用于监听发送消息给服务器，
* 传的参数是对象，包括输入的内容，from：是发送者，to是接受者
* 然后设置后端的sockio，实现实时通信*/
export function sendMsg({content,from,to}) {
    return dispatch=>{
        io.socket.emit('sendMsg',{content,from,to});
        console.log('浏览器向服务器发消息', {content, from, to})
    }
}
async function getChatMsgs(dispatch, meId) {
    initSocketIO(dispatch,meId);
    const response = await reqMsgList();
    const result = response.data;
    if(result.code===0) {
        const {users, chatMsgs} = result.data
        dispatch(receiveChatMsgs({users, chatMsgs}))
    }
}


