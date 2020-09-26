import React, { Component } from 'react'
import { isAuthenticate } from '../auth'
import DefaultAvatar from '../images/post.jpg'
import { getPost, getUnAuthUser, likePost, unlikePost } from './apiPost'
import { Link, Redirect } from 'react-router-dom'
import DeletePost from './DeletePost'
import Comment from './Comment'
import { ReactTagify } from 'react-tagify'

class SinglePost extends Component {
  state = {
    post: {},
    redirectToSignin: false,
    like: false,
    likes: 0,
    comments: [],
    users: [],
  }

  componentDidMount() {
    if (!isAuthenticate()) return this.setState({ redirectToSignin: true })
    const token = isAuthenticate().token
    const postId = this.props.match.params.postId
    getPost(postId, token).then((data) => {
      if (data.err) console.log(data.err)
      this.setState({
        post: data,
        likes: data.likes.length,
        like: this.checkLike(data.likes),
        comments: data.comments,
      })
    })
    /* Get users */
    getUnAuthUser().then((data) => {
      if (data.error) {
        console.log(data.error)
      } else {
        this.setState({ users: data })
      }
    })
  }

  checkLike = (data) => {
    const userId = isAuthenticate().user._id
    return data.indexOf(userId) > -1
  }

  likeToggle = () => {
    const token = isAuthenticate().token
    const postId = this.props.match.params.postId
    const userId = isAuthenticate().user._id
    let callApi = this.state.like ? unlikePost : likePost
    callApi(postId, token, userId).then((data) => {
      if (data.err) console.log(data.err)
      this.setState((prevState) => ({
        like: !prevState.like,
        likes: data.likes.length,
      }))
    })
  }

  updateComments = (comments) => {
    this.setState({ comments: comments })
  }

  mentionRedirect = (username) => {
    const { users } = this.state
    console.log(users)
    const sameUser = users.find((user) =>
      user.postedBy.name.includes(username) ? user : null
    )
    const userId = sameUser.postedBy._id
    console.log(sameUser)
    if (isAuthenticate().token) {
      return this.props.history.push(`/user/${userId}`)
    } else {
      return this.props.history.push(`/unauthuser/${userId}`)
    }
  }

  render() {
    const tagStyle = {
      color: 'black',
      fontWeight: 'bold',
    }

    const mentionStyle = {
      color: 'blue',
      cursor: 'pointer',
    }
    const { post, likes, like, redirectToSignin, comments } = this.state
    let photoUrl = post
      ? `${process.env.REACT_APP_API_URL}/post/photo/${post._id}`
      : DefaultAvatar
    const posterId = post.postedBy ? post.postedBy._id : ''
    const posterName = post.postedBy ? post.postedBy.name : 'Unknown'
    if (redirectToSignin) return <Redirect to='/signin' />
    return (
      <div className='container'>
        {!post.title ? (
          <div className='jumbotron text-center'>
            <h2>Loading...</h2>
          </div>
        ) : (
          <>
            <h2 className='mt-5 mb-5 display-2'>{post.title}</h2>
            <img
              className='card-img-top'
              src={photoUrl}
              onError={(i) => (i.target.src = `${DefaultAvatar}`)}
              style={{ width: '100%', height: '30vw', objectFit: 'cover' }}
              alt='Caap'
            />
            <br />
            <br />

            {like && (
              <h3 onClick={this.likeToggle}>
                <i className='fas fa-thumbs-up text-info'>
                  {''} {likes} Like
                </i>
              </h3>
            )}
            {!like && (
              <h3 onClick={this.likeToggle}>
                <i className='fas fa-thumbs-up text-info'>
                  {''} {likes} Like
                </i>
              </h3>
            )}
            <p className='card-text'>
              <ReactTagify
                tagStyle={tagStyle}
                mentionStyle={mentionStyle}
                tagClicked={(tag) => this.mentionRedirect(tag.split('@')[1])}
              >
                {post.content}
              </ReactTagify>
            </p>
            <br />
            <p className='font-italic mark'>
              Posted By <Link to={`/user/${posterId}`}>{posterName}</Link>
              &nbsp; on {new Date(post.created).toDateString()}
            </p>
            <Link to={`/`} className='btn btn-primary btn-raised btn-sm mr-5'>
              Back to posts
            </Link>
            {isAuthenticate().user && isAuthenticate().user._id === posterId ? (
              <div className='d-inline-block'>
                <Link
                  className='btn btn-raised btn-success mr-5'
                  to={`/post/edit/${post._id}`}
                >
                  Update Post
                </Link>
                <DeletePost postId={post._id} />
              </div>
            ) : (
              ''
            )}
          </>
        )}
        <Comment
          postId={post._id}
          comments={comments}
          updateComments={this.updateComments}
        />
      </div>
    )
  }
}

export default SinglePost
