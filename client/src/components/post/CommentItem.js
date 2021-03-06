import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import moment from 'moment'
import { deleteComment } from '../../actions/post';
const CommentItem = ({
  postId,
  comment: { _id, text, name, avatar, user, date },
  auth,
  deleteComment
}) => {
  const fromNow = date && moment(date).fromNow();
  return (
    <div className="mainPosts">
      <div className="mainPosts__title">
        <div className="mainPosts__title--profile">
          <Link to={`/profile/${user}`}>
            <img src={avatar} alt="" className='globalProfile__circleProfile' />
            <span></span>
          </Link>
          <div className="mainPosts__title--profile--name">
            <a href="#">{name}</a>
            <span>{fromNow} <i className="fas fa-globe-americas"></i> </span>
          </div>
        </div>
        <i className="fas fa-ellipsis-h"></i>
      </div>

      <div className="mainPosts__description">
        {text}
      </div>
    </div>



    // {/* // <div class='post bg-white p-1 my-1'>
    // //   <div>
    // //     <Link to={`/profile/${user}`}>
    // //       <img class='round-img' src={avatar} alt='' />
    // //       <h4>{name}</h4>
    // //     </Link>
    // //   </div>
    // //   <div>
    // //     <p class='my-1'>{text}</p>
    // //     <p class='post-date'>
    // //       Posted on <Moment format='YYYY/MM/DD'>{date}</Moment>
    // //     </p>
    // //     {!auth.loading && user === auth.user._id && ( */}
    // //       <button
    // //         onClick={e => deleteComment(postId, _id)}
    // //         type='button'
    // //         className='btn btn-danger'
    // //       >
    // //         {' '}
    // //         <i className='fas fa-times'></i>
    // //       </button>
    // //     )}
    // //   </div>
    // // </div>
  );
};

CommentItem.propTypes = {
  postId: PropTypes.number.isRequired,
  comment: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deleteComment: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(mapStateToProps, { deleteComment })(CommentItem);
