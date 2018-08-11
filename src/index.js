import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter , Switch, Route} from 'react-router-dom'
import Login from './containers/login/login';
import Register from './containers/register/register';
import Main from './containers/main/main';
ReactDOM.render(
    <HashRouter>
        <Switch>
            <Route path='/login' component={Login} />
            <Route path='/register' component={Register} />
            <Route  component={Main} />
        </Switch>
    </HashRouter>,document.getElementById('root'));