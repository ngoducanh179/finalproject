import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile, deleteAccount } from './../../actions/profile';
import Spinner from './../layout/Spinner';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { statusCustomer } from '../../constans/constans';
import ListSport from '../../componentss/Center/ListSport'
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
  // let result;
  // if(profile) {
  //  result = Object.keys(profile.sports).map((key) => profile.sports[key]);
  // console.log(result);
  // }
  console.log(profile);
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
                    <img src={profile.avatar} alt="" className='avatar-size' />
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

                    <h4 className="font-size38 sm-font-size32 xs-font-size30" ><strong>{profile.centerName || ''} </strong> <i class="fas fa-check-circle fa-xs"></i> </h4>
                    <p className="no-margin-bottom">{profile.bio || ''}</p>
                    <p className="no-margin-bottom"><i class="fas fa-map-marker-alt"></i> {profile.from || ''}</p>
                    <p className="no-margin-bottom"><i className="fas fa-mobile-alt text-purple"></i> {user && user.phone || ''}</p>
                    <p className="no-margin-bottom"><i className="fas fa-envelope text-pink"></i>  {user && user.email || ''}</p>

                    <div className="contact-info-section margin-40px-tb">
                      <ul className="list-style9 no-margin">
                        <li>
                          <div className="row">
                            <div className="col-md-5 col-5">
                              <i className="fas fa-envelope text-yellow"></i>
                              <strong className="margin-10px-left xs-margin-four-left text-yellow"> Worked At:</strong>
                            </div>
                            <div className="col-md-7 col-7">
                              <p>{profile && profile.sports && profile.sports.gym.perhalfaday}</p>
                              {/* {result && result.map((e, index) => {
                                  return <p key={index}>{e.permonth || ''}</p>
                                })} */}
                            </div>
                          </div>
                        </li>
                      </ul>
                    </div>
                    <div className='profile-grid my-1'>
                      <ListSport profile={profile} />
                      <div className='profile-exp p-2'>
                        <h2 className='text-primary'>Đánh Giá</h2>
                        {/* {profileid.workedAt.length ? (
                          <Fragment>
                            {profileid.workedAt.map((work, index) => (
                              <ProfileExperience
                                key={index}
                                work={work}
                              />
                            ))}
                          </Fragment>
                        ) : (
                          <h4>Không Tìm Thấy ...</h4>
                        )} */}
                      </div>

                      <div className='profile-edu p-2'>
                        <h2 className='text-primary'>Lịch Sử Tập Luyện</h2>
                        {/* {profileid.history.length ? (
                          <Fragment>
                            {profileid.history.map((his, index) => (
                              <ProfileEducation
                                key={index}
                                his={his}
                              />
                            ))}
                          </Fragment>
                        ) : (
                          <h4>Không Tìm Thấy ...</h4>
                        )} */}
                      </div>
                      {/* {profileid.githubusername && (
              <ProfileGithub username={profileid.githubusername} />
            )} */}
                    </div>
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
