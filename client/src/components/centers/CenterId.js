import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getCenterById } from './../../actions/profile';
import Spinner from './../layout/Spinner';
// import ProfileTop from '../profileid/ProfileTop';
// import ProfileExperience from '../profileid/ProfileExperience';
// import ProfileEducation from '../profileid/ProfileEducation';
// import ProfileGithub from '../profileid/ProfileGithub';
// import ProfileAbout from '../profileid/ProfileAbout';
const Center = ({
  getCenterById,
  profile: { centerid, loading },
  auth,
  match
}) => {
  useEffect(() => {
    getCenterById(match.params.id);
  }, [getCenterById, match.params.id]);
  const [show, setShow] = useState(false);
  console.log();
  return (
    <Fragment>
      {centerid === null || loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <br />
          <br />
          <br />
          <br />
          <Link to='/profiles' className='btn button-primary'>
            Trở Về
          </Link>
          {auth.isAuthenticated &&
            auth.loading === false &&
            auth.user._id === centerid.user._id && (
              <Link to='/edit-profile' className='btn btn-dark'>
                Sửa Thông Tin
              </Link>
            )}
          <Fragment >
            <div className="container">
              <div className="team-single">
                <div className="row">
                  <div className="col-lg-4 col-md-5 xs-margin-30px-bottom">
                    <div className="team-single-img">
                      <img src={centerid.avatar} alt="" className='avatar-size' />
                    </div>
                    <div className="bg-light-gray padding-30px-all md-padding-25px-all sm-padding-20px-all text-center">

                      <div className="margin-20px-top team-single-icons">
                        <ul className="no-margin">
                          <li><a href={centerid.social && centerid.social.facebook || ''}><i className="fab fa-facebook-f"></i></a></li>
                          <li><a href={centerid.social && centerid.social.twitter || ''}><i className="fab fa-twitter"></i></a></li>
                          <li><a href={centerid.social && centerid.social.google || ''}><i className="fab fa-google-plus-g"></i></a></li>
                          <li><a href={centerid.social && centerid.social.instagram || ''}><i className="fab fa-instagram"></i></a></li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-8 col-md-7">
                    <div className="team-single-text padding-50px-left sm-no-padding-left">

                      <h4 className="font-size38 sm-font-size32 xs-font-size30" ><strong>{centerid.centerName || ''} </strong> <i class="fas fa-check-circle fa-xs"></i> </h4>
                      <p className="no-margin-bottom">{centerid.bio || ''}</p>
                      <p className="no-margin-bottom"><i class="fas fa-map-marker-alt"></i> {centerid.from || ''}</p>
                      <p className="no-margin-bottom"><i className="fas fa-mobile-alt text-purple"></i> {centerid && centerid.user && centerid.user.phone || ''}</p>
                      <p className="no-margin-bottom"><i className="fas fa-envelope text-pink"></i>  {centerid && centerid.user && centerid.user.email || ''}</p>
                      <div className='profile-grid my-1'>
                        <div className='profile-exp p-2'>
                          <h2 class='text-primary'>Các Môn Thể Thao Của {centerid.centerName}</h2>
                          <div class='skills '>
                            {centerid && centerid.sports && centerid.sports.badminton && centerid.sports.badminton.status &&
                              <div className='p-1'>

                                <i className='fas fa-check'></i>{'badminton'}
                              </div>
                            }
                            {centerid && centerid.sports && centerid.sports.boxing && centerid.sports.boxing.status &&
                              <div className='p-1'>

                                <i className='fas fa-check'></i>{'boxing'}
                              </div>
                            }
                            {centerid && centerid.sports && centerid.sports.dance && centerid.sports.dance.status &&
                              <div className='p-1'>

                                <i className='fas fa-check'></i>{'dance'}
                              </div>
                            }
                            {centerid && centerid.sports && centerid.sports.gym && centerid.sports.gym.status &&
                              <Link to={`/booking/${match.params.id}/gym`} className='p-1' >

                                <i className='fas fa-check'></i>{'gym'}
                              </Link>
                            }
                            {centerid && centerid.sports && centerid.sports.soccer && centerid.sports.soccer.status &&
                              <div className='p-1'>

                                <i className='fas fa-check'></i>{'soccer'}
                              </div>
                            }
                            {centerid && centerid.sports && centerid.sports.swimming && centerid.sports.swimming.status &&
                              <div className='p-1'>

                                <i className='fas fa-check'></i>{'swimming'}
                              </div>
                            }
                            {centerid && centerid.sports && centerid.sports.tennis && centerid.sports.tennis.status &&
                              <div className='p-1'>

                                <i className='fas fa-check'></i>{'tennis'}
                              </div>
                            }
                            {centerid && centerid.sports && centerid.sports.yoga && centerid.sports.yoga.status &&
                              <div className='p-1'>

                                <i className='fas fa-check'></i>{'yoga'}
                              </div>
                            }
                          </div>
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
                      </div>
                    </div>
                  </div>

                  <div className="col-md-12">
                  </div>
                </div>
              </div>
            </div>
          </Fragment>
        </Fragment>
      )}
    </Fragment>
  );
};

Center.propTypes = {
  getCenterById: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});
export default connect(mapStateToProps, { getCenterById })(Center);
