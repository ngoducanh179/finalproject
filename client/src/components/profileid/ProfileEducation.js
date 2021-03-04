import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
const ProfileEducation = ({
  his: { kindOfSport, from, to, status }
}) => {
  return (
    <Fragment>
      { kindOfSport &&
        <div>
        <h3 className='text-dark'>{kindOfSport}</h3>
        <p>
          <Moment format='YYYY/MM/DD'>{from}</Moment> -{' '}
          {!to ? 'Now' : <Moment format='YYYY/MM/DD'>{to}</Moment>}
        </p>
        <p>
          <strong>Trạng Thái: </strong> {status}
        </p>
      </div>
      }
    </Fragment>
  );
};

ProfileEducation.propTypes = {
  education: PropTypes.array.isRequired
};

export default ProfileEducation;
