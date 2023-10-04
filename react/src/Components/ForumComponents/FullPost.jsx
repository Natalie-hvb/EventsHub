import React from 'react';
import { Link } from 'react-router-dom'; // Assuming you are using React Router for navigation
import './FullPost.css'; // Import your CSS file

function FullPost({ post, user }) {
  return (
    <div id="container">
      <Link to="/forum" className="btn btn-outline-dark">Back</Link>
      <main className="d-flex align-items-center justify-content-center custom">
        <div className="card mb-4" style={{ width: '50%', background: 'rgba(0, 0, 0, 0.7)' }}>
          <div className="card-header">
            <h3 className="card-title text-light">{post.title}</h3>
          </div>
          <div className="card-body">
            <p className="card-text text-light">{post.message}</p>
          </div>
          <div className="card-body">
            <span className="card-text text-light">{post.created_at}</span>
          </div>
          <div className="card-footer d-flex justify-content-between">
            {post.user_id._id.toString() === user.id.toString() && (
              <>
                <form action={`/delete-post/${post._id}`} method="post">
                  <button type="submit" className="btn btn-outline-light">Delete</button>
                </form>
                <Link to={`/post/edit/${post._id}`} className="btn btn-light">Edit Post</Link>
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default FullPost;
