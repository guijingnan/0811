import React ,{Component} from 'react';
import  {NavBar, InputItem, TextareaItem, Button} from 'antd-mobile'
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import HeaderSelector from "../../components/header-selector/header-selector";
import {updateUser} from '../../redux/actions'

class LaobanInfo extends Component{
    state={
        header: '', // 头像名称
        info: '', // 职位简介
        post: '', // 职位名称
        company: '', // 公司名称
        salary: '' // 工资

    };
    handleChange(name,val){
        this.setState({[name]:val})
    }
    setHeader=(header)=>{
        this.setState({header})
    }
    render(){
        const {user} = this.props;
        if(user.header){
            return <Redirect to='/laoban' />
        }
return(
    <div>
        <NavBar>老板信息完善</NavBar>
        <HeaderSelector setHeader={this.setHeader} />
        <InputItem onChage={val=>this.handleChange('post',val)}>招聘职位:</InputItem>
        <InputItem onChange={val => this.handleChange('company', val)}>公司名称:</InputItem>
        <InputItem onChange={val => this.handleChange('salary', val)}>职位薪资:</InputItem>
<TextareaItem rows={3} onChange={val =>this.handleChange('info',val)}/>
        <Button onClick={()=> this.props.updateUser(this.state)}>保存</Button>
    </div>
)
    }
}
export default connect(
    state=>state.user,
    {updateUser}
)(LaobanInfo)