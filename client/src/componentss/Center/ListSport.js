import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const ListSport = ({
  profile: {
    bio,
    centerName,
    sports
  }
}) => {
  return (
    <div class='profile-about p-2'>
      {bio && (
        <Fragment>
          <h2 class='text-primary'>Giới Thiệu Về {centerName}</h2>
          <p>{bio}</p>
          <div class='line'></div>
        </Fragment>
      )}

      <h2 class='text-primary'>Các Môn Thể Thao Của {centerName}</h2>
      <div class='skills'>
        {sports && sports.badminton && sports.badminton.status &&
          <div className='p-1'>

            <i className='fas fa-check'></i>{'badminton'}
          </div>
        }
        {sports && sports.boxing && sports.boxing.status &&
          <div className='p-1'>

            <i className='fas fa-check'></i>{'boxing'}
          </div>
        }
        {sports && sports.dance && sports.dance.status &&
          <div className='p-1'>

            <i className='fas fa-check'></i>{'dance'}
          </div>
        }
        {sports && sports.gym && sports.gym.status &&
          <div className='p-1'>

            <i className='fas fa-check'></i>{'gym'}
          </div>
        }
        {sports && sports.soccer && sports.soccer.status &&
          <div className='p-1'>

            <i className='fas fa-check'></i>{'soccer'}
          </div>
        }
        {sports && sports.swimming && sports.swimming.status &&
          <div className='p-1'>

            <i className='fas fa-check'></i>{'swimming'}
          </div>
        }
        {sports && sports.tennis && sports.tennis.status &&
          <div className='p-1'>

            <i className='fas fa-check'></i>{'tennis'}
          </div>
        }
        {sports && sports.yoga && sports.yoga.status &&
          <div className='p-1'>

            <i className='fas fa-check'></i>{'yoga'}
          </div>
        }
      </div>
    </div>
  );
};

ListSport.propTypes = {
  profileid: PropTypes.object.isRequired
};

export default ListSport;