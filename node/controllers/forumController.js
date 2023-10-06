const post = require('../models/postModel');
const commentModel = require('../models/commentModel');
const userModel = require('../models/User')


const getForum = (req, res) => {
  post.find()
    .populate("user_id", "name")
    .populate({
      path: 'comments',
      model: 'comment',
      populate: {
        path: 'user_id',
        model: 'user'
      }
    })
    .sort({ createdAt: -1 })
    .then(result => {
      res.json(result);
    })
    .catch(err => {
      console.log(err);
      res.status(500).render('404', { message: 'An error occurred while fetching posts.' });
    });
};


const createNewPost = async (req, res) => {
  try {
    const { title, message } = req.body;
    const userId = req.params.id;

    const postedUser = await userModel.findById(userId);

    const newPost = new post({
      title,
      message,
      user_id: userId,
    });

    await newPost.save();

    postedUser.post.push(newPost._id);
    console.log(postedUser)
    await postedUser.save();

    res.redirect('/forum');
    
  } catch (err) {
    console.error(err);
    res.status(500).render('404', { message: 'An error occurred while creating a new post.' });
  }
};

const getFullPost = async (req, res) => {
  try {
    const postId = req.params.id;
    console.log('postId:', postId);
    const fullPost = await post.findById(postId)
      .populate('user_id', 'name')
      .populate({
        path: 'comments',
        model: 'comment',
        populate: {
          path: 'user_id',
          model: 'user',
        },
      });

    if (!fullPost) {
      return res.status(404).send('Post not found');
    }

    res.json(fullPost);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

const deletePost = (req, res) => {
  console.log(`Deleting post with ID: ${req.params.id}`);
  post.findByIdAndRemove(req.params.id)
    .then(() => {
      console.log('Post deleted successfully');
      res.sendStatus(200);
    })
    .catch(err => {
      console.error('Error deleting post:', err);
      res.sendStatus(500);
    });
};


const getEditPage = (req, res) => {
  post.findById(req.params.id)
    .then((result) => res.send( { post: result, title: post.title }))
    .catch(err => console.log(err))
};

const updatePost = (req, res) => {
  post.findByIdAndUpdate(req.params.id, req.body)
    .then(result => res.redirect(`/post/${result._id}`))
    .catch(err => console.log(err))
};

const addComment = async (req, res) => {
  try {
    const { postId, userId } = req.params;
    const postToComment = await post.findById(postId);

    if (!postToComment) {
      return res.status(404).send('Post not found');
    }

    const comment = new commentModel({
      comment: req.body.comment,
      post_id: postId,
      user_id: userId
    });

    await comment.save();
    postToComment.comments.push(comment._id);
    await postToComment.save();

    res.redirect('/');
  } catch (err) {
    console.error(err);
    res.status(500).render('404', { message: 'An error occurred while adding a comment.' });
  }
};

const logout_get = (req, res) => {
  const maxAge = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
  res.cookie('jwt', '', { maxAge, httpOnly: true });
  // res.redirect('/');

}

// 404 page
const getErrorPage = (req, res) => {
  res.status(404).render('404', { title: '404' });
};

const likePost = async (req, res) => {
  try {
    // find the post to update the like
    const likedPost = await post.findById(req.params.postId);

    // Check if the user has already liked the post
    const userIndex = likedPost.likes.indexOf(req.user.id);
    if (userIndex === -1) {
      // If user has not liked the post, add the like
      likedPost.likes.push(req.user.id);
      await likedPost.save();

      // You can perform additional actions here, like creating notifications, if necessary

      res.status(200).json(likedPost);
    } else {
      // If user has already liked the post, remove the like
      likedPost.likes.splice(userIndex, 1);
      await likedPost.save();
      res.status(200).json(likedPost);
    }
  } catch (error) {
    console.error('Error liking post: ', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get likes for a post
const getPostLikes = async (req, res) => {
  try {
    const postId = req.params.postId;
    const likedPost = await post.findById(postId);
    res.status(200).json({ likes: likedPost.likes });
  } catch (error) {
    console.error('Error fetching post likes: ', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Add like to a post
const addPostLike = async (req, res) => {
  try {
    const postId = req.params.postId;
    const userId = req.params.userId;
    const likedPost = await post.findById(postId);

    // Check if the user has already liked the post
    const userIndex = likedPost.likes.indexOf(userId);
    if (userIndex === -1) {
      // If user has not liked the post, add the like
      likedPost.likes.push(userId);
      await likedPost.save();
      res.status(200).json({ likes: likedPost.likes });
    } else {
      // If user has already liked the post, return existing likes
      res.status(200).json({ likes: likedPost.likes });
    }
  } catch (error) {
    console.error('Error adding post like: ', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Remove like from a post
const removePostLike = async (req, res) => {
  try {
    const postId = req.params.postId;
    const userId = req.params.userId;
    const likedPost = await post.findById(postId);

    // Check if the user has already liked the post
    const userIndex = likedPost.likes.indexOf(userId);
    if (userIndex !== -1) {
      // If user has liked the post, remove the like
      likedPost.likes.splice(userIndex, 1);
      await likedPost.save();
    }
    res.status(200).json({ likes: likedPost.likes });
  } catch (error) {
    console.error('Error removing post like: ', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};




module.exports = {
  getForum,
  createNewPost,
  getFullPost,
  deletePost,
  getEditPage,
  updatePost,
  addComment,
  logout_get,
  getErrorPage,
  likePost,
  getPostLikes,
  addPostLike,
  removePostLike,

};



