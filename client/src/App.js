import React, { Fragment, useEffect } from 'react';
import Header from './componentss/layout/Header';
import Footer from './componentss/layout/Footer';
import Home from './views/Home'
import LoginCustomer from './components/auth/LoginCustomer';
import LoginCenter from './components/auth/LoginCenter';
import RegisterCustomer from './components/auth/RegisterCustomer';
import RegisterCenter from './components/auth/registerCenter';
import Alert from './components/layout/Alert';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// Redux
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';
import Dashboard from './components/dashboard/Dashboard';
import DashboardCenter from './components/dashboard/DashboardCenter';

import CreateProfile from './components//profile-form/CreateProfile';
import CreateProfileCenter from './components//profile-form/CreateProfileCenter';

import EditsProfileCenter from './components/profile-form/EditsProfileCenter';
import EditsProfile from './components/profile-form/EditsProfile';

// import AddExperience from './components//profile-form/AddExperience';
// import AddEducation from './components//profile-form/AddEducation';
import PrivateRoute from './routing/PrivateRoute';
import Profiles from './components/profile/Profiles';
import Centers from './components/centers/Centers';
import Booking from './components/booking/Booking';
import Profile from './components/profileid/Profile';
import Posts from './components/posts/Posts';
import Post from './components/post/Post';
import Confirm from './components/confirm/Confirm';

import './App.css';
import CenterId from './components/centers/CenterId';

if (localStorage.token && localStorage.role) {
  setAuthToken(localStorage.token, localStorage.role);
}
const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return (
    <Provider store={store}>
      <div className='App'>
        <Router>
          <Fragment>
            <Header navPosition="right" className="reveal-from-bottom"/>
            <main className="site-content">
            <Route exact path='/' component={Home} />
            </main>
            <section className='container'>
              <Alert />
              <Switch>
                <Route exact path='/login/customer' component={LoginCustomer} />
                <Route exact path='/login/center' component={LoginCenter} />
                <Route exact path='/Register/customer' component={RegisterCustomer} />
                <Route exact path='/Register/center' component={RegisterCenter} />
                <Route exact path='/profiles' component={Profiles} />
                <Route exact path='/centers' component={Centers} /> 
                <Route exact path='/profile/:id' component={Profile} />
                <Route exact path='/center/:id' component={CenterId} />

                <PrivateRoute exact path='/dashboard' component={Dashboard} />
                <PrivateRoute exact path='/dashboard/center' component={DashboardCenter} />
                <PrivateRoute exact path='/booking/:centerId/:sport' component={Booking} />
                <PrivateRoute exact path='/confirm' component={Confirm} />

                <PrivateRoute
                  exact
                  path='/create-profile'
                  component={CreateProfile}
                />
                 <PrivateRoute
                  exact
                  path='/create-profile/center'
                  component={CreateProfileCenter}
                />
                <PrivateRoute
                  exact
                  path='/edit-profile/center'
                  component={EditsProfileCenter}
                />
                <PrivateRoute
                  exact
                  path='/edit-profile'
                  component={EditsProfile}
                />
                {/* <PrivateRoute
                  exact
                  path='/add-experience'
                  component={AddExperience}
                />
                <PrivateRoute
                  exact
                  path='/add-education'
                  component={AddEducation}
                /> */}
                <PrivateRoute exact path='/posts' component={Posts} />
                <PrivateRoute exact path='/post/:id' component={Post} />
              </Switch>
            </section>
            <Footer />
          </Fragment>
        </Router>
      </div>
    </Provider>
  );
};

export default App;
