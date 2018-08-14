import {AUTH_SUCCESS,ERROR_MSG,RECEIVE_USER,RESET_USER} from './action-types';
import {reqRegister,reqLogin,reqUpdateUser,reqUser} from "../api/index";
/*action对象*/
const errMsg=(msg)=>({type:ERROR_MSG,data:msg});
const authSuccess=(user)=>({type:AUTH_SUCCESS,data:user});
const receiveUser = (user) =>({type:RECEIVE_USER,data:user});
const resetUser = (msg)=>({type:RESET_USER,data:msg});
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
        if(result.code===0) {
            dispatch(receiveUser(result.data))
        } else {
            dispatch(resetUser(result.msg))
        }
    }
}

