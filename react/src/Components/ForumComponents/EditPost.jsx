import React from 'react';
import { useParams } from 'react-router-dom'; // Assuming you are using React Router for routing
import './EditPost.css'; // Import your CSS file

function EditPost({ posts, handleEdit }) {
  const { id } = useParams(); // Get the post ID from the URL parameters
  const post = posts.find(post => post._id === id);

  if (!post) {
    return <div>Loading...</div>; // Handle loading state or error if post is not found
  }

  return (
    <main>
      <h3>Edit the Post</h3>
      <div className="custom" style={{ width: '500px' }}>
        <form onSubmit={(e) => handleEdit(e, id)}>
          <div className="form-group">
            <label htmlFor="title">Title:</label>
            <input type="text" className="form-control" name="title" defaultValue={post.title} />
          </div>
          <div className="form-group">
            <label htmlFor="message">Message:</label>
            <textarea className="form-control" id="message" name="message" defaultValue={post.message} />
          </div>
          <button type="submit" className="btn btn-outline-light">Submit</button>
        </form>
      </div>
    </main>
  );
}

export default EditPost;
