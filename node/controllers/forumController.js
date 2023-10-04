const post = require('../models/postModel');
const commentModel = require('../models/commentModel');
const userModel = require('../models/User')


const getForum = (req, res) => {
  post.find()
    // .populate("comments", "_id comment user_id")
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
      // console.log(result[1].comments)
      // res.render('forum', { posts: result, title: 'Posts', userId: res.locals.userId }); 
    })
    .catch(err => {
      console.log(err);
      res.status(500).render('404', { message: 'An error occurred while fetching posts.' });
    });
};


const createNewPost = async (req, res) => {
  try {
    const { title, message } = req.body;
    const userId = req.params.id; // Ensure userId is correctly set by middleware

    const postedUser = await userModel.findById(userId);

    const newPost = new post({
      title,
      message,
      user_id: userId,
    });

    await newPost.save();

    // Update the user's posts array
    postedUser.post.push(newPost._id);
    console.log(postedUser)
    await postedUser.save();

    res.redirect('/forum');
    
  } catch (err) {
    console.error(err);
    res.status(500).render('404', { message: 'An error occurred while creating a new post.' });
  }
};

const getFullPost = (req, res) => {
  post.findById(req.params.id)
    .then(result => res.send({ post: result, title: post.title }))
    .catch(err => console.log(err))
};

const deletePost = (req, res) => {
  post.findByIdAndRemove(req.params.id)
    .then(() => res.redirect('/forum'))
    .catch(err => console.log(err))
};

const getEditPage = (req, res) => {
  post.findById(req.params.id)
    .then((result) => res.render('editPost', { post: result, title: post.title }))
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

    res.redirect('/forum');
  } catch (err) {
    console.error(err);
    res.status(500).render('404', { message: 'An error occurred while adding a comment.' });
  }
};

// 404 page
const getErrorPage = (req, res) => {
  res.status(404).render('404', { title: '404' });
};

module.exports = {
  getForum,
  createNewPost,
  getFullPost,
  deletePost,
  getEditPage,
  updatePost,
  addComment,
  getErrorPage
};



