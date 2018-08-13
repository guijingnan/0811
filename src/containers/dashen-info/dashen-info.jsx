import React ,{Component}  from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import HeaderSelector from '../../components/header-selector/header-selector'
import {NavBar, InputItem, TextareaItem, Button} from 'antd-mobile';
import {updateUser} from '../../redux/actions'
class DashenInfo extends Component{
    state = {
        header: '', // 头像名称
        info: '', // 个人简介
        post: '', // 求职岗位
    }
    handleChange=(name,val)=>{
        this.setState({[name]:val})
    };
    setHeader=(header)=>{
        this.setState({header})
    }

    render(){
        const {user} = this.props
        if(user.header){
         return   <Redirect to='/dashen'/>
        }
        return(
            <div>
                <NavBar>大神信息完善</NavBar>
                <HeaderSelector setHeader={this.setHeader}/>
                <InputItem onChange={val => this.handleChange('post', val)}>求职岗位:</InputItem>
                <TextareaItem title="个人介绍:"
                              rows={3}
                              onChange={val => this.handleChange('info', val)}/>

                <Button type='primary' onClick={() => this.props.updateUser(this.state)}>保存</Button>
            </div>


        )
    }
}
export default connect(
    state =>({user:state.user}),
   {updateUser}
)(DashenInfo)