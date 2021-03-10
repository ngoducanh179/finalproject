import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile, deleteAccount } from './../../actions/profile';
import Spinner from './../layout/Spinner';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { statusCustomer } from '../../constans/constans'
const DashboardCenter = ({
  getCurrentProfile,
  deleteAccount,
  auth: { user },
  profile: { profile, loading }
}) => {
  useEffect(() => {
    getCurrentProfile();
    // eslint-disable-next-line
  }, [getCurrentProfile]);
  return loading && profile === null ? (
    <Spinner />
  ) : (
      <Fragment>
        {profile && profile.status === statusCustomer.FROFILED ? (
          <Fragment >
            <br />
            <br />
            <br />
            <br />
            <br />
            <div className="container">
              <div className="team-single">
                <div className="row">
                  <div className="col-lg-4 col-md-5 xs-margin-30px-bottom">
                    <div className="team-single-img">
                      <img src={profile.avatar} alt="" />
                    </div>
                    <div className="bg-light-gray padding-30px-all md-padding-25px-all sm-padding-20px-all text-center">

                      <div className="margin-20px-top team-single-icons">
                        <ul className="no-margin">
                          <li><a href={profile.social && profile.social.facebook || ''}><i className="fab fa-facebook-f"></i></a></li>
                          <li><a href={profile.social && profile.social.twitter || ''}><i className="fab fa-twitter"></i></a></li>
                          <li><a href={profile.social && profile.social.google || ''}><i className="fab fa-google-plus-g"></i></a></li>
                          <li><a href={profile.social && profile.social.instagram || ''}><i className="fab fa-instagram"></i></a></li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-8 col-md-7">
                    <div className="team-single-text padding-50px-left sm-no-padding-left">
                      <h4 className="font-size38 sm-font-size32 xs-font-size30">{profile.user.name || ''}</h4>
                      <p className="no-margin-bottom">{profile.bio || ''}</p>
                      <div className="contact-info-section margin-40px-tb">
                        <ul className="list-style9 no-margin">
                          <li>
                            <div className="row">
                              <div className="col-md-5 col-5">
                                <i className="fas fa-genderless text-orange"></i>
                                <strong className="margin-10px-left text-orange"> Sex:</strong>
                              </div>
                              <div className="col-md-7 col-7">
                                <p>{profile.sex || ''}</p>
                              </div>
                            </div>

                          </li>
                          <li>

                            <div className="row">
                              <div className="col-md-5 col-5">
                                <i className="fas fa-birthday-cake text-yellow"></i>
                                <strong className="margin-10px-left text-yellow"> Date Of Birth:</strong>
                              </div>
                              <div className="col-md-7 col-7">
                                <p>{profile.dateOfBirth && moment(profile.dateOfBirth).format('DD-MM-YYYY')}</p>
                              </div>
                            </div>

                          </li>
                          <li>

                            <div className="row">
                              <div className="col-md-5 col-5">
                                <i className="fa fa-list text-lightred"></i>
                                <strong className="margin-10px-left text-lightred"> hobies:</strong>
                              </div>
                              <div className="col-md-7 col-7">
                                {
                                  profile.hobies && profile.hobies.map((e, index) => {
                                    return <p key={index}>{e}</p>

                                  })
                                }
                              </div>
                            </div>

                          </li>
                          <li>

                            <div className="row">
                              <div className="col-md-5 col-5">
                                <i className="fas fa-map-marker-alt text-green"></i>
                                <strong className="margin-10px-left text-green"> From:</strong>
                              </div>
                              <div className="col-md-7 col-7">
                                <p>{profile.fromWhere || ''}</p>
                              </div>
                            </div>

                          </li>
                          <li>

                            <div className="row">
                              <div className="col-md-5 col-5">
                                <i className="fas fa-mobile-alt text-purple"></i>
                                <strong className="margin-10px-left xs-margin-four-left text-purple"> Phone:</strong>
                              </div>
                              <div className="col-md-7 col-7">
                                <p>{profile.user && profile.user.phone || ''}</p>
                              </div>
                            </div>

                          </li>
                          <li>
                            <div className="row">
                              <div className="col-md-5 col-5">
                                <i className="fas fa-envelope text-pink"></i>
                                <strong className="margin-10px-left xs-margin-four-left text-pink"> Email:</strong>
                              </div>
                              <div className="col-md-7 col-7">
                                <p><a href="javascript:void(0)">{profile.user && profile.user.email || ''}</a></p>
                              </div>
                            </div>
                          </li>
                          <li>
                            <div className="row">
                              <div className="col-md-5 col-5">
                                <i className="fas fa-envelope text-yellow"></i>
                                <strong className="margin-10px-left xs-margin-four-left text-yellow"> Worked At:</strong>
                              </div>
                              <div className="col-md-7 col-7">
                                {profile.workedAt && profile.workedAt.map((e, index) => {
                                  return <p key={index}>{e.where || ''}</p>
                                })}
                              </div>
                            </div>
                          </li>
                        </ul>
                      </div>

                      {/* <h5 className="font-size24 sm-font-size22 xs-font-size20">Professional Skills</h5> */}

                      {/* <div className="sm-no-margin">
                        <div className="progress-text">
                          <div className="row">
                            <div className="col-7">Positive Behaviors</div>
                            <div className="col-5 text-right">40%</div>
                          </div>
                        </div>
                        <div className="custom-progress progress">
                          <div role="progressbar" aria-valuenow="70" aria-valuemin="0" aria-valuemax="100" style={{ width: '40%' }} className="animated custom-bar progress-bar slideInLeft bg-sky"></div>
                        </div>
                        <div className="progress-text">
                          <div className="row">
                            <div className="col-7">Teamworking Abilities</div>
                            <div className="col-5 text-right">50%</div>
                          </div>
                        </div>
                        <div className="custom-progress progress">
                          <div role="progressbar" aria-valuenow="70" aria-valuemin="0" aria-valuemax="100" style={{ width: '50%' }} className="animated custom-bar progress-bar slideInLeft bg-orange"></div>
                        </div>
                        <div className="progress-text">
                          <div className="row">
                            <div className="col-7">Time Management </div>
                            <div className="col-5 text-right">60%</div>
                          </div>
                        </div>
                        <div className="custom-progress progress">
                          <div role="progressbar" aria-valuenow="70" aria-valuemin="0" aria-valuemax="100" style={{ width: '60%' }} className="animated custom-bar progress-bar slideInLeft bg-green"></div>
                        </div>
                        <div className="progress-text">
                          <div className="row">
                            <div className="col-7">Excellent Communication</div>
                            <div className="col-5 text-right">80%</div>
                          </div>
                        </div>
                        <div className="custom-progress progress">
                          <div role="progressbar" aria-valuenow="70" aria-valuemin="0" aria-valuemax="100" style={{ width: '80%' }} className="animated custom-bar progress-bar slideInLeft bg-yellow"></div>
                        </div>
                      </div> */}

                    </div>
                  </div>

                  <div className="col-md-12">
                  </div>
                </div>
              </div>
            </div>
          </Fragment>
        ) : (
            <Fragment>
              <br />
              <h1 className='text-primary'>Chào Mừng Bạn Đến Với TomFit</h1>
              <p className='lead text-white'>
                <i className='fas fa-user'></i> Chào Mừng {user && user.name}
              </p>
              <p>Bạn Chưa Setup Profile Của Bạn, Hãy Thêm Một Số Thông Tin Nhé</p>
              <Link to='/create-profile/center' className='button button-primary my-1'>
                Tạo Profile Của Bạn
          </Link>
            </Fragment>
          )}
      </Fragment>
    );
};

DashboardCenter.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  deleteAccount: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(
    DashboardCenter
);
