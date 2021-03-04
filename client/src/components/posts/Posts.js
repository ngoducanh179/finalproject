import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getPosts } from '../../actions/post';
import PostItem from './PostItem';
import PostForm from './PostForm';
import './style.css';

const Posts = ({ getPosts, post: { posts, loading } }) => {
  useEffect(() => {
    getPosts();
  }, [getPosts]);
  return loading ? (
    <Spinner />
  ) : (
      <Fragment>
        <br />
        <br />
        <br />

        <h1 className='text-primary'>Bài Đăng</h1>
        <p className='lead'>
          <i className='fas fa-user'></i> Chào Mừng Đến Với Cộng Đồng TomFit
      </p>
        <PostForm />
        <div className='posts'>
          {posts.map(post => (
            <PostItem key={post._id} post={post} />
          ))}
        </div>
        {/* create post */}
        {/* <div className="mainPosts">
          <div className="mainPosts__title">
            <div className="mainPosts__title--profile">
              <div>
                <img src={one} alt="" className='globalProfile__circleProfile' />
                <span></span>
              </div>

              <div className="mainPosts__title--profile--name">
                <a href="#">User Name</a>
                <span>1h <i className="fas fa-globe-americas"></i> </span>
              </div>
            </div>
            <i className="fas fa-ellipsis-h"></i>
          </div>

          <div className="mainPosts__description">
            Landing Page UI Design Using Html Css/Sass JS
        </div>

          <div>
            <img src={two} alt="" className='mainPosts__post' />
          </div>

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
              <a href="#">52k</a>
            </div>
          </div>

          <div className="mainPosts__likeShare">
            <span>
              <div className="svg">
                <img src={like_light} alt="" />
              </div>
              <h3>Like</h3>
            </span>
            <span>
              <div className="svg">
                <img src={comment} alt="" />
              </div>
              <h3>Comment</h3>
            </span>
          </div>
        </div> */}

      </Fragment>
    );
};

Posts.propTypes = {
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  post: state.post
});
export default connect(mapStateToProps, { getPosts })(Posts);
