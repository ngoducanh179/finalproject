import React, { Fragment, useState, useEffect } from 'react';
import { GoogleComponent } from 'react-google-location'
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import { setAlert } from './../../actions/alert';
import { registerCustomer } from './../../actions/auth';
import PropTypes from 'prop-types';
import firebase from '../../assets/firebase/firebase'

const RegisterCustomer = ({ setAlert, registerCustomer, isAuthenticated }) => {
  var pattern = new RegExp(/((09|03|07|08|05)+([0-9]{8})\b)/g);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
    location: {
      latitude: '',
      longitude: '',
      address: ''
    },
    phone: ''
  });
  const [otp, setOtp] = useState('');
  const [openModal, setOpenModal] = useState(false)
  // const API_KEY = 'e0aaf1f2dd2eb3c3335d003ddf08e90b'
  const { name, email, password, password2, location, phone } = formData;
  const onChange = e => {
    const address = e.target.value
    if (e.target.name === 'address') {
      var options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      };
      async function success(pos) {
        var crd = pos.coords;
        setFormData({
          ...formData, location: {
            latitude: crd.latitude,
            longitude: crd.longitude,
            address: address
          }
        })
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
      setAlert('Mật Khẩu Không Trùng Nhau', 'danger');
    } else if (!pattern.test(phone)) {
      setAlert('Số Điện Thoại Không Hợp Lệ', 'danger');
    } else {
      setOpenModal(true)
      // const recaptcha = new firebase.auth.RecaptchaVerifier('recaptcha');
      // firebase.auth().signInWithPhoneNumber(number, recaptcha).then(function (e) {

      //   e.confirm(code).then(function (result) {
      //     console.log(result.user);

      //     document.querySelector('label').textContent += result.user.phoneNumber + "Number verified";

      //   }).catch(function (error) {
      //     console.error(error);

      //   });

      // })
      //   .catch(function (error) {
      //     console.error(error);

      //   });
      // registerCustomer({ name, email, password, location, phone });


    }
  };
  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }

  return (
    <Fragment>
      {
        openModal ? (
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
                  type='text'
                  placeholder='Nhập Số Điện Thoại'
                  name='phone'
                  value={phone}
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
              <input type='submit' className='btn button-primary' value='Đăng Kí' />
            </form>
            <p className='my-1'>
              Already have an account? <Link to='/login'>Đăng Nhập</Link>
            </p>
          </Fragment>
        ) : (
            <div>
              <>
                {/* <Header title="Building OTP box using Hooks" /> */}

                {/* <ExternalInfo page="otpBox" /> */}

                <div className="row">
                  <div className="col text-center">
                    <br />
                    <h1 className='text-primary'>Hãy Nhập Mã OTP Đã Đc Gửi Về SĐT Của Bạn</h1>
                    <p>Enter the OTP sent to you to verify your identity</p>

                    {/* {otp.map((data, index) => {
                      return (
                        <input
                          className="otp-field"
                          type="text"
                          name="otp"
                          maxLength="1"
                          key={index}
                          value={data}
                          // onChange={e => handleChange(e.target, index)}
                          onFocus={e => e.target.select()}
                        />
                      );
                    })} */}

                    {/* <p>OTP Entered - {otp.join("")}</p> */}
                    <p>
                      <button
                        className="btn button-secondary mr-2"
                      // onClick={e => setOtp([...otp.map(v => "")])}
                      >
                        Clear
                        </button>
                      <button
                        className="btn button-primary"
                      // onClick={e =>
                      //   alert("Entered OTP is " + otp.join(""))
                      // }
                      >
                        Verify OTP
                        </button>
                    </p>
                  </div>
                </div>
              </>
            </div>
          )
      }
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
