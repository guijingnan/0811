import React , {Component} from 'react';
import {NavBar,List,InputItem,WhiteSpace,WingBlank,Button,Radio} from 'antd-mobile'
import Logo from '../../components/Logo/logo'
export default  class Register extends Component{
    state={
        username:'',
        password:'',
        password2:'',
        type:'dashen'
    };
    handlerChange=(name,val)=>{
        this.setState({
            [name]:val
        })
    };
    register=()=>{
        console.log(this.state)

    };
    toLogin=()=>{

        this.props.history.replace('/login')
    }
    render(){
        const {type} = this.state;

        return (
            <div>
                <NavBar>用户注册</NavBar>
                <Logo/>
                <WingBlank>
                    <List>
                        <InputItem placeholder='请输入用户名' onChange={(val)=>this.handlerChange('username',val)}>用户名</InputItem>
                        <WhiteSpace/>
                        <InputItem placeholder='请输入密码' onChange={(val)=>this.handlerChange('password',val)}>密码</InputItem>
                        <WhiteSpace/>
                        <InputItem placeholder='请输入确认密码' onChange={(val)=>this.handlerChange('password2',val)}>确认密码</InputItem>
                        <WhiteSpace/>
                        <List.Item>
                            <span>用户类型:</span>
                            <Radio checked={type=== 'dashen'} onChange={()=>this.handlerChange('type','dashen')}>大神</Radio>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <Radio checked={type=== 'laoban'} onChange={()=>this.handlerChange('type','laoban')}>老板</Radio>
                        </List.Item>
                        <WhiteSpace/>
                        <Button type='primary' onClick={this.register}>注册</Button>
                        <WhiteSpace/>
                        <Button onClick={this.toLogin}>已有账户</Button>
                    </List>

                </WingBlank>
            </div>
        )
    }
}
