import React , {Component} from 'react';
import {NavBar,List,InputItem,WhiteSpace,WingBlank,Button} from 'antd-mobile'
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom'
import {login} from '../../redux/actions'
import Logo from '../../components/Logo/logo'
import '../../assets/css/index.less'
 class Login extends Component{
    state={
        username:'',
        password:'',
    };
    handlerChange=(name,val)=>{
        this.setState({
            [name]:val
        })
    };
    login=()=>{
        console.log(this.state)
    this.props.login(this.state)
    };
    toRegister=()=>{
        this.props.history.replace('/register')
    }
    render(){
        const {redirectTo,msg} = this.props;
        if(redirectTo){
           return <Redirect to={redirectTo}/>
        }
        return (
            <div>
                <NavBar>用户登录</NavBar>
                <Logo/>
                <WingBlank>
                    {msg?<p className='error-msg'>{msg}</p>:null}
                    <List>
                        <InputItem placeholder='请输入用户名' onChange={(val)=>this.handlerChange('username',val)}>用户名</InputItem>
                        <WhiteSpace/>
                        <InputItem placeholder='请输入密码' onChange={(val)=>this.handlerChange('password',val)}>密码</InputItem>
                        <WhiteSpace/>
                        <Button type='primary' onClick={this.login}>登录</Button>
                        <WhiteSpace/>
                        <Button onClick={this.toRegister}>没有账户</Button>
                    </List>

                </WingBlank>
            </div>
        )
    }
}
export default connect(
    state=>state.user,
    {login}
)(Login)