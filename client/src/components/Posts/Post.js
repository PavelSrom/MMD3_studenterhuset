import React, { useState } from 'react'
import { connect } from 'react-redux'
import { commentOnPost } from '../../store/actions/posts'
import formatDate from '../../utils/formatDate'
import WithGradient from '../../hoc/WithGradient'

import classes from './Post.module.css'

const Post = ({ postData, commentOnPost, noComments }) => {
  const [input, setInput] = useState('')

  const sendComment = () => {
    // we don't wanna send the request if there's no user input
    if (input) {
      commentOnPost(postData._id, input)
      // resetting the value back to nothing after sending the request
      setInput('')
    }
  }

  return (
    <div style={{ marginBottom: 60 }}>
      <div className={classes.flex}>
        <WithGradient yellow>
          <div className={classes.avatar}>
            <div className={classes.avatarCircle}>
              <i className="fas fa-user"></i>
            </div>
          </div>
        </WithGradient>

        <div className={classes.post}>
          <div className={classes.postInfo}>
            <div className={classes.userInfo}>
              <h6>
                {postData.firstName} {postData.lastName}
              </h6>
              <p>{formatDate(postData.createdAt)}</p>
            </div>

            <div className={classes.comments}>
              <i className="fas fa-poo"></i>
              <p>{postData.comments.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* post text and comments */}
      <div>
        <div style={{ marginLeft: 70 }}>
          <p style={{ marginBottom: 0 }}>{postData.text}</p>
        </div>
        {!noComments &&
          postData.comments.map(comment => (
            <div
              key={comment._id}
              style={{
                borderTop: '2px solid #eee',
                paddingTop: 10,
                marginBottom: 20
              }}
            >
              <div className={classes.flex}>
                <WithGradient blue>
                  <div className={classes.avatar}>
                    <div className={classes.avatarCircleComment}>
                      <i className="fas fa-user"></i>
                    </div>
                  </div>
                </WithGradient>

                <div style={{ paddingLeft: 10 }}>
                  <h6 style={{ marginBottom: 0 }}>
                    {comment.firstName} {comment.lastName}
                  </h6>
                  <p>{comment.text}</p>
                </div>
              </div>
            </div>
          ))}

        {/* leave a comment input */}
        {!noComments && (
          <div style={{ padding: '2px 12px' }} className={classes.commentInput}>
            <input
              className={classes.input}
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Leave a comment..."
            />
            <span className={classes.sendButton} onClick={sendComment}>
              <i className="fas fa-location-arrow"></i>
            </span>
          </div>
        )}
      </div>
    </div>
  )
}

export default connect(null, { commentOnPost })(Post)
