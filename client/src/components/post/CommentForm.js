import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addComment } from '../../actions/post';
const CommentForm = ({ postId, addComment, auth: { user } }) => {
  const [text, setText] = useState('');
  const onSubmit = e => {
    if(e.key === 'Enter') {
      addComment(postId, { text });
      setText('');
    }
  }
  return (
    // <div class='post-form'>
    //   <div class='bg-primary p'>
    //     <h3>Leave a Comment</h3>
    //   </div>
    //   <form
    //     class='form my-1'
    //     onSubmit={e => {
    //       e.preventDefault();
    //       addComment(postId, { text });
    //       setText('');
    //     }}
    //   >
    //     <textarea
    //       name='text'
    //       cols='30'
    //       rows='5'
    //       placeholder='Create a post'
    //       value={text}
    //       onChange={e => setText(e.target.value)}
    //       required
    //     ></textarea>
    //     <input type='submit' class='btn btn-dark my-1' value='Submit' />
    //   </form>
    // </div>
    <div className="mainPosts">
    <div className="createPost__input">
      <div>
        <img src={user && user.avatar} alt="" className='globalProfile__circleProfile' />
        <span></span>
      </div>
      <input className='createPost__input--post' placeholder='Bình Luận' value={text} onKeyDown={e => onSubmit(e)} onChange={e => setText(e.target.value)} />
    </div>
    </div>
  );
};

CommentForm.propTypes = {};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(mapStateToProps, { addComment })(CommentForm);
