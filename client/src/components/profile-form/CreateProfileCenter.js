import React, { Fragment, useState, useD } from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { createProfileCenter } from './../../actions/profile';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { storage } from "../../assets/firebase/firebase";
import { setAlert } from '../../actions/alert'
// import { RadioGroup, RadioButton } from 'react-radio-buttons';
import { RadioGroup, Radio } from 'react-radio-group';

const CreateProfileCenter = ({ createProfileCenter, history }) => {
    const [formData, setFormData] = useState({
        from: '',
        centerName: '',
        bio: '',
        twitter: '',
        facebook: '',
        linkedin: '',
        youtube: '',
        website: '',
        instagram: '',
        avatar: '',
        sports: {
            gym: {
                perhour: 0,
                perhalfaday: 0,
                perday: 0,
                perhalfmonth: 0,
                permonth: 0,
                status: false
            },
            yoga: {
                perhour: 0,
                perhalfaday: 0,
                perday: 0,
                perhalfmonth: 0,
                permonth: 0,
                status: false
            },
            dance: {
                perhour: 0,
                perhalfaday: 0,
                perday: 0,
                perhalfmonth: 0,
                permonth: 0,
                status: false
            },
            boxing: {
                perhour: 0,
                perhalfaday: 0,
                perday: 0,
                perhalfmonth: 0,
                permonth: 0,
                status: false
            },
            badminton: {
                perhour: 0,
                perhalfaday: 0,
                perday: 0,
                perhalfmonth: 0,
                permonth: 0,
                status: false
            },
            swimming: {
                perhour: 0,
                perhalfaday: 0,
                perday: 0,
                perhalfmonth: 0,
                permonth: 0,
                status: false
            },
        }
    });

    const [displaySocialInputs, toggleSocialInputs] = useState(false);
    const [displayGym, toggleGym] = useState(false);
    const [displayYoga, toggleYoga] = useState(false);
    const [displayDance, toggleDance] = useState(false);
    const [displayBoxing, toggleBoxing] = useState(false);
    const [displayBadminton, toggleBadminton] = useState(false);
    const [displaySwimming, toggleSwimming] = useState(false);

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
        from,
        centerName,
        bio,
        twitter,
        facebook,
        linkedin,
        youtube,
        instagram,
        website,
        sports: {
            gym,
            yoga,
            dance,
            boxing,
            badminton,
            swimming
        },
        sports
    } = formData;

    const onChange = (e, name = null, status = null) => {
        switch (name) {
            case 'gym':
                if (status) {
                    setFormData({
                        ...formData,
                        sports: {
                            ...sports,
                            [name]: {
                                ...gym,
                                'status': e
                            }
                        }
                    });
                } else {
                    setFormData({
                        ...formData,
                        sports: {
                            ...sports,
                            [name]: {
                                ...gym,
                                [e.target.name]: e.target.value
                            }
                        }
                    });
                }
                break;
            case 'yoga':
                if (status) {
                    setFormData({
                        ...formData,
                        sports: {
                            ...sports,
                            [name]: {
                                ...yoga,
                                'status': e
                            }
                        }
                    });
                } else {
                    setFormData({
                        ...formData,
                        sports: {
                            ...sports,
                            [name]: {
                                ...yoga,
                                [e.target.name]: e.target.value
                            }
                        }
                    });
                }
                break;
            case 'dance':
                if (status) {
                    setFormData({
                        ...formData,
                        sports: {
                            ...sports,
                            [name]: {
                                ...dance,
                                'status': e
                            }
                        }
                    });
                } else {
                    setFormData({
                        ...formData,
                        sports: {
                            ...sports,
                            [name]: {
                                ...dance,
                                [e.target.name]: e.target.value
                            }
                        }
                    });
                }
                break;
            case 'boxing':
                if (status) {
                    setFormData({
                        ...formData,
                        sports: {
                            ...sports,
                            [name]: {
                                ...boxing,
                                'status': e
                            }
                        }
                    });
                } else {
                    setFormData({
                        ...formData,
                        sports: {
                            ...sports,
                            [name]: {
                                ...boxing,
                                [e.target.name]: e.target.value
                            }
                        }
                    });
                }
                break;
            case 'badminton':
                if (status) {
                    setFormData({
                        ...formData,
                        sports: {
                            ...sports,
                            [name]: {
                                ...badminton,
                                'status': e
                            }
                        }
                    });
                } else {
                    setFormData({
                        ...formData,
                        sports: {
                            ...sports,
                            [name]: {
                                ...badminton,
                                [e.target.name]: e.target.value
                            }
                        }
                    });
                }
                break;
            case 'swimming':
                if (status) {
                    setFormData({
                        ...formData,
                        sports: {
                            ...sports,
                            [name]: {
                                ...swimming,
                                'status': e
                            }
                        }
                    });
                } else {
                    setFormData({
                        ...formData,
                        sports: {
                            ...sports,
                            [name]: {
                                ...swimming,
                                [e.target.name]: e.target.value
                            }
                        }
                    });
                }
                break;

            default:
                setFormData({ ...formData, [e.target.name]: e.target.value });
                break;
        }

    }
    const onSubmit = e => {
        e.preventDefault();
        createProfileCenter(formData, history);
    };
    return (
        <Fragment>
            <br />
            <h1 className='text-primary'>Tạo Profile Cho Phòng Gym Của Bạn</h1>
            <p className='lead'>
                <i className='fas fa-user'></i>  Hãy thêm một số thông tin để làm cho hồ sơ Phòng Gym của bạn nổi bật
      </p>
            <small>* = Bắt Buộc</small>
            <form className='form'>
                {/* tên */}
                <div className='form-group'>
                    <input
                        type='text'
                        placeholder='Tên Phòng Gym'
                        name='centerName'
                        value={centerName}
                        onChange={e => onChange(e)}
                    />
                </div>
                {/* phòng gym */}
                {/* website */}
                <div className='form-group'>
                    <input
                        type='text'
                        placeholder='Website Của Phòng Gym Nếu Có'
                        name='website'
                        value={website}
                        onChange={e => onChange(e)}
                    />
                </div>
                {/* phòng gym */}

                <div className='form-group'>
                    <input
                        type='text'
                        placeholder='Phòng Gym Của Bạn Ở Tình, Thành Phố'
                        name='from'
                        value={from}
                        onChange={e => onChange(e)}
                    />
                </div>
                <div className='form-group'>
                    <textarea
                        placeholder='Thêm Một Vài Dòng Ngắn Mô Tả Về Phòng Gym Của Bạn'
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
                            toggleSocialInputs(!displaySocialInputs)
                        }}
                        type='button'
                        className='btn btn-light'
                    >
                        Thêm Link Mạng Xã Hội Của Bạn
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
                {/* gym */}
                <div className='my-2'>
                    <button
                        onClick={() => {
                            toggleGym(!displayGym)
                            toggleSocialInputs(false);
                        }}
                        type='button'
                        className='btn btn-light'
                    >
                        Gyms sports
          </button>
                    <span>Không Bắt Buộc</span>
                </div>
                {displayGym &&
                    (
                        <Fragment>
                            <div className='form-group social-input'>
                                <i class="fas fa-dollar-sign"></i>
                                <input
                                    type='number'
                                    placeholder='giá 1 giờ'
                                    name='perhour'
                                    value={gym.perhour}
                                    onChange={e => onChange(e, 'gym')}
                                />
                                <small className='form-text'>
                                    Giá 1 giờ
                                                </small>
                            </div>

                            <div className='form-group social-input'>
                                <i class="fas fa-dollar-sign"></i>
                                <input
                                    type='number'
                                    placeholder='Giá 1 buổi'
                                    name='perhalfaday'
                                    value={gym.perhalfaday}
                                    onChange={e => onChange(e, 'gym')}
                                />
                                <small className='form-text'>
                                    Giá 1 buổi
                                                </small>
                            </div>

                            <div className='form-group social-input'>
                                <i class="fas fa-dollar-sign"></i>
                                <input
                                    type='number'
                                    placeholder='Giá 1 ngày'
                                    name='perday'
                                    value={gym.perday}
                                    onChange={e => onChange(e, 'gym')}
                                />
                                <small className='form-text'>
                                    Giá 1 ngày
                                                </small>
                            </div>

                            <div className='form-group social-input'>
                                <i class="fas fa-dollar-sign"></i>
                                <input
                                    type='number'
                                    placeholder='Giá nửa tháng'
                                    name='perhalfmonth'
                                    value={gym.perhalfmonth}
                                    onChange={e => onChange(e, 'gym')}
                                />
                                <small className='form-text'>
                                    Giá nửa tháng
                                                </small>
                            </div>

                            <div className='form-group social-input'>
                                <i class="fas fa-dollar-sign"></i>
                                <input
                                    type='number'
                                    placeholder='Giá 1 tháng'
                                    name='permonth'
                                    value={gym.permonth}
                                    onChange={e => onChange(e, 'gym')}
                                />
                                <small className='form-text'>
                                    Giá 1 tháng
                                                </small>
                            </div>

                            <div>
                                <small className='form-text'>
                                    Bạn có môn thể thao này không ?
                                                </small>

                                <RadioGroup selectedValue={gym.status} onChange={e => onChange(e, 'gym', 'status')}>
                                    <Radio value={true} /> Có
                                    <br />
                                    <Radio value={false} /> Không
                            </RadioGroup>
                            </div>
                        </Fragment>
                    )
                }
                {/* yoga */}
                <div className='my-2'>
                    <button
                        onClick={() => {
                            toggleYoga(!displayYoga)
                            toggleSocialInputs(false);
                        }}
                        type='button'
                        className='btn btn-light'
                    >
                        Yoga sports
          </button>
                    <span>Không Bắt Buộc</span>
                </div>
                {displayYoga &&
                    (
                        <Fragment>
                            <div className='form-group social-input'>
                                <i class="fas fa-dollar-sign"></i>
                                <input
                                    type='number'
                                    placeholder='giá 1 giờ'
                                    name='perhour'
                                    value={yoga.perhour}
                                    onChange={e => onChange(e, 'yoga')}
                                />
                                <small className='form-text'>
                                    Giá 1 giờ
                                </small>
                            </div>

                            <div className='form-group social-input'>
                                <i class="fas fa-dollar-sign"></i>
                                <input
                                    type='number'
                                    placeholder='Giá 1 buổi'
                                    name='perhalfaday'
                                    value={yoga.perhalfaday}
                                    onChange={e => onChange(e, 'yoga')}
                                />
                                <small className='form-text'>
                                    Giá 1 buổi
                                </small>
                            </div>

                            <div className='form-group social-input'>
                                <i class="fas fa-dollar-sign"></i>
                                <input
                                    type='number'
                                    placeholder='Giá 1 ngày'
                                    name='perday'
                                    value={yoga.perday}
                                    onChange={e => onChange(e, 'yoga')}
                                />
                                <small className='form-text'>
                                    Giá 1 ngày
                                </small>
                            </div>

                            <div className='form-group social-input'>
                                <i class="fas fa-dollar-sign"></i>
                                <input
                                    type='number'
                                    placeholder='Giá nửa tháng'
                                    name='perhalfmonth'
                                    value={yoga.perhalfmonth}
                                    onChange={e => onChange(e, 'yoga')}
                                />
                                <small className='form-text'>
                                    Giá nửa tháng
                                </small>
                            </div>

                            <div className='form-group social-input'>
                                <i class="fas fa-dollar-sign"></i>
                                <input
                                    type='number'
                                    placeholder='Giá 1 tháng'
                                    name='permonth'
                                    value={yoga.permonth}
                                    onChange={e => onChange(e, 'yoga')}
                                />
                                <small className='form-text'>
                                    Giá 1 tháng
                                </small>
                            </div>

                            <div>
                                <small className='form-text'>
                                    Bạn có môn thể thao này không ?
                                </small>
                                <RadioGroup selectedValue={yoga.status} onChange={e => onChange(e, 'yoga', 'status')}>
                                    <Radio value={true} /> Có
                                    <br />
                                    <Radio value={false} /> Không
                            </RadioGroup>
                            </div>
                        </Fragment>
                    )
                }
                {/* dance */}
                <div className='my-2'>
                    <button
                        onClick={() => {
                            toggleDance(!displayDance)
                            toggleSocialInputs(false);
                        }}
                        type='button'
                        className='btn btn-light'
                    >
                        dance sports
          </button>
                    <span>Không Bắt Buộc</span>
                </div>
                {displayDance &&
                    (
                        <Fragment>
                            <div className='form-group social-input'>
                                <i class="fas fa-dollar-sign"></i>
                                <input
                                    type='number'
                                    placeholder='giá 1 giờ'
                                    name='perhour'
                                    value={dance.perhour}
                                    onChange={e => onChange(e, 'dance')}
                                />
                                <small className='form-text'>
                                    Giá 1 giờ
                                </small>
                            </div>

                            <div className='form-group social-input'>
                                <i class="fas fa-dollar-sign"></i>
                                <input
                                    type='number'
                                    placeholder='Giá 1 buổi'
                                    name='perhalfaday'
                                    value={dance.perhalfaday}
                                    onChange={e => onChange(e, 'dance')}
                                />
                                <small className='form-text'>
                                    Giá 1 buổi
                                </small>
                            </div>

                            <div className='form-group social-input'>
                                <i class="fas fa-dollar-sign"></i>
                                <input
                                    type='number'
                                    placeholder='Giá 1 ngày'
                                    name='perday'
                                    value={dance.perday}
                                    onChange={e => onChange(e, 'dance')}
                                />
                                <small className='form-text'>
                                    Giá 1 ngày
                                </small>
                            </div>

                            <div className='form-group social-input'>
                                <i class="fas fa-dollar-sign"></i>
                                <input
                                    type='number'
                                    placeholder='Giá nửa tháng'
                                    name='perhalfmonth'
                                    value={dance.perhalfmonth}
                                    onChange={e => onChange(e, 'dance')}
                                />
                                <small className='form-text'>
                                    Giá nửa tháng
                                </small>
                            </div>

                            <div className='form-group social-input'>
                                <i class="fas fa-dollar-sign"></i>
                                <input
                                    type='number'
                                    placeholder='Giá 1 tháng'
                                    name='permonth'
                                    value={dance.permonth}
                                    onChange={e => onChange(e, 'dance')}
                                />
                                <small className='form-text'>
                                    Giá 1 tháng
                                </small>
                            </div>

                            <div>
                                <small className='form-text'>
                                    Bạn có môn thể thao này không ?
                                </small>
                                <RadioGroup selectedValue={dance.status} onChange={e => onChange(e, 'dance', 'status')}>
                                    <Radio value={true} /> Có
                                    <br />
                                    <Radio value={false} /> Không
                            </RadioGroup>
                            </div>
                        </Fragment>
                    )
                }
                {/* boxing */}
                <div className='my-2'>
                    <button
                        onClick={() => {
                            toggleBoxing(!displayBoxing)
                            toggleSocialInputs(false);
                        }}
                        type='button'
                        className='btn btn-light'
                    >
                        boxing sports
          </button>
                    <span>Không Bắt Buộc</span>
                </div>
                {displayBoxing &&
                    (
                        <Fragment>
                            <div className='form-group social-input'>
                                <i class="fas fa-dollar-sign"></i>
                                <input
                                    type='number'
                                    placeholder='giá 1 giờ'
                                    name='perhour'
                                    value={boxing.perhour}
                                    onChange={e => onChange(e, 'boxing')}
                                />
                                <small className='form-text'>
                                    Giá 1 giờ
                                </small>
                            </div>

                            <div className='form-group social-input'>
                                <i class="fas fa-dollar-sign"></i>
                                <input
                                    type='number'
                                    placeholder='Giá 1 buổi'
                                    name='perhalfaday'
                                    value={boxing.perhalfaday}
                                    onChange={e => onChange(e, 'boxing')}
                                />
                                <small className='form-text'>
                                    Giá 1 buổi
                                </small>
                            </div>

                            <div className='form-group social-input'>
                                <i class="fas fa-dollar-sign"></i>
                                <input
                                    type='number'
                                    placeholder='Giá 1 ngày'
                                    name='perday'
                                    value={boxing.perday}
                                    onChange={e => onChange(e, 'boxing')}
                                />
                                <small className='form-text'>
                                    Giá 1 ngày
                                </small>
                            </div>

                            <div className='form-group social-input'>
                                <i class="fas fa-dollar-sign"></i>
                                <input
                                    type='number'
                                    placeholder='Giá nửa tháng'
                                    name='perhalfmonth'
                                    value={boxing.perhalfmonth}
                                    onChange={e => onChange(e, 'boxing')}
                                />
                                <small className='form-text'>
                                    Giá nửa tháng
                                </small>
                            </div>

                            <div className='form-group social-input'>
                                <i class="fas fa-dollar-sign"></i>
                                <input
                                    type='number'
                                    placeholder='Giá 1 tháng'
                                    name='permonth'
                                    value={boxing.permonth}
                                    onChange={e => onChange(e, 'boxing')}
                                />
                                <small className='form-text'>
                                    Giá 1 tháng
                                </small>
                            </div>

                            <div>
                                <small className='form-text'>
                                    Bạn có môn thể thao này không ?
                                </small>
                                <RadioGroup selectedValue={boxing.status} onChange={e => onChange(e, 'boxing', 'status')}>
                                    <Radio value={true} /> Có
                                    <br />
                                    <Radio value={false} /> Không
                            </RadioGroup>
                            </div>
                        </Fragment>
                    )
                }
                {/* badminton */}
                <div className='my-2'>
                    <button
                        onClick={() => {
                            toggleBadminton(!displayBadminton)
                            toggleSocialInputs(false);
                        }}
                        type='button'
                        className='btn btn-light'
                    >
                        badminton sports
          </button>
                    <span>Không Bắt Buộc</span>
                </div>
                {displayBadminton &&
                    (
                        <Fragment>
                            <div className='form-group social-input'>
                                <i class="fas fa-dollar-sign"></i>
                                <input
                                    type='number'
                                    placeholder='giá 1 giờ'
                                    name='perhour'
                                    value={badminton.perhour}
                                    onChange={e => onChange(e, 'badminton')}
                                />
                                <small className='form-text'>
                                    Giá 1 giờ
                                </small>
                            </div>

                            <div className='form-group social-input'>
                                <i class="fas fa-dollar-sign"></i>
                                <input
                                    type='number'
                                    placeholder='Giá 1 buổi'
                                    name='perhalfaday'
                                    value={badminton.perhalfaday}
                                    onChange={e => onChange(e, 'badminton')}
                                />
                                <small className='form-text'>
                                    Giá 1 buổi
                                </small>
                            </div>

                            <div className='form-group social-input'>
                                <i class="fas fa-dollar-sign"></i>
                                <input
                                    type='number'
                                    placeholder='Giá 1 ngày'
                                    name='perday'
                                    value={badminton.perday}
                                    onChange={e => onChange(e, 'badminton')}
                                />
                                <small className='form-text'>
                                    Giá 1 ngày
                                </small>
                            </div>

                            <div className='form-group social-input'>
                                <i class="fas fa-dollar-sign"></i>
                                <input
                                    type='number'
                                    placeholder='Giá nửa tháng'
                                    name='perhalfmonth'
                                    value={badminton.perhalfmonth}
                                    onChange={e => onChange(e, 'badminton')}
                                />
                                <small className='form-text'>
                                    Giá nửa tháng
                                </small>
                            </div>

                            <div className='form-group social-input'>
                                <i class="fas fa-dollar-sign"></i>
                                <input
                                    type='number'
                                    placeholder='Giá 1 tháng'
                                    name='permonth'
                                    value={badminton.permonth}
                                    onChange={e => onChange(e, 'badminton')}
                                />
                                <small className='form-text'>
                                    Giá 1 tháng
                                </small>
                            </div>

                            <div>
                                <small className='form-text'>
                                    Bạn có môn thể thao này không ?
                                </small>
                                <RadioGroup selectedValue={badminton.status} onChange={e => onChange(e, 'badminton', 'status')}>
                                    <Radio value={true} /> Có
                                    <br />
                                    <Radio value={false} /> Không
                            </RadioGroup>
                            </div>
                        </Fragment>
                    )
                }
                {/* swimming */}
                <div className='my-2'>
                    <button
                        onClick={() => {
                            toggleSwimming(!displaySwimming)
                            toggleSocialInputs(false);
                        }}
                        type='button'
                        className='btn btn-light'
                    >
                        swimming sports
          </button>
                    <span>Không Bắt Buộc</span>
                </div>
                {displaySwimming &&
                    (
                        <Fragment>
                            <div className='form-group social-input'>
                                <i class="fas fa-dollar-sign"></i>
                                <input
                                    type='number'
                                    placeholder='giá 1 giờ'
                                    name='perhour'
                                    value={swimming.perhour}
                                    onChange={e => onChange(e, 'swimming')}
                                />
                                <small className='form-text'>
                                    Giá 1 giờ
                                </small>
                            </div>

                            <div className='form-group social-input'>
                                <i class="fas fa-dollar-sign"></i>
                                <input
                                    type='number'
                                    placeholder='Giá 1 buổi'
                                    name='perhalfaday'
                                    value={swimming.perhalfaday}
                                    onChange={e => onChange(e, 'swimming')}
                                />
                                <small className='form-text'>
                                    Giá 1 buổi
                                </small>
                            </div>

                            <div className='form-group social-input'>
                                <i class="fas fa-dollar-sign"></i>
                                <input
                                    type='number'
                                    placeholder='Giá 1 ngày'
                                    name='perday'
                                    value={swimming.perday}
                                    onChange={e => onChange(e, 'swimming')}
                                />
                                <small className='form-text'>
                                    Giá 1 ngày
                                </small>
                            </div>

                            <div className='form-group social-input'>
                                <i class="fas fa-dollar-sign"></i>
                                <input
                                    type='number'
                                    placeholder='Giá nửa tháng'
                                    name='perhalfmonth'
                                    value={swimming.perhalfmonth}
                                    onChange={e => onChange(e, 'swimming')}
                                />
                                <small className='form-text'>
                                    Giá nửa tháng
                                </small>
                            </div>

                            <div className='form-group social-input'>
                                <i class="fas fa-dollar-sign"></i>
                                <input
                                    type='number'
                                    placeholder='Giá 1 tháng'
                                    name='permonth'
                                    value={swimming.permonth}
                                    onChange={e => onChange(e, 'swimming')}
                                />
                                <small className='form-text'>
                                    Giá 1 tháng
                                </small>
                            </div>

                            <div>
                                <small className='form-text'>
                                    Bạn có môn thể thao này không ?
                                </small>
                                <RadioGroup selectedValue={swimming.status} onChange={e => onChange(e, 'swimming', 'status')}>
                                    <Radio value={true} /> Có
                                    <br />
                                    <Radio value={false} /> Không
                            </RadioGroup>
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

CreateProfileCenter.propTypes = {
    createProfileCenter: PropTypes.func.isRequired
};

export default connect(null, { createProfileCenter })(withRouter(CreateProfileCenter));
