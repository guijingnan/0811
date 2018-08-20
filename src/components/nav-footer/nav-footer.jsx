import React , {Component} from 'react';
import {TabBar} from 'antd-mobile'
import PropTypes from 'prop-types'
import {withRouter} from 'react-router-dom'
class NavFooter extends Component{
    static propTypes={
        navList: PropTypes.array.isRequired,
        unReadCount:PropTypes.number.isRequired
    }
    render(){
        const path =this.props.location.pathname;
        var navList = this.props.navList;
        navList = navList.filter((nav)=>!nav.hide);
        const c = this.props.unReadCount;
        console.log(c)
        return(
            <TabBar>
                {
                    navList.map((nav, index) => (
                        <TabBar.Item key={index}
                                     badge={nav.path==='/message'?this.props.unReadCount:0}
                                     icon={{uri: require(`../../assets/images/${nav.icon}.png`)}}
                                     selectedIcon={{uri: require(`../../assets/images/${nav.icon}-selected.png`)}}
                                     title={nav.title}
                                     onPress={() =>{this.props.history.replace(nav.path)}}
                                     selected={path===nav.path}
                        />
                    ))
                }

            </TabBar>
        )
    }
}
export default withRouter(NavFooter)
