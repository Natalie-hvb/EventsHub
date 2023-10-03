import React from 'react';
// import './NewPost.css'; // Import your CSS file

function NewPost({ handleNewPost }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const title = e.target.title.value;
    const body = e.target.body.value;

    // Perform any additional validation if needed

    handleNewPost({ title, body });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Post title:</label>
        <input type="text" id="title" name="title" required />
        <label htmlFor="body">Post body:</label>
        <textarea id="body" name="body" required></textarea>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default NewPost;
