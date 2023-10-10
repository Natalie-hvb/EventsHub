import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './EditPost.css';

function EditPost({ user }){
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [editedPost, setEditedPost] = useState({
    title: '',
    message: ''
  });

  useEffect(() => {
    // Fetch the current post data for editing
    axios.get(`http://localhost:7000/post/${id}`)
      .then(response => {
        setPost(response.data);
        setEditedPost({
          title: response.data.title,
          message: response.data.message
        });
      })
      .catch(error => {
        console.error('Error fetching post details: ', error);
      });
  }, [id]);

  const handleEditPost = () => {
    // Make an API call to update the post with edited data
    axios.post(`http://localhost:7000/post/edit/${id}`, editedPost)
      .then(response => {
        // Redirect to the updated post page after editing
        window.location.href = `/post/${id}`;
      })
      .catch(error => {
        console.error('Error editing post: ', error);
      });
  };

  return (
    <div id="container">
      <div id='backToPost'>
        <a href={`/post/${id}`} className="btn btn-outline-light">Back to Post</a>
      </div>
      
      {post && (
        <div className="edit-post">
          <h2>Edit Post</h2>
          <div className="form-group">
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              id="title"
              name="title"
              className="form-control"
              value={editedPost.title}
              onChange={(e) => setEditedPost({ ...editedPost, title: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label htmlFor="message">Message:</label>
            <textarea
              id="message"
              name="message"
              className="form-control"
              value={editedPost.message}
              onChange={(e) => setEditedPost({ ...editedPost, message: e.target.value })}
            />
          </div>
          <button className="btn btn-outline-light" onClick={handleEditPost}>Save Changes</button>
        </div>
      )}
    </div>
  );
}

export default EditPost;
