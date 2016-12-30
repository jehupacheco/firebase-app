import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, browserHistory} from 'react-router';
import App from './components/App';
import Login from './components/Login';
import Logout from './components/Logout';
import Home from './components/Home';
import CommentsRouterWrapper from './components/wrappers/CommentsRouterWrapper';
import FoodRouterWrapper from './components/wrappers/FoodRouterWrapper';
import {loggedIn} from './utils/firebase';
import './css/index.css';

const requireAuth = (nextState, replace) => {
  if (!loggedIn()) {
    replace({
      pathname: '/login',
      state: { nextPathname: nextState.location.pathname }
    });
  }
}

const redirectIfAuth = (nextState, replace) => {
  if (loggedIn()) {
    replace({
      pathname: '/home',
      state: { nextPathname: nextState.location.pathname }
    });
  }
}

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <Route path="/login" component={Login} onEnter={redirectIfAuth}></Route>
      <Route path="/logout" component={Logout}></Route>
      <Route path="/home" component={Home} onEnter={requireAuth}>
        <Route path="/comments" component={CommentsRouterWrapper} uri="comments" paginate={true} itemsPerPage={5}></Route>
        <Route path="/food" component={FoodRouterWrapper} uri="food"></Route>
      </Route>
    </Route>
  </Router>,
  document.getElementById('root')
);
