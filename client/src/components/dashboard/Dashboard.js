import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile, deleteAccount } from './../../actions/profile';
import Spinner from './../layout/Spinner';
import { Link } from 'react-router-dom';
// import DashboardAction from './DashboardAction';
// import Experience from './Experience';
// import Education from './Education';
const Dashboard = ({
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
        {profile !== null ? (
          <Fragment>
            {/* <DashboardAction />
          <Experience experience={profile.experience} />
          <Education education={profile.education} /> */}
            <div className='my-2'>
              {/* <button className='btn btn-danger ' onClick={() => deleteAccount()}>
                <i className='fas fa-user-minus'></i> Delete My Account
            </button> */}
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
              <Link to='/create-profile' className='button button-primary my-1'>
                Tạo Profile Của Bạn
          </Link>
            </Fragment>
          )}
      </Fragment>
    );
};

Dashboard.propTypes = {
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
  Dashboard
);
