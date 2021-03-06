import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, Route, IndexRoute, browserHistory} from 'react-router';
import reduxThunk from 'redux-thunk';
import ReduxPromise from 'redux-promise';


import App from './components/app';

// Main Routes
import Signin from './components/auth/signin';
import Signup from './components/auth/signup';

import Profile from './components/auth/user/profile';
import UserProfile from './components/auth/user/otheruser/userProfile';
import Settings from './components/auth/user/settings';
import Welcome_Container from './components/welcome_container';

// Conventions Routes
import Conventions_Container from './components/conventions/conventions_container';
import Convention from './components/conventions/convention';
import NewConvention from './components/conventions/newConvention';

// Group Routes
import NewGroup from './components/auth/user/my_profile_stuff/groups/newGroup';
import Group from './components/auth/user/my_profile_stuff/groups/group';

import RequireAuth from './components/auth/require_auth';

import reducers from './reducers';
import {AUTH_USER} from './actions/types';

const createStoreWithMiddleware = applyMiddleware(reduxThunk, ReduxPromise)(createStore);
const store = createStoreWithMiddleware(reducers);

const token = localStorage.getItem('token');

if (token) {
  store.dispatch({type: AUTH_USER});
}


ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
        <Route path='/' component={App}>
          <IndexRoute component={Welcome_Container} />
          <Route path='signin' component={Signin}></Route>
          <Route path='signup' component={Signup}></Route>
          <Route path='profile' component={RequireAuth(Profile)}></Route>
          <Route path='settings' component={RequireAuth(Settings)}></Route>
          <Route path='userprofile/:id' component={RequireAuth(UserProfile)}></Route>
          <Route path='group/new' component={RequireAuth(NewGroup)}></Route>
        </Route>
        <Route path='/conventions' component={App}>
          <IndexRoute component={Conventions_Container} />
          <Route path=':id' component={Convention}></Route>
          <Route path='/new' component={RequireAuth(NewConvention)}></Route>
        </Route>
        <Route path='/groups' component={App}>
          <IndexRoute component={RequireAuth(NewGroup)} />
          <Route path=':id' component={RequireAuth(Group)}></Route>
          <Route path='/new' component={RequireAuth(NewGroup)}></Route>
        </Route>
    </Router>
  </Provider>
  , document.querySelector('.thing'));
