const post = require('../models/postModel');
const commentModel = require('../models/commentModel');

const getForum = (req, res) => {
  post.find()
    .populate("comments", "user_id comment")
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
      res.render('forum', { posts: result, title: 'Posts' });
    })
    .catch(err => {
      console.log(err);
      // res.status(500).render('404', { message: 'An error occurred while fetching posts.' });
    });
};

const createNewPost = (req, res) => {
  let newPost = new post({
    title: req.body.title, 
    message: req.body.message, 
    user_id: res.locals.id
  });
  newPost.save()
    .then(() => { res.redirect('/forum'); })
    .catch(err => console.log(err));
};

const getFullPost = (req, res) => {
  post.findById(req.params.id)
    .then(result => res.render('fullPost', { post: result }))
    .catch(err => console.log(err))
};

const deletePost = (req, res) => {
  post.findByIdAndRemove(req.params.id)
    .then(() => res.redirect('/forum'))
    .catch(err => console.log(err))
};

const getEditPage = (req, res) => {
  post.findById(req.params.id)
    .then((result) => res.render('editPost', { post: result }))
    .catch(err => console.log(err))
};

const updatePost = (req, res) => {
  post.findByIdAndUpdate(req.params.id, req.body)
    .then(result => res.redirect(`/post/${result._id}`))
    .catch(err => console.log(err))
};

const addComment = async (req, res) => {
  try {
    const { id } = req.params;
    const postToComment = await post.findById(id);

    if (!postToComment) {
      return res.status(404).send('Post not found');
    }

    const comment = new commentModel({
      comment: req.body.comment,
      post_id: req.params.id,
      user_id: res.locals.id
    });

    await comment.save();
    postToComment.comments.push(comment._id);
    await postToComment.save();

    res.redirect('/forum');
  } catch (err) {
    console.error(err);
    res.status(500).render('error', { message: 'An error occurred while adding a comment.' });
  }
};

module.exports = {
  getForum,
  createNewPost,
  getFullPost,
  deletePost,
  getEditPage,
  updatePost,
  addComment
};



// 404 page
const getErrorPage = (req, res) => {
  res.status(404).render('404', { title: '404' });
};
