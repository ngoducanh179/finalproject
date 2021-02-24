import React, { Fragment, useState, useEffect } from 'react';
import { GoogleComponent } from 'react-google-location'
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import { setAlert } from './../../actions/alert';
import { registerCustomer } from './../../actions/auth';
import PropTypes from 'prop-types';
// import Geocode from "react-geocode";

const RegisterCustomer = ({ setAlert, registerCustomer, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
    location: {
      latitude: '',
      longitude: '',
      address: ''
    }
  });
  // const API_KEY = 'e0aaf1f2dd2eb3c3335d003ddf08e90b'
  const { name, email, password, password2, location } = formData;
  const onChange = e => {
    const address = e.target.value
    if(e.target.name === 'address') {
      var options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      };
      async function success(pos) {
        var crd = pos.coords;
        setFormData({...formData, location: {
          latitude: crd.latitude,
          longitude: crd.longitude,
          address: address
        }})
      }
  
      function error(err) {
        console.warn(`ERROR(${err.code}): ${err.message}`);
      }
      navigator.geolocation.getCurrentPosition(success, error, options);
    } else {
    setFormData({ ...formData, [e.target.name]: e.target.value });

    }
  };
  const onSubmit = async e => {
    e.preventDefault();
    if (password !== password2) {
      setAlert('Password do not match', 'danger');
    } else {
      registerCustomer({ name, email, password, location });
    }
  };
  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }
  return (
    <Fragment>
      <br />
      <h1 className='text-primary'>Tạo Tài Khoản Cùng TomFit</h1>
      <p className='lead'>
        <i className='fas fa-user'></i> Tạo Tài Khoản Của Bạn
      </p>
      <form className='form' onSubmit={e => onSubmit(e)}>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Tên Của Bạn'
            name='name'
            value={name}
            onChange={e => onChange(e)}
          />
        </div>
        <div className='form-group'>
          <input
            type='email'
            placeholder='Địa Chỉ email'
            name='email'
            value={email}
            onChange={e => onChange(e)}
          />
        </div>
        <div className='form-group'>
          <input
            type='password'
            placeholder='Mật Khẩu'
            name='password'
            minLength='6'
            value={password}
            onChange={e => onChange(e)}
          />
        </div>
        <div className='form-group'>
          <input
            type='password'
            placeholder='Xác Nhận Mật Khẩu'
            name='password2'
            minLength='6'
            value={password2}
            onChange={e => onChange(e)}
          />
        </div>
        <div>
          <input
            type='text'
            placeholder='nhập địa chỉ'
            name='address'
            value={location.address}
            onChange={e => onChange(e)}
         />
        </div>
        <br />
        <input type='submit' className='button button-primary button-wide-mobile' value='Đăng Kí' />
      </form>
      <p className='my-1'>
        Already have an account? <Link to='/login'>Đăng Nhập</Link>
      </p>
    </Fragment>
  );
};

RegisterCustomer.propTypes = {
  setAlert: PropTypes.func.isRequired,
  registerCustomer: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};
const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { setAlert, registerCustomer })(RegisterCustomer);
