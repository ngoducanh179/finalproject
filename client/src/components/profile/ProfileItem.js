import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
const ProfileItem = ({
  profile: {
    user: { _id, name },
    hobies,
    avatar,
    fromWhere,
    bio
  }
}) => {
  return (
    <div className='profile bg-light'>
      <img src={avatar} alt='' className='round-img' />
      <div>
        <h2 className='text-primary'>{name}</h2>
        <p>
          {<span> at {bio}</span>}
        </p>
        <p className='my-1 text-primary'>{fromWhere && <span>From: {fromWhere}</span>}</p>
        <Link to={`/profile/${_id}`} className='btn button-primary'>
          Xem Trang Cá Nhân
        </Link>
      </div>
      <ul>
        {hobies.slice(0, 4).map((hoby, index) => (
          <li key={index} className='text-primary'>
            <i className='fas fa-check'></i> {hoby}
          </li>
        ))}
      </ul>
    </div>
  );
};

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileItem;
