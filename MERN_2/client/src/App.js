import React from 'react';
import Navbar from './components/Navbar';
import { Switch, Route } from 'react-router-dom';
import Landing from './components/Landing';
import Register from './components/Register';
import Login from './components/Login';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Provider } from 'react-redux';
import store from './store';
import axios from 'axios';
import { useEffect } from 'react';
import { loadUser } from './actions/auth';
import Dashboard from './components/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import CreateProfile from './components/CreateProfile';
import EditProfile from './components/EditProfile';
import AddExperience from './components/AddExperience';
import AddEducation from './components/AddEducation';
import Profiles from './components/Profiles';
import Profile from './components/Profile';
import Posts from './components/Posts';
import Post from './components/Post';

const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common['x-auth-token'] = token;
  } else {
    delete axios.defaults.headers.common['x-auth-token'];
  }
};
if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <div>
        <Navbar />
        <Switch>
          <Route exact path='/' component={Landing} />
          <ProtectedRoute path='/dashboard' component={Dashboard} />
          <Route path='/register' component={Register} />
          <Route path='/login' component={Login} />
          <Route path='/profiles' component={Profiles} />
          <Route path='/profile/:id' component={Profile} />
          <ProtectedRoute path='/posts' component={Posts} />
          <ProtectedRoute path='/post/:id' component={Post} />
          <ProtectedRoute path='/edit' component={EditProfile} />
          <ProtectedRoute path='/create-profile' component={CreateProfile} />
          <ProtectedRoute path='/add-experience' component={AddExperience} />
          <ProtectedRoute path='/add-education' component={AddEducation} />
        </Switch>
        <ToastContainer />
      </div>
    </Provider>
  );
}

export default App;
