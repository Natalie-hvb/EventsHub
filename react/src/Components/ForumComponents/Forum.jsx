import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Like from './Like';

import './Forum.css';

function Forum({ user, userId }) {
  const [message, setMessage] = useState('');
  const [title, setTitle] = useState('');
  const [commentText, setCommentText] = useState('');
  const [posts, setPosts] = useState([]);

  const getPosts = () => {
    axios.get('http://localhost:7000/forum')
      .then(response => {
        setPosts(response.data);
      })
      .catch(error => {
        console.error('Error fetching messages and comments: ', error);
      });
  };

  useEffect(() => {
    getPosts();
  }, []);

  function validateForm() {
    if (title === '' || message === '') {
      alert('Both fields are required');
      return false;
    }
    return true;
  }

  function handlePostSubmission(event) {
    event.preventDefault();
    if (validateForm()) {
      axios.post(`http://localhost:7000/new-post/${user.id}`, {
        title: title,
        message: message
      })
        .then(response => {
          getPosts();
          setTitle('');
          setMessage('');
        })
        .catch(error => {
          console.error('Error posting message: ', error);
        });
    }
  }

  const handleCommentSubmission = (postId, comment) => {
    axios.post(`http://localhost:7000/add-comment/${postId}/${user.id}`, {
      comment: comment
    })
      .then(response => {
        getPosts();
        setCommentText('');
      })
      .catch(error => {
        console.error('Error posting comment: ', error);
      });
  };

  return (
    <section className="gradient-custom">
      <div className="container my-5 py-5">
        <div className="row d-flex justify-content-center">
          <div className="col-md-12 col-lg-10 col-xl-8">
            {user ? (
              <div className="card mb-4 hello-user">
                <div className="card-body">
                  <h1 className="card-title">Hello {user.name}</h1>
                  <p className="card-text">Would you like to leave a few words about your experience?</p>
                </div>
              </div>
            ) : (
              <div className="card mb-4 form-dark welcome-non-user">
                <div className="card-body">
                  <h3 className="card-title">Welcome to the EventsHub Forum</h3>
                  <p className="card-text">
                    Unfortunately, this information is only for registered guests. Please sign up first.
                  </p>
                  <a className="btn btn-outline-light" href="/signup">Sign up</a>
                </div>
              </div>
            )}

            {user && (
              <div className="card mb-4 form-dark">
                <div className="card-body">
                  <form onSubmit={handlePostSubmission}>
                    <input
                      type="text"
                      className="form-control mb-3"
                      placeholder="Title"
                      maxLength="40"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                    <textarea
                      className="form-control mb-3"
                      maxLength="1000"
                      placeholder="Message"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                    ></textarea>
                    <button type="submit" className="btn btn-outline-light">Post a message</button>
                  </form>
                </div>
              </div>
            )}

            {user && posts.length > 0 && (
              <div>
                <div className="card-body">
                  {posts.map((post) => (
                    <div className="mb-4 separated form-dark" key={post._id}>
                      <div className='one-card mb-4'>
                        <h5 className="card-title mb-3">{post.title}</h5>
                        <p className="card-text">{post.message && post.message.slice(0, 300)}</p>
                      </div>
                      <div className="mb-2 info">
                        <a href={`/post/${post._id}`} id='a-link'>See more..</a>
                        <p className="card-text written">
                          Written by: {post.user_id.name} at {new Date(post.createdAt).toLocaleTimeString()}
                        </p>
                      </div>
                      <div id="like-button">
                        {user && <Like postId={post._id} userId={userId} />}
                      </div>
                      <hr />

                      {post.comments && post.comments.length > 0 && (
                        <div className="mb-3">
                          <h6 className="mb-2">Comments:</h6>
                          {post.comments.map((comment) => (
                            <div className="mb-3" key={comment._id}>
                              <p className="card-text">{comment.comment}</p>
                              <p className="card-text written">
                                Written by: {comment.user_id.name} at {new Date(comment.createdAt).toLocaleTimeString()}
                              </p>
                            </div>
                          ))}
                        </div>
                      )}

                      <div className="mb-3">
                        <form onSubmit={(e) => {
                          e.preventDefault();
                          handleCommentSubmission(post._id, commentText);
                        }}>
                          <input
                            type="text"
                            className="form-control mb-2"
                            placeholder="Write your comment"
                            value={commentText}
                            onChange={(e) => setCommentText(e.target.value)}
                          />
                          <button type="submit" className="btn btn-outline-light">Send</button>
                        </form>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Forum;
