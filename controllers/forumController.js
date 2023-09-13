const postModel = require('../models/postModel'); // Import your Post model
const commentModel = require('../models/commentModel'); // Import your Comment model

const getPost = (req, res) => {
  postModel
    .find()
    .populate('comments', '_id comment')
    .sort({ createdAt: -1 })
    .then(result => {
      res.render('forum', {
        posts: result
      });
    })
    .catch(err => console.log(err));
};

const createPost = (req, res) => {
  const { message, user, comments } = req.body; // Extract post data from the request

  // Create a new post document
  const newPost = new postModel({
    message,
    user,
    comments,
  });

  newPost
    .save()
    .then(() => {
      res.redirect('/forum'); // Redirect to the forum page after successfully creating the post
    })
    .catch(err => {
      console.log(err);
      res.status(500).send('An error occurred while creating the post.');
    });
};

const addComment = (req, res) => {
  if (req.body.comment === '') {
    res.redirect('/');
  } else {
    const comment = new commentModel(req.body);
    comment
      .save()
      .then(savedComment => {
        updatePostData(req.params.id, savedComment._id, res);
      })
      .catch(err => {
        console.log(err);
        res.status(500).send('An error occurred while adding the comment.');
      });
  }
};

function updatePostData(postId, commentId, res) {
  postModel
    .findById(postId)
    .then(post => {
      post.comments.push(commentId);
      post
        .save()
        .then(() => {
          res.redirect('/forum');
        })
        .catch(err => {
          console.log(err);
          res.status(500).send('An error occurred while updating the post data.');
        });
    })
    .catch(err => {
      console.log(err);
      res.status(500).send('An error occurred while finding the post.');
    });
}

module.exports = {
  getPost,
  createPost,
  addComment,
};
