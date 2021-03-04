import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const ProfileAbout = ({
  profileid: {
    bio,
    user: { name },
    hobies
  }
}) => {
  return (
    <div class='profile-about p-2'>
      {bio && (
        <Fragment>
          <h2 class='text-primary'>Giới Thiệu Của {name}</h2>
          <p>{bio}</p>
          <div class='line'></div>
        </Fragment>
      )}

      <h2 class='text-primary'>Sở Thích</h2>
      <div class='skills'>
        {hobies.map((hoby, index) => (
          <div key={index} className='p-1'>
            <i className='fas fa-check'></i> {hoby}
          </div>
        ))}
      </div>
    </div>
  );
};

ProfileAbout.propTypes = {
  profileid: PropTypes.object.isRequired
};

export default ProfileAbout;
