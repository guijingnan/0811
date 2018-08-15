/*选择头像的组件*/
/*onclick获取到的是(el: Object, index: number): void,
                      element有标签元素和对象元素*/
import React ,{Component} from 'react'
import {List,Grid} from 'antd-mobile'
import PropTypes from 'prop-types';
class HeaderSelector extends Component{
    static propTypes={
        setHeader: PropTypes.func.isRequired
    };
    state={
        icon:null
    };
    constructor(props){
        super(props);
        this.headerList = [];
        for(let i=0;i<20;i++){
            const text = `头像${i+1}`;
            this.headerList.push({text,icon:require(`../../assets/imgs/${text}.png`)})
        }

    }
    selectHeader=({icon,text})=>{

        this.setState({icon})
        // 更新父组件的状态
        this.props.setHeader(text)
    }

    render(){
        const {icon} = this.state;
        const gridHeader = icon?<div>已选择头像<img src={icon} alt='header'/></div>:'请选择头像'
        return(
            <List renderHeader={() => gridHeader}>
                {/*data获取的是数组*/}
                <Grid data={this.headerList}
                      columnNum={5}

                      onClick={this.selectHeader}/>
            </List>

        )
    }
}
export  default HeaderSelector