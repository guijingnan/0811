/*发送axios请求的函数封装*/
import axios from 'axios';
export default function ajax(url = '',data = {} , type = 'GET') {
    if(type === 'GET'){
        let dataStr = '';
        /*Object.keys(data)是获取到对象的属性名，放入数组中，
        * 如['username','password]'*/
       Object.keys(data).forEach(key=>{
          dataStr += key + '=' +data[key] + '&'
       })
        if(dataStr){
         /*  dataStr = dataStr.substring(0,dataStr.lastIndexOf('&'));*/
           dataStr = dataStr.substring(0,dataStr.length-1);

            url = url +'?' + dataStr
        }
        return axios.get(url)
    }else {
       return axios.post(url,data)
    }


}