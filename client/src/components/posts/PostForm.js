import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addPost } from '../../actions/post';
import { storage } from "../../assets/firebase/firebase";
import { setAlert } from '../../actions/alert'


// import 

import smile from './svg/smile.svg';
import photo from './svg/photo.svg';
import one from './images/1.jpg';

const PostForm = ({ addPost }) => {
  const [text, setText] = useState('');
  const [url, setUrl] = useState("");
  const [progress, setProgress] = useState(0);
  const onSubmit = (e) => {
    if (e.key  === "Enter") {
      addPost({ text, url})
      setText('');
      setUrl('');
      setProgress('');
    }
  }
  const handleChange = e => {
    if (e.target.files[0]) {
      const fileName = e.target.files[0];
      const uploadTask = storage.ref(`images/${fileName.name}`).put(fileName);
      uploadTask.on(
        "state_changed",
        snapshot => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setProgress(progress);
        },
        error => {
          setAlert('Không Thể Upload ảnh', 'error')
        },
        () => {
          console.log(fileName.name);
          storage
            .ref("images")
            .child(fileName.name)
            .getDownloadURL()
            .then(url => {
              setUrl(url);
            });
        }
      );
    }
  };
  return (
    <Fragment>
      <div className="createPost">
        <div className="createPost__input">
          <div>
            <img src={one} alt="" className='globalProfile__circleProfile' />

            <span></span>
          </div>
          <input className='createPost__input--post' placeholder='Bạn Đang Suy Nghĩ Gì ' type='text' value={text} onChange={e => setText(e.target.value)} onKeyDown={e => onSubmit(e)}/>
        </div>

        <div className="createPost__buttons">
          <span style={{ position: 'relative', }}>
            <input type='file' style={{ position: 'absolute', left: '0', top: '0', opacity: '0' }} onChange={handleChange} />
            <div className="svg">
              <img src={photo} alt="" />
            </div>
            <h4 style={{ display: 'inline-block' }}>Photo</h4>
          </span>
          <span>
            <div className="svg">
              <img src={smile} alt="" />
            </div>
            <h4>Feeling/Activity</h4>
          </span>
        </div>
      </div>
      <br />
      {
        progress > 0 ? url ? <img src={url} /> : <progress value={progress} max="100" /> : ''
      }
    </Fragment>
    // <div class='post-form'>
    //   <div class='bg-primary p'>
    //     <h3>Say Something...</h3>
    //   </div>
    //   <form
    //     class='form my-1'
    //     onSubmit={e => {
    //       e.preventDefault();
    //       addPost({ text });
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

  );
};

PostForm.propTypes = {
  addPost: PropTypes.func.isRequired
};

export default connect(null, { addPost })(PostForm);
