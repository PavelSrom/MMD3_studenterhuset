const router = require('express').Router()
const { check, validationResult } = require('express-validator')
const auth = require('../middleware/auth')
const Bullshit = require('../models/Bullshit')
const Profile = require('../models/Profile')

// DESC:      get all posts
// ACCESS:    private
// ENDPOINT:  /api/posts
router.get('/', auth, async (req, res) => {
  try {
    // get all posts and sort from newest to oldest
    const allPosts = await Bullshit.find().sort({ createdAt: -1 })
    // return them to the client
    return res.json(allPosts)
  } catch (err) {
    console.error(err.message)
    return res.status(500).json({ msg: err.message })
  }
})

// DESC:      get a single post by ID
// ACCESS:    private
// ENDPOINT:  /api/posts/:id
router.get('/:id', auth, async (req, res) => {
  try {
    // finding a post by the ID provided
    const bullshit = await Bullshit.findById(req.params.id)
    // if we don't find anything, we throw 404
    if (!bullshit) return res.status(404).json({ msg: 'Bullshit not found' })
    // otherwise we return it to the client
    return res.json(bullshit)
  } catch (err) {
    console.error(err.message)
    return res.status(500).json({ msg: err.message })
  }
})

// DESC:      create a new post to bullshit page
// ACCESS:    private
// ENDPOINT:  /api/posts
router.post(
  '/',
  [
    auth,
    check('text', 'Text is required')
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    // request body validation
    const errors = validationResult(req)
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() })

    try {
      // finding a user who posted this post
      const userWhoPosted = await Profile.findOne({ user: req.userID })
      // if we don't find anyone, we throw 404
      if (!userWhoPosted) return res.status(404).json({ msg: 'User not found' })
      // otherwise, we create a new post and use the user's data
      const newBullshit = new Bullshit({
        user: req.userID,
        firstName: userWhoPosted.firstName,
        lastName: userWhoPosted.lastName,
        text: req.body.text
      })
      // save to MongoDB
      await newBullshit.save()
      // return back to the client
      return res.status(201).json(newBullshit)
    } catch (err) {
      console.error(err.message)
      return res.status(500).json({ msg: err.message })
    }
  }
)

// DESC:      detele a post by id
// ACCESS:    private
// ENDPOINT:  /api/posts/:id
router.delete('/:id', auth, async (req, res) => {
  try {
    // fetching the post that should be deleted
    const postToDelete = await Bullshit.findById(req.params.id)
    // if we don't find anything, we throw 404
    if (!postToDelete) return res.status(404).json({ msg: 'Post not found' })
    // if the user's ID doesn't match the post's 'user' property, we throw 403
    if (postToDelete.user.toString() !== req.userID)
      return res
        .status(403)
        .json({ msg: "You're not allowed to perform this task" })
    // otherwise, we remove it
    await postToDelete.remove()
    // and return a response to the client
    return res.json({ msg: 'Post removed successfully' })
  } catch (err) {
    console.error(err.message)
    return res.status(500).json({ msg: err.message })
  }
})

// DESC:      comment on a post
// ACCESS:    private
// ENDPOINT:  /api/posts/:id/comment
router.post(
  '/:id/comment',
  [
    auth,
    check('text', 'Text is required')
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    // request body validation
    const errors = validationResult(req)
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() })

    try {
      // fetching my profile, because I'm the one who commented
      const myProfile = await Profile.findOne({ user: req.userID })
      // fetching the post that should have a new comment
      const targetPost = await Bullshit.findById(req.params.id)
      // creating a new comment
      const newComment = new Bullshit({
        user: req.userID,
        firstName: myProfile.firstName,
        lastName: myProfile.lastName,
        text: req.body.text
      })
      // adding the comment to the beginning of the 'comments' array
      targetPost.comments.unshift(newComment)
      // saving the post
      await targetPost.save()
      // returning the post to the client
      return res.status(201).json(targetPost)
    } catch (err) {
      console.error(err.message)
      return res.status(500).json({ msg: err.message })
    }
  }
)

// DESC:      remove a comment from a post
// ACCESS:    private
// ENDPOINT:  /api/posts/:postId/:commentId
router.delete('/:postId/:commentId', auth, async (req, res) => {
  try {
    // fetching the post that should be updated
    const targetPost = await Bullshit.findById(req.params.postId)
    // if we don't find it, we throw 400
    if (!targetPost) return res.status(400).json({ msg: 'Post not found' })
    // finding the comment that should be deleted
    const targetComment = targetPost.comments.find(
      com => com._id.toString() === req.params.commentId
    )
    // if we don't find it, we throw 400
    if (!targetComment)
      return res.status(400).json({ msg: 'This comment does not exist' })
    // if the comment's 'user' prop doesn't match the logged user, we throw 403
    // this is to ensure you cannot delete other people's comments
    if (targetComment.user.toString() !== req.userID)
      return res
        .status(403)
        .json({ msg: "You're not allowed to perform this task" })
    // we update the 'comments' array by removing the comment from it
    targetPost.comments = targetPost.comments.filter(
      com => com.id !== targetComment.id
    )
    // saving the post again
    await targetPost.save()
    // returning a response
    return res.json(targetPost)
  } catch (err) {
    console.error(err.message)
    return res.status(500).json({ msg: err.message })
  }
})

module.exports = router
