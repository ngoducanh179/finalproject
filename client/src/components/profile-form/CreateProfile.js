import React, { Fragment, useState, useD } from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { createProfile } from './../../actions/profile';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { storage } from "../../assets/firebase/firebase";
import { setAlert } from '../../actions/alert'


const CreateProfile = ({ createProfile, history }) => {
  const [formData, setFormData] = useState({
    fromWhere: '',
    sex: '',
    hobies: '',
    bio: '',
    twitter: '',
    facebook: '',
    linkedin: '',
    youtube: '',
    instagram: '',
    dateOfBirth: new Date(),
    workedAt: '',
    workerFrom: new Date(),
    workerTo: new Date(),
  });

  const [displaySocialInputs, toggleSocialInputs] = useState(false);
  const [displayWorkAt, toggleWorkAt] = useState(false);
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState("");
  const [progress, setProgress] = useState(0);
  const handleChange = e => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };
  const handleUpload = (e) => {
    e.preventDefault();
    if (image && image.name) {
      const uploadTask = storage.ref(`images/${image.name}`).put(image);
      uploadTask.on(
        "state_changed",
        snapshot => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setProgress(progress);
        },
        error => {
          setAlert('Không Thể Upload ảnh', 'error')
        },
        () => {
          storage
            .ref("images")
            .child(image.name)
            .getDownloadURL()
            .then(url => {
              setFormData({ ...formData, avatar: url });
              setUrl(url);
            });
        }
      );
    }
  };

  const {
    fromWhere,
    sex,
    hobies,
    bio,
    twitter,
    facebook,
    linkedin,
    youtube,
    instagram,
    dateOfBirth,
    workedAt,
    workerFrom,
    workerTo
  } = formData;

  const onChange = (e, name = null) => {
    if (name) {
      setFormData({ ...formData, [name]: e });
    } else {
      console.log(formData);
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }

  }
  const onSubmit = e => {
    e.preventDefault();
    createProfile(formData, history);
  };
  return (
    <Fragment>
      <br />
      <h1 className='text-primary'>Tạo Profile Của Bạn</h1>
      <p className='lead'>
        <i className='fas fa-user'></i>  Hãy thêm một số thông tin để làm cho hồ sơ của bạn nổi bật
      </p>
      <small>* = required field</small>
      <form className='form'>
        <div className='form-group'>
          <select name='sex' value={sex} onChange={e => onChange(e)}>
            <option value='0'>* Chọn Giới Tính</option>
            <option value='Developer'>Nam</option>
            <option value='Junior Developer'>Nữ</option>
            <option value='Senior Developer'>Khác</option>
          </select>
        </div>
        <div className='form-group'>
          <DatePicker
            selected={dateOfBirth}
            onChange={(e) => onChange(e, 'dateOfBirth')}
            name='dateOfBirth'
          />
          <small className='form-text'>
            Chọn Ngày Sinh Của Bạn
          </small>
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Đến Từ'
            name='fromWhere'
            value={fromWhere}
            onChange={e => onChange(e)}
          />
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='* Thêm Dấu Phẩy Sau Mỗi Sở Thích'
            name='hobies'
            value={hobies}
            onChange={e => onChange(e)}
          />
        </div>
        <div className='form-group'>
          <textarea
            placeholder='Thêm Một Vài Dòng Ngắn Mô Tả Về Bạn'
            name='bio'
            value={bio}
            onChange={e => onChange(e)}
          ></textarea>
        </div>

        <div className='form-group'>
          <input type="file" onChange={handleChange} />
          <button onClick={(e) => handleUpload(e)} className='btn button-primary my-1'>Tải Lên</button>
        </div>
        {
          url ? (
            <Fragment>
              <img src={url || ''} alt="firebase-image" />
            </Fragment>
          ) :
            (
              <Fragment>
                <progress value={progress} max="100" />
              </Fragment>
            )
        }


        <div className='my-2'>
          <button
            onClick={() => {
              toggleWorkAt(false)
              toggleSocialInputs(!displaySocialInputs)
            }}
            type='button'
            className='btn btn-light'
          >
            Thêm Link Mạng Xã Hội Của Bạn
          </button>
          <span>Không Bắt Buộc</span>
        </div>

        <div className='my-2'>
          <button
            onClick={() => {
              toggleWorkAt(!displayWorkAt)
              toggleSocialInputs(false)
            }}
            type='button'
            className='btn btn-light'
          >
            Thêm Nơi Bạn Đã Làm Việc
          </button>
          <span>Không Bắt Buộc</span>
        </div>

        {displaySocialInputs && (
          <Fragment>
            <div className='form-group social-input'>
              <i className='fab fa-twitter fa-2x'></i>
              <input
                type='text'
                placeholder='Twitter URL'
                name='twitter'
                value={twitter}
                onChange={e => onChange(e)}
              />
            </div>

            <div className='form-group social-input'>
              <i className='fab fa-facebook fa-2x'></i>
              <input
                type='text'
                placeholder='Facebook URL'
                name='facebook'
                value={facebook}
                onChange={e => onChange(e)}
              />
            </div>

            <div className='form-group social-input'>
              <i className='fab fa-youtube fa-2x'></i>
              <input
                type='text'
                placeholder='YouTube URL'
                name='youtube'
                value={youtube}
                onChange={e => onChange(e)}
              />
            </div>

            <div className='form-group social-input'>
              <i className='fab fa-linkedin fa-2x'></i>
              <input
                type='text'
                placeholder='Linkedin URL'
                name='linkedin'
                value={linkedin}
                onChange={e => onChange(e)}
              />
            </div>

            <div className='form-group social-input'>
              <i className='fab fa-instagram fa-2x'></i>
              <input
                type='text'
                placeholder='Instagram URL'
                name='instagram'
                value={instagram}
                onChange={e => onChange(e)}
              />
            </div>
          </Fragment>
        )}

        {displayWorkAt &&
          (
            <Fragment>
              <div className='form-group social-input'>
                <i className='fas fa-building fa-2x'></i>
                <input
                  type='text'
                  placeholder='Nơi Làm Việc'
                  name='workedAt'
                  value={workedAt}
                  onChange={e => onChange(e)}
                />
              </div>
              <div className='form-group social-input'>
                <i className='fas fas fa-clock fa-2x'></i>
                <DatePicker
                  selected={workerFrom}
                  onChange={e => onChange(e, 'workerFrom')}
                  name='workerFrom'
                />
                <small className='form-text'>
                  Ngày Bắt Đầu
          </small>
              </div>
              <div className='form-group social-input'>
                <i className='fas fas fa-clock fa-2x'></i>
                <DatePicker
                  selected={workerTo}
                  onChange={e => onChange(e, 'workerTo')}
                  name='workerTo'
                />
                <small className='form-text'>
                  Ngày Kết Thúc (Nếu Hiện Tại Chọn Ngày Hôm Nay)
          </small>
              </div>

            </Fragment>
          )
        }

        <button className='btn button-primary my-1' onClick={onSubmit}>Tiếp Theo</button>
        <Link className='button button-light' to='/dashboard'>
          Go Back
        </Link>
      </form>
    </Fragment>
  );
};

CreateProfile.propTypes = {
  createProfile: PropTypes.func.isRequired
};

export default connect(null, { createProfile })(withRouter(CreateProfile));
