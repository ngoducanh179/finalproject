import React, { Fragment, useState, useEffect } from 'react';
// import { GoogleComponent } from 'react-google-location'
import { Link, Redirect, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
// import axios from 'axios';
import { setAlert } from './../../actions/alert';
import { registerCustomer } from './../../actions/auth';
import PropTypes from 'prop-types';
import firebase from "../../assets/firebase/firebase";
import 'firebase/auth';
import { role } from '../../constans/constans'

const RegisterCustomer = ({ setAlert, registerCustomer, isAuthenticated, auth }) => {
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
    phone: '',
  });
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [openModal, setOpenModal] = useState(false);
  const [confirmSms, setConfirmSms] = useState(null);

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

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return false;

    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

    //Focus next input
    if (element.nextSibling) {
      element.nextSibling.focus();
    }
  };
  const confirmOTP = async code => {
    try {
      const confirmInfo = await confirmSms.confirm(code);
      console.log(222,confirmInfo);
      if(confirmInfo && confirmInfo.user && confirmInfo.user.phoneNumber) {
           registerCustomer({ name, email, password, location, phone, confirm: true });
      } else {
        setAlert('Không Thể Xác Nhận Số Điện Thoại', 'error')
      }
    } catch (error) {
      setAlert('Không Thể Xác Nhận Số Điện Thoại', 'error')
    }
  }
  const onSubmit = async e => {
    e.preventDefault();
    if (password !== password2) {
      setAlert('Mật Khẩu Không Trùng Nhau', 'danger');
    } else if (!pattern.test(phone)) {
      setAlert('Số Điện Thoại Không Hợp Lệ', 'danger');
    } else {
      let phoneplus = phone.substring(1);
      phoneplus = '+84' + phoneplus;
      const recaptcha = new firebase.auth.RecaptchaVerifier('recaptcha');
      if (recaptcha) {
        const confirmation = await new firebase.auth().signInWithPhoneNumber(phoneplus, recaptcha)
        setConfirmSms(confirmation)
        // registerCustomer({ name, email, password, location, phone, confirm: true });
        if (confirmation) setOpenModal(true)
      }
    }
  };
  if (isAuthenticated && auth.role === role.CUSTOMER) {
    return <Redirect to='/dashboard' />;
  } else if (isAuthenticated && auth.role === role.CENTER) {
    return <Redirect to='/dashboard/center' />;
  }

  return (
    <Fragment>
      {
        !openModal ? (
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
              <div id="recaptcha"></div>
              <input type='submit' className='btn button-primary' value='Đăng Kí' />
            </form>
            <p className='my-1'>
              Already have an account? <Link to='/login'>Đăng Nhập</Link>
            </p>
          </Fragment>
        ) : (
            <div>
              <>
                <div className="row">
                  <div className="col text-center">
                    <br />
                    <h1 className='text-primary'>Hãy Nhập Mã OTP Đã Được Gửi Về SĐT Của Bạn</h1>
                    <p>Enter the OTP sent to you to verify your identity</p>

                    {otp.map((data, index) => {
                      return (
                        <input
                          className="otp-field"
                          type="text"
                          name="otp"
                          maxLength="1"
                          key={index}
                          value={data}
                          onChange={e => handleChange(e.target, index)}
                          onFocus={e => e.target.select()}
                        />
                      );
                    })}

                    <p>OTP Entered - {otp.join("")}</p>
                    <br />
                    <br />

                    <p>
                      <button
                        className="btn button-secondary mr-2"
                        onClick={e => setOtp([...otp.map(v => "")])}
                      >
                        Clear
                        </button>
                      <button
                        className="btn button-primary"
                        onClick={e =>
                          confirmOTP(otp.join(""))
                        }
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
// otp.join("")
RegisterCustomer.propTypes = {
  setAlert: PropTypes.func.isRequired,
  registerCustomer: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};
const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  auth: state.auth
});

export default connect(mapStateToProps, { setAlert, registerCustomer })(RegisterCustomer);
