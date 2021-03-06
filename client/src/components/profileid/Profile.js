import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getProfilesById } from './../../actions/profile';
import Spinner from './../layout/Spinner';
import ProfileTop from '../profileid/ProfileTop';
import ProfileExperience from '../profileid/ProfileExperience';
import ProfileEducation from '../profileid/ProfileEducation';
import ProfileGithub from '../profileid/ProfileGithub';
import ProfileAbout from '../profileid/ProfileAbout';
const Profile = ({
  getProfilesById,
  profile: { profileid, loading },
  auth,
  match
}) => {
  useEffect(() => {
    getProfilesById(match.params.id);
  }, [getProfilesById, match.params.id]);
  return (
    <Fragment>
      {profileid === null || loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <br/>
          <br/>
          <br/>
          <br/>

          <Link to='/profiles' className='btn button-primary'>
            Trở Về
          </Link>
          {auth.isAuthenticated &&
            auth.loading === false &&
            auth.user._id === profileid.user._id && (
              <Link to='/edit-profile' className='btn btn-dark'>
                Sửa Thông Tin
              </Link>
            )}
          <div className='profile-grid my-1'>
            <ProfileTop profileid={profileid} />
            <ProfileAbout profileid={profileid} />
            <div className='profile-exp p-2'>
              <h2 className='text-primary'>Đã Từng Làm Việc Tại</h2>
              {profileid.workedAt.length ? (
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
              )}
            </div>

            <div className='profile-edu p-2'>
              <h2 className='text-primary'>Lịch Sử Tập Luyện</h2>
              {profileid.history.length ? (
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
              )}
            </div>
            {/* {profileid.githubusername && (
              <ProfileGithub username={profileid.githubusername} />
            )} */}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

Profile.propTypes = {
  getProfilesById: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});
export default connect(mapStateToProps, { getProfilesById })(Profile);
