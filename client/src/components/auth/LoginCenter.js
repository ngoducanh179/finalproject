import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
// import axios from 'axios';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { role } from '../../constans/constans'

import { login } from '../../actions/auth';
// import auth from '../../reducers/auth';
const LoginCenter = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const { email, password } = formData;

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const onSubmit = async e => {
    e.preventDefault();
    login({ email, password, role: role.CENTER });
  };

  //Redirect if logged in
  if (isAuthenticated) {
    return <Redirect to='/dashboard/center' />;
  }

  return (
    <Fragment>
      <br/> 
      <h1 className='text-primary'>Chào Mừng Chủ Phòng Gym Đến Với TomFit</h1>
      <p className='lead'>
        <i className='fas fa-user'></i> Nhập Tài Khoản Của Bạn
      </p>
      <form className='form' onSubmit={e => onSubmit(e)}>
        <div className='form-group'>
          <input
            type='email'
            placeholder='Địa chỉ Email'
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
        <input type='submit' className='button button-primary' value='Đăng Nhập' />
      </form>
      <p className='my-1'>
        Don't have an account? <Link to='/Register/center'>Đăng Kí</Link>
      </p>
    </Fragment>
  );
};

LoginCenter.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { login })(LoginCenter);
