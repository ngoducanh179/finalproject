import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
const CenterItem = ({
  center: {
    _id,
    avatar,
    from,
    bio,
    centerName,
    sports
  },
  center
}) => {
  return (
    <div className='profile bg-light'>
      <img src={avatar} alt='' className='round-img' />
      <div>
        <h2 className='text-primary'>{centerName}</h2>
        <p>
          {<span> at {bio}</span>}
        </p>
        <p className='my-1 text-primary'>{from && <span>From: {from}</span>}</p>
        <Link to={`/center/${_id}`} className='btn button-primary'>
          Xem Phòng Tập
        </Link>
      </div>
      <ul>
        {sports && sports.badminton && sports.badminton.status &&
          <li className='text-primary'>
            <i className='fas fa-check'></i> {'badminton'}
          </li>
        }

        {sports && sports.boxing && sports.boxing.status &&
          <li className='text-primary'>
            <i className='fas fa-check'></i> {'boxing'}
          </li>
        }

        {sports && sports.dance && sports.dance.status &&
          <li className='text-primary'>
            <i className='fas fa-check'></i> {'dance'}
          </li>
        }

        {sports && sports.gym && sports.gym.status &&
          <li className='text-primary'>
            <i className='fas fa-check'></i> {'gym'}
          </li>
        }

        {sports && sports.soccer && sports.soccer.status &&
          <li className='text-primary'>
            <i className='fas fa-check'></i> {'soccer'}
          </li>
        }

        {sports && sports.swimming && sports.swimming.status &&
          <li className='text-primary'>
            <i className='fas fa-check'></i> {'swimming'}
          </li>
        }

        {sports && sports.tennis && sports.tennis.status &&
          <li className='text-primary'>
            <i className='fas fa-check'></i> {'tennis'}
          </li>
        }

        {sports && sports.yoga && sports.yoga.status &&
          <li className='text-primary'>
            <i className='fas fa-check'></i> {'yoga'}
          </li>
        }

      </ul>
    </div>
  );
};

// {hobies.slice(0, 4).map((hoby, index) => (


CenterItem.propTypes = {
  profile: PropTypes.object.isRequired
};

export default CenterItem;
