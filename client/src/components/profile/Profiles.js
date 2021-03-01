import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import ProfileItem from './ProfileItem';
import { getProfiles } from './../../actions/profile';
import './style.css';
import Pagination from "react-js-pagination";


const Profiles = ({ getProfiles, profile: { profiles, loading } }) => {
  const [search, setSearch] = useState('');
  useEffect(() => {
    getProfiles(search);
  }, [getProfiles, search]);
  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
          <Fragment>
            <br />
            <br />
            <h1 className='text-primary'>TomFiter</h1>
            <p className='lead'>
              <form className='form1'>
                <input className='input1' type="search" value={search} onChange={e => setSearch(e.target.value)} />
                <i class="fa fa-search" className='fa1'></i>
              </form>
            </p>
            <div className='profiles'>
              {profiles.length > 0 ? (
                profiles.map((profile, index) => (
                  index < 11 &&
                  <ProfileItem key={profile._id} profile={profile} />
                ))
              ) : (
                  <h4>Không Tìm Thấy Trang Cá Nhân...</h4>
                )}
            </div>
            
          </Fragment>
        )}
        
    </Fragment>
    
    
  );
};

Profiles.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(mapStateToProps, { getProfiles })(Profiles);
