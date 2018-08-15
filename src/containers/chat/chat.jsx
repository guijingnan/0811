import React , {Component} from 'react'
import {NavBar, List, InputItem} from 'antd-mobile'
import {connect} from 'react-redux'
import {sendMsg} from '../../redux/actions'
const Item = List.Item;
class Chat extends Component{
    state={
        content:''
    };
    send=()=>{
        const {content} = this.state
        const from = this.props.user._id;
        const to = this.props.match.params.userid
        this.props.sendMsg({content,from,to})
    }
    render() {

        return (
            <div id='chat-page'>
                <NavBar>aa</NavBar>
                <List>
                    <Item
                        thumb={require('../../assets/imgs/头像1.png')}
                    >
                        你好
                    </Item>
                    <Item
                        thumb={require('../../assets/imgs/头像1.png')}
                    >
                        你好2
                    </Item>
                    <Item
                        className='chat-me'
                        extra='我'
                    >
                        很好
                    </Item>
                    <Item
                        className='chat-me'
                        extra='我'
                    >
                        {this.state.content}
                    </Item>
                </List>

                <div className='am-tab-bar'>
                    <InputItem
                        placeholder="请输入"
                        onChange={val => {this.setState({content: val})}}
                        extra={
                            <span onClick={this.send}>发送</span>
                        }
                    />
                </div>
            </div>
        )
    }
}
export default connect(
    state=>({user:state.user}),
    {sendMsg}

)(Chat)
/*当点击发送时，就触发send函数，目的是发送消息，触发异步actions,然后再去actions里面
修改代码
* 在输入发送内容时要更新状态，才能确保是最新的聊天消息*/