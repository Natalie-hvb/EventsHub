import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Like = ({ postId, userId }) => {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  useEffect(() => {
    // Fetch initial like status and like count for the post
    const fetchLikes = async () => {
      try {
        const response = await axios.get(`http://localhost:7000/post/${postId}/likes`);
        setLiked(response.data.likes.includes(userId));
        setLikeCount(response.data.likes.length);
      } catch (error) {
        console.error('Error fetching likes: ', error);
      }
    };

    fetchLikes();
  }, [postId, userId]);

  const handleLikeClick = async () => {
    try {
      // Toggle like status based on the current state
      if (!liked) {
        // If not liked, send a POST request to add the like
        await axios.post(`http://localhost:7000/post/${postId}/like`, { userId });
        setLikeCount(likeCount + 1);
      } else {
        // If liked, send a DELETE request to remove the like
        await axios.delete(`http://localhost:7000/post/${postId}/like`, { data: { userId } });
        setLikeCount(likeCount - 1);
      }
      setLiked(!liked);
    } catch (error) {
      console.error('Error updating like status: ', error);
    }
  };

  return (
    <div>
      <button className="btn btn-outline-light mb-3" onClick={handleLikeClick}>
        {liked ? <i className="fas fa-heart" style={{ color: 'red' }}></i> : <i className="far fa-heart"></i>}
        {liked ? ' Unlike' : ' Like'}
      </button>
      {/* <span>{likeCount} {likeCount === 1 ? 'like' : 'likes'}</span> */}
    </div>
  );
};

export default Like;
