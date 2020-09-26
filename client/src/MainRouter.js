import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './core/Home';
import About from './core/About';
import Signup from './user/Signup';
import Signin from './user/Signin';
import Menu from './core/Menu';
import Profile from './user/Profile';
import UnauthProfile from './user/UnauthProfile';
import Users from './user/Users';
import EditProfile from './user/EditProfile';
import PrivateRoute from './auth/PrivateRoute';
import NewPost from './post/NewPost';
import Posts from './post/Posts';
import SinglePost from './post/SinglePost';
import EditPost from './post/EditPost';

const MainRouter = () => (
  <div>
    <Menu />
    <Switch>
      <Route exact path='/' component={Home} />
      <Route exact path='/signup' component={Signup} />
      <Route exact path='/signin' component={Signin} />
      <Route exact path='/about' component={About} />
      <PrivateRoute exact path='/user/:userId' component={Profile} />
      <PrivateRoute exact path='/unauthuser/:userId' component={UnauthProfile} />
      <Route exact path='/users' component={Users} />
      <PrivateRoute exact path='/user/edit/:userId' component={EditProfile} />
      <PrivateRoute exact path='/posts' component={Posts} />
      <PrivateRoute exact path='/post/new' component={NewPost} />
      <PrivateRoute exact path='/post/:postId' component={SinglePost} />
      <PrivateRoute exact path='/post/edit/:postId' component={EditPost} />
    </Switch>
  </div>
)

export default MainRouter;
