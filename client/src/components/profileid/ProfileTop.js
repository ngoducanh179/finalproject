import React from 'react';
import PropTypes from 'prop-types';

const ProfileTop = ({
  profileid: {
    social,
    user: { name },
    avatar,
    fromWhere,
    sex
  }
}) => {
  return (
    <div className='profile-top p-2'>
      <img className='round-img my-1' src={avatar} alt='' />
      <h1 className='large text-primary'>{name}</h1>
      <p className='lead'>
        <span>{sex}</span>
      </p>
      <p>{fromWhere && <span>Đến Từ: <strong>{fromWhere}</strong></span>}</p>
      <div className='icons my-1'>
        {social && social.facebook && (
          <a href={social.facebook} target='_blank' rel='noopener noreferrer'>
            <i className='fab fa-facebook fa-2x'></i>
          </a>
        )}
        {social && social.linkedin && (
          <a href={social.linkedin} target='_blank' rel='noopener noreferrer'>
            <i className='fab fa-linkedin fa-2x'></i>
          </a>
        )}

        {social && social.youtube && (
          <a href={social.youtube} target='_blank' rel='noopener noreferrer'>
            <i className='fab fa-youtube fa-2x'></i>
          </a>
        )}
        {social && social.instagram && (
          <a href={social.instagram} target='_blank' rel='noopener noreferrer'>
            <i className='fab fa-instagram fa-2x'></i>
          </a>
        )}
      </div>
    </div>
  );
};

ProfileTop.propTypes = {
  profileid: PropTypes.object.isRequired
};

export default ProfileTop;
