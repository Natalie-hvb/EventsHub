import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Forum.css';

function Forum({ user, userId }) {
  const [message, setMessage] = useState('');
  const [title, setTitle] = useState('');
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:7000/forum')
      .then(response => {
        console.log('Response Data:', response.data);
        setPosts(response.data); 
      })
      .catch(error => {
        console.error('Error fetching messages and comments: ', error);
      });
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
      axios.post('http://localhost:7000/new-post', {
        title: title,
        message: message,
        userId: userId
      })
        .then(response => {
          setPosts([...posts, response.data]); // Update posts with the new post
          setTitle('');
          setMessage('');
        })
        .catch(error => {
          console.error('Error posting message: ', error);
        });
    }
  }

  return (
    <div id="forum-container">
      {user.id ? (
        <div className="forum-output" id="hello-user">
          <h1>Hello {user.name}</h1>
          <p>Would you like to leave few words about your experience?</p>
        </div>
      ) : (
        <div id="welcome-non-user">
          <h3>Welcome to the EventsHub Forum</h3>
          <p>
            Please enjoy reading our latest news and reviews, but if you would
            like to write a question/post or write a comments, you would need
            to Sign Up first
          </p>
          <a className="btn btn-primary" href="/signup">
            Sign up
          </a>
        </div>
      )}

      {user.id && (
        <form
          id="form-message"
          action={`/new-post/${userId}`}
          method="post"
          onSubmit={handlePostSubmission}
        >
          <input
            type="text"
            id="title"
            name="title"
            placeholder="Title"
            maxLength="20"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            name="message"
            id="message"
            maxLength="150"
            placeholder="Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>
          <div className="button">
            <button type="submit">Post a message</button>
          </div>
        </form>
      )}

      {user.id && posts.length > 0 && (
        <div id="output" className="posts content">
          {posts.map((post) => (
            <div className="output-icon" key={post._id}>
              <img src="../public/img/icon-message.jpg" alt="message-icon" />
              <div className="forum-output">
                <h5>{post.title}</h5>
                <p>{post.message.slice(0, 50)}</p>
                <div id="link-and-span">
                  <a href={`/post/${post._id}`}>See more..</a>
                  <span>
                    written by: {post.user_id.name} on: {post.created_at}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Forum;
