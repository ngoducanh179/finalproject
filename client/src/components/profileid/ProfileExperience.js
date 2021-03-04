import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
const ProfileExperience = ({
  work: { where, from, to }
}) => {
  return (
    <Fragment>
      { where && 
        <div>
        <h3 className='text-primary'>{where}</h3>
        <p>
          <Moment format='YYYY/MM/DD'>{from}</Moment> -{' '}
          {!to ? 'Now' : <Moment format='YYYY/MM/DD'>{to}</Moment>}
        </p>
      </div>
      }
    </Fragment>
    
  );
};

ProfileExperience.propTypes = {
  experience: PropTypes.array.isRequired
};

export default ProfileExperience;
