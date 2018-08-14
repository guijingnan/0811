import React ,{Component} from 'react';
import  {NavBar, InputItem, TextareaItem, Button} from 'antd-mobile'
import {connect} from 'react-redux';
/*import {Redirect} from 'react-router-dom';*/
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
    setHeader=(header)=>{
        this.setState({header})
    };
    handleChange=(name,val)=>{
        console.log(this.state)
        this.setState({[name]:val})
    }

    save=()=>{
        console.log("save")
        this.props.updateUser(this.state)
    }
    render(){
        /*const {user} = this.props;
        if(user.header){
            return <Redirect to='/laoban' />
        }*/
    return(
        <div>
            <NavBar>老板信息完善</NavBar>
            <HeaderSelector setHeader={this.setHeader} />
            <InputItem onChange={val=>this.handleChange('post',val)}>招聘职位:</InputItem>
            <InputItem onChange={val => this.handleChange('company', val)}>公司名称:</InputItem>
            <InputItem onChange={val => this.handleChange('salary', val)}>职位薪资:</InputItem>
    <TextareaItem rows={3} onChange={val =>this.handleChange('info',val)}/>
            <Button type='primary' onClick={this.save}>保存</Button>
        </div>
    )
    }
}
export default connect(
    state=>({user:state.user}),
    {updateUser}
)(LaobanInfo)