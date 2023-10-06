import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './FullPost.css'

function FullPost({ user }) {
  console.log(user);
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:7000/post/${id}`)
      .then(response => {
        setPost(response.data);
      })
      .catch(error => {
        console.error('Error fetching post details: ', error);
      });
  }, [id]);

  const handleDeletePost = () => {
    axios.delete(`http://localhost:7000/delete-post/${id}`)
      .then(() => {
        // Redirect to the forum page after deletion
        window.location.href = '/forum';
      })
      .catch(error => {
        console.error('Error deleting post: ', error);
      });
  };
  

  return (
    
    <div id="container">
      <div id='back-to-forum'>
      <a href="/forum" class="btn btn-outline-light">Back</a>
      </div>
      
      <div className="card-body">
        {post && (
          <div className="mb-4">
            <div className="mb-4 output-full-post full-post">
              <h2>{post.title}</h2>
              <p className="card-text">{post.message}</p>
              <p className="card-text written">Written by: {post.user_id.name}</p>
              <p className="card-text written">Created at: {new Date(post.createdAt).toLocaleTimeString()}</p>
              {user.id === post.user_id._id && (
                <div>
                <div className="post-actions">
                  <button className="btn btn-danger" onClick={handleDeletePost}>Delete</button>
                  <a href={`/post/edit/${post._id}`} className="btn btn-light">Edit Post</a>
                </div>
              </div>
              )}
            </div>
            <div className="full-post">
              <h4>Comments</h4>
              {post.comments && post.comments.map(comment => (
                <div key={comment._id} className="comment mb-3">
                  <p>{comment.comment}</p>
                  <p className="card-text written">Written by: {comment.user_id.name}</p>
                  <p className="card-text written">Created at: {new Date(post.createdAt).toLocaleTimeString()}</p>
                </div>
              ))}
            </div>
            
          </div>
        )}
      </div>
      
    </div>
  );
}

export default FullPost;
