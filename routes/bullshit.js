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
    const allPosts = await Bullshit.find()

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
    const bullshit = await Bullshit.findById(req.params.id)
    if (!bullshit) return res.status(404).json({ msg: 'Bullshit not found' })

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
    const errors = validationResult(req)
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() })

    try {
      const userWhoPosted = await Profile.findOne({ user: req.userID })
      if (!userWhoPosted) return res.status(404).json({ msg: 'User not found' })

      const newBullshit = new Bullshit({
        user: req.userID,
        firstName: userWhoPosted.firstName,
        lastName: userWhoPosted.lastName,
        text: req.body.text
      })

      await newBullshit.save()

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
    const postToDelete = await Bullshit.findById(req.params.id)
    if (!postToDelete) return res.status(404).json({ msg: 'Post not found' })

    if (postToDelete.user.toString() !== req.userID)
      return res
        .status(403)
        .json({ msg: "You're not allowed to perform this task" })

    await postToDelete.remove()

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
    const errors = validationResult(req)
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() })

    try {
      const myProfile = await Profile.findOne({ user: req.userID })
      const targetPost = await Bullshit.findById(req.params.id)

      const newComment = new Bullshit({
        user: req.userID,
        firstName: myProfile.firstName,
        lastName: myProfile.lastName,
        text: req.body.text
      })

      targetPost.comments.unshift(newComment)

      await targetPost.save()

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
    const targetPost = await Bullshit.findById(req.params.postId)
    if (!targetPost) return res.status(400).json({ msg: 'Post not found' })

    const targetComment = targetPost.comments.find(
      com => com._id.toString() === req.params.commentId
    )
    if (!targetComment)
      return res.status(400).json({ msg: 'This comment does not exist' })

    if (targetComment.user.toString() !== req.userID)
      return res
        .status(403)
        .json({ msg: "You're not allowed to perform this task" })

    targetPost.comments = targetPost.comments.filter(
      com => com.id !== targetComment.id
    )

    await targetPost.save()

    return res.json(targetPost)
  } catch (err) {
    console.error(err.message)
    return res.status(500).json({ msg: err.message })
  }
})

module.exports = router
