import {AUTH_SUCCESS,ERROR_MSG,RECEIVE_USER,RESET_USER,RECEIVE_USER_LIST} from './action-types';
import {reqRegister,reqLogin,reqUpdateUser,reqUser,reqUserList} from "../api/index";
import io from 'socket.io-client'
/*action对象*/
const errMsg=(msg)=>({type:ERROR_MSG,data:msg});
const authSuccess=(user)=>({type:AUTH_SUCCESS,data:user});
const receiveUser = (user) =>({type:RECEIVE_USER,data:user});
export const resetUser = (msg)=>({type:RESET_USER,data:msg});
const receiveUserList = (userList) =>({type:RECEIVE_USER_LIST,data:userList})
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
            dispatch(authSuccess(result.data))
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
            dispatch(authSuccess(result.data))
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
            dispatch(receiveUser(result.data))
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
const socket = io('ws://localhost:4000');
socket.on('receiveMsg',function (chatMsg) {
    console.log("服务器向客户端发送的消息",chatMsg)
});
/*异步actions，用于发送消息，然后设置监听，用于监听发送消息给服务器，
* 传的参数是对象，包括输入的内容，from：是发送者，to是接受者
* 然后设置后端的sockio，实现实时通信*/
export function sendMsg({content,from,to}) {
    return dispatch=>{
        socket.emit('sendMsg',{content,from,to})
    }
}

