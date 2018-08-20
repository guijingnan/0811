import React, {Component} from 'react'
import {connect} from 'react-redux'
import QueueAnim from 'rc-queue-anim'
import {List, Badge} from 'antd-mobile'
const Item = List.Item;
const Brief = Item.Brief;

class Message extends Component {
    /*获取最后的消息，显示在message页面上，需要的参数chatMsgs, meId，
    * chatMsgs是用来遍历，获取每一条聊天记录把每最后一条记录存进对象里，
    * miId是用来判断是都是别人发过来的消息*/
    getLastMsgs = (chatMsgs, meId) => {
        console.log(chatMsgs)
        const lastMsgObjs = {}
        chatMsgs.forEach(msg => {
/*统计未读的消息，条件显示未读，还有别人发给我的*/
            if(!msg.read && msg.to===meId) {
                msg.unReadCount = 1
            } else {
                msg.unReadCount = 0
            }
/*获取msg.chat_id是为了判断是否是一类聊天，判断最后的消息对象里有没有消息，如果没有，就把
* 第一条消息放进对象中，如果有，就先进行未读消息数量相加，然后根据创建时间来决定是否替换之前的消息*/
            const chatId = msg.chat_id
            // 获取当前组的lastMsg
            const lastMsg = lastMsgObjs[chatId];
            if(!lastMsg) {// 当前msg就是所属组的lastMsg
                lastMsgObjs[chatId] = msg

            } else {// 有同组2条msg, 只有当当前msg更晚, 保存当前msg

                // 在确定lastMsg之前: 统计新的unReadCount
                const unReadCount = msg.unReadCount + lastMsg.unReadCount

                if(msg.create_time>lastMsg.create_time) {
                    lastMsgObjs[chatId] = msg
                }
                lastMsgObjs[chatId].unReadCount = unReadCount
            }
        })
        /*获取对象的属性值组合成数组，然后进行降序*/
        const lastMsgs = Object.values(lastMsgObjs)
        lastMsgs.sort((msg1, msg2) => {
            return msg2.create_time - msg1.create_time

        })

        return lastMsgs
    }

    render() {
        const {user} = this.props
        const meId = user._id
        const {users, chatMsgs} = this.props.chat;
        console.log(this.props.chat);
        if(!chatMsgs)
        {
            return <div>Loadings</div>
        }
        const lastMsgs = this.getLastMsgs(chatMsgs, meId)
        return (

                <List style={{marginTop: 50, marginBottom: 50}}>
                    <QueueAnim type='left'>
                        {
                            lastMsgs.map(msg => {
                                //如果msg是我发的话，目标用户的id就是msg.to，否则如果是他发的话，目标用户就是我
                                const targetId = meId === msg.from ? msg.to : msg.from
                                const targetUser = users[targetId]
                                return (

                                    <Item
                                        key={msg._id}
                                        extra={<Badge text={msg.unReadCount}/>}
                                        thumb={require(`../../assets/imgs/${targetUser.header}.png`)}
                                        arrow='horizontal'
                                        onClick={() => this.props.history.push(`/chat/${targetId}`)}
                                    >
                                        {msg.content}
                                        <Brief>{targetUser.username}</Brief>
                                    </Item>
                                )
                            })
                        }
                    </QueueAnim>

                </List>


        )
    }
}

export default connect(
    state => ({user: state.user, chat: state.chat}),
    {}
)(Message)