import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { addLike, removeLike, deletePost } from './../../actions/post';

// import 

import like from './svg/like.svg';
import heart from './svg/heart.svg';
import like_light from './svg/like_light.svg';
import comment from './svg/comment.svg';
import smile from './svg/smile.svg';
import photo from './svg/photo.svg';
import live_video from './svg/live_video.svg';

import share from './svg/share.svg';
import care from './svg/care.svg';
import one from './images/1.jpg';
import two from './images/post-1.jpg';
import moment from 'moment'
const PostItem = ({
  addLike,
  deletePost,
  auth,
  post: { _id, text, name, avatar, user, likes, comments, createAt, img },
  showActions
}) => {
  const fromNow = createAt && moment(createAt).fromNow();
  return (
    <Fragment>
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

        { img &&
          <div>
            <img src={img} alt="" className='mainPosts__post' />
          </div>
        }

        <div className="mainPosts__reaction">
          <div className="mainPosts__reaction--icons">
            <div className="svg">
              <img src={like} alt="" />
            </div>
            <div className="svg">
              <img src={heart} alt="" />
            </div>
            <div className="svg">
              <img src={care} alt="" />
            </div>
            <a href="#">{likes.length ? likes.length : 0} like</a>
          </div>
        </div>

        {showActions && 
          <div className="mainPosts__likeShare">
          <span onClick={e => addLike(_id)}>
            <div className="svg">
              <img src={like_light} alt="" />
            </div>
            <h3>Like</h3>
          </span>
          <Link to={`/post/${_id}`}>
            <span>
            <div className="svg">
              <img src={comment} alt="" />
            </div>
            <h3>{comments.length ? comments.length : 0} Comment</h3>
            </span>
          </Link>
        </div>
        }
      </div>
    </Fragment>
    // <div className='post bg-white p-1 my-1'>
    //   <div>
    //     <Link to={`/profile/${user}`}>
    //       <img className='round-img' src={avatar} alt='' />
    //       <h4>{name}</h4>
    //     </Link>
    //   </div>
    //   <div>
    //     <p className='my-1'>{text}</p>
    //     <p className='post-date'>
    //       Posted on <Moment format='YYYY/MM/DD'>{date}</Moment>
    //     </p>

    //     {showActions && (
    //       <Fragment>
    //         <button
    //           onClick={e => addLike(_id)}
    //           type='button'
    //           className='btn btn-light'
    //         >
    //           <i className='fas fa-thumbs-up'></i>{' '}
    //           {likes.length > 0 && <span>{likes.length}</span>}
    //         </button>
    //         <button
    //           onClick={e => removeLike(_id)}
    //           type='button'
    //           className='btn btn-light'
    //         >
    //           <i className='fas fa-thumbs-down'></i>
    //         </button>
    //         <Link to={`/post/${_id}`} className='btn btn-primary'>
    //           Discussion{' '}
    //           {comments.length > 0 && (
    //             <span className='comment-count'>{comments.length}</span>
    //           )}
    //         </Link>
    //         {!auth.loading && user === auth.user._id && (
    //           <button
    //             onClick={e => deletePost(_id)}
    //             type='button'
    //             className='btn btn-danger'
    //           >
    //             <i className='fas fa-times'></i>
    //           </button>
    //         )}
    // //       </Fragment>
    //     )}
    //   </div>
    // </div>
  );
};

PostItem.defaultProps = {
  showActions: true
};
PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(mapStateToProps, { addLike, removeLike, deletePost })(
  PostItem
);
