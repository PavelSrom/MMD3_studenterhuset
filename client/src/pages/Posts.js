import React, { Fragment, useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { getAllPosts, createPost } from '../store/actions/posts'

import Header from '../components/Header'
import BottomNav from '../components/BottomNav'
import Post from '../components/Posts/Post'

import classes from './Posts.module.css'

const Posts = ({ getAllPosts, createPost, posts }) => {
  useEffect(() => {
    getAllPosts()
  }, [])

  const [postText, setPostText] = useState('')

  const submitNewPost = () => {
    createPost(postText)
    setPostText('')
  }

  return (
    <Fragment>
      <Header />
      <div className="container">
        <div style={{ textAlign: 'center' }}>
          <i
            className="fas fa-poo"
            style={{ fontSize: 30, color: '#5c75b0', marginTop: 15 }}
          ></i>
        </div>
        <h4 className="heading" style={{ textAlign: 'center', marginTop: 0 }}>
          Bullshit page
        </h4>

        {/* textarea and button for new post */}
        <div className={classes.newPostBox}>
          <p>Do you have a funny story to share?</p>
          <textarea
            placeholder="Start typing..."
            value={postText}
            onChange={e => setPostText(e.target.value)}
          />
          <button onClick={submitNewPost} disabled={!postText}>
            Add a post
          </button>
        </div>

        {/* individual post components */}
        {/* change the check to requestSent */}
        {posts.length > 0 ? (
          posts.map(post => <Post key={post._id} postData={post} />)
        ) : (
          <p style={{ textAlign: 'center' }}>Loading posts...</p>
        )}
      </div>
      <BottomNav />
    </Fragment>
  )
}

const mapStateToProps = state => ({
  posts: state.post.posts
})

export default connect(mapStateToProps, { getAllPosts, createPost })(Posts)
