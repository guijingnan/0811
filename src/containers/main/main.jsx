import React , {Component} from 'react';
import {Route, Switch, Redirect} from 'react-router-dom'
import {NavBar} from 'antd-mobile'
import Cookies from 'js-cookie';
import {connect} from 'react-redux';
import {getUser} from '../../redux/actions'
import LaobanInfo from '../laoban-info/laoban-info';
import DashenInfo from '../dashen-info/dashen-info';
import Dashen from '../dashen/dashen';
import Laoban from '../laoban/laoban';
import Message from '../message/message';
import Personal from '../personal/personal';
import Chat from '../chat/chat'
import {getRedirectPath} from '../../utils';
import NavFooter from '../../components/nav-footer/nav-footer'
import NotFound from "../../components/not-found/not-found";

 class Main extends Component{
     navList = [
         {
             path: '/laoban', // 路由路径
             component: Laoban,
             title: '大神列表',
             icon: 'dashen',
             text: '大神',
         },
         {
             path: '/dashen', // 路由路径
             component: Dashen,
             title: '老板列表',
             icon: 'laoban',
             text: '老板',
         },
         {
             path: '/message', // 路由路径
             component: Message,
             title: '消息列表',
             icon: 'message',
             text: '消息',
         },
         {
             path: '/personal', // 路由路径
             component: Personal,
             title: '用户中心',
             icon: 'personal',
             text: '个人',
         }
     ]

     componentDidMount() {
         const userid = Cookies.get('userid');
         const {user} = this.props;
         if(userid && !user._id) {
             this.props.getUser()
         }
     }
    render(){

        const userid = Cookies.get('userid');
        if(!userid){
            return <Redirect to='/login'/>
        }

        const {user} = this.props;
        if(!user._id){
            return <div>Loadings</div>
        }
        const path = this.props.location.pathname;
        if(path ==='/'){
            return <Redirect to={getRedirectPath(user.type,user.header)} />
        }
        if(user.type==='laoban'){
            if(path ==='/dashen'){
              return  <Redirect to='/laoban'/>
            }
            this.navList[1].hide = 'true'
        }else{
            if(path ==='/laoban'){
                return  <Redirect to='/dashen'/>
            }
            this.navList[0].hide = 'true'
        }
        const currentNav = this.navList.find((nav,index)=>nav.path===path);

        return (
            <div>
                {currentNav ? <NavBar className='fixed-top'>{currentNav.title}</NavBar> : null}

                <Switch>
                    <Route path='/laobaninfo' component={LaobanInfo}/>
                    <Route path='/dasheninfo' component={DashenInfo}/>
                    <Route path='/laoban' component={Laoban}/>
                    <Route path='/dashen' component={Dashen}/>
                    <Route path='/message' component={Message}/>
                    <Route path='/personal' component={Personal}/>
                    <Route path='/chat/:userid' component = {Chat}/>
                    <Route component={NotFound}/>
                </Switch>
                {currentNav ? <NavFooter navList={this.navList} unReadCount={this.props.unReadCount}/> : null}
            </div>
        )
    }
}
export default connect(
    state => ({user: state.user,unReadCount:state.chat.unReadCount}),
    {getUser}
)(Main)
/*实现自动更新*/
/*如果是根路径，就根据用户信息自动跳转*/
/*如果之前登陆过，但是state里面没有_id，就要发送请求，
       * render里面不能发送ajax请求*/