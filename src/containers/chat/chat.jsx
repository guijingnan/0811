import React , {Component} from 'react'
import {NavBar, List, InputItem,Icon,Grid} from 'antd-mobile'
import {connect} from 'react-redux'
import {sendMsg} from '../../redux/actions'
const Item = List.Item;
class Chat extends Component{
    state={
        content:'',
        isShow :false
    };
    send=()=>{
        const {content} = this.state;
        if(!content.trim()){
            return;
        }
        const from = this.props.user._id;
        const to = this.props.match.params.userid
        this.props.sendMsg({content,from,to});
        this.setState({content:'',isShow:false})
    };
    componentWillMount(){
        const emojis = ['😀', '😁', '🤣','😀', '😁', '🤣','😀', '😁', '🤣','😀', '😁', '🤣','😀'
            ,'😁', '🤣','😀', '😁', '🤣','😀', '😁', '🤣','😀', '😁', '🤣'
            ,'😁', '🤣','😀', '😁', '🤣','😀', '😁', '🤣','😀', '😁', '🤣'
            ,'😁', '🤣','😀', '😁', '🤣','😀', '😁', '🤣','😀', '😁', '🤣']
        this.emojis = emojis.map(emoji => ({text: emoji}))
    }
    componentDidMount() {
        // 初始显示列表
        window.scrollTo(0, document.body.scrollHeight)
    }
    componentDidUpdate(){
        window.scrollTo(0, document.body.scrollHeight)
    }
    toggleEmojis=()=>{
const isShow = !this.state.isShow;
this.setState({isShow});
        if(isShow){
    setTimeout(()=>{
        window.dispatchEvent(new Event('resize'))
    },0)
        }
    }
    render() {
        const {user} =this.props;
        const meId = user._id;
        const targetId = this.props.match.params.userid;
        const chatId = [meId,targetId].sort().join("_");
        const {users,chatMsgs} = this.props.chat;
        /*如果还没有用户信息，就显示加载*/
        if(!users[meId]){
            return <div>Loadings...</div>
        }
        // 从chatMsgs中过滤出我与当前目标用户的聊天

        const msgs = chatMsgs.filter(msg => msg.chat_id===chatId);
        const targetIcon = require(`../../assets/imgs/${users[targetId].header}.png`);
        const {isShow} = this.state;
        return (
            <div id='chat-page'>
                <NavBar
                    className='fixed-top'
                    icon={<Icon type='left'/>}
                    onLeftClick={() => this.props.history.goBack()}>
                    {users[targetId].username}

                </NavBar>

                <List style={{marginBottom: 50}}>
                    {msgs.map((msg,index)=>{
                        if(msg.to ===meId){
                            return (<Item key = {msg._id}
                                thumb={targetIcon}
                            >
                                {msg.content}
                            </Item>)
                        }else{
                            return(
                                <Item key = {msg._id}
                                    className='chat-me'
                                    extra='我'
                                >
                                    {msg.content}
                                </Item>
                            )
                        }
                    })}
                </List>

                <div className='am-tab-bar'>
                    <InputItem
                        placeholder="请输入"
                        onChange={val => {this.setState({content: val})}}
                        onFocus ={()=>this.setState({isShow:false})}
                        value ={this.state.content}
                        extra={
                            <span>
                                <span onClick={this.toggleEmojis}>😃</span>
                                <span onClick={this.send}>发送</span>
                            </span>

                        }
                    />
                    {
                        isShow ?
                            ( <Grid
                                data={this.emojis}
                                columnNum={8}
                                carouselMaxRow={4}
                                isCarousel={true}
                                onClick={(item) => {
                                    this.setState({content: this.state.content + item.text})
                                }}
                            />)
                            :null
                    }
                </div>
            </div>
        )
    }
}
export default connect(
    state=>({user:state.user,chat:state.chat}),
    {sendMsg}

)(Chat)
/*当点击发送时，就触发send函数，目的是发送消息，触发异步actions,然后再去actions里面
修改代码
* 在输入发送内容时要更新状态，才能确保是最新的聊天消息*/