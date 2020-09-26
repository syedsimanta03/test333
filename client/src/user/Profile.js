import React, { Component } from 'react'
import { isAuthenticate } from '../auth'
import { Redirect, Link, withRouter } from 'react-router-dom'
import { getUser } from './apiUser'
import DeleteProfile from './DeleteProfile'
import FollowProfileButton from './FollowProfileButton'
import ProfileTabs from './ProfileTabs'
import {
  getAllPost,
  getDynamic,
  getPostByUser,
  getFollowingUserPost,
} from '../post/apiPost'

class Profile extends Component {
  constructor() {
    super()
    this.state = {
      user: { following: [], followers: [] },
      redirectToSignin: false,
      following: false,
      error: '',
      posts: [],
      users: [],
      mentionUsername: '',
      likedPosts: [],
      followingUsersPost: []
    }
  }

  checkFollow = (user) => {
    const jwt = isAuthenticate()
    if (user && user.followers) {
      const match = user.followers.find((follower) => {
        return follower._id === jwt.user._id || 0
      })
      return match
    }
  }

  clickFollowButton = (callApi) => {
    const userId = isAuthenticate().user._id
    const token = isAuthenticate().token

    callApi(userId, token, this.state.user._id).then((data) => {
      if (data.error) {
        this.setState({ error: data.error })
      } else {
        this.setState({ user: data, following: !this.state.following })
      }
    })
  }

  // initialize user's data
  init = (userId) => {
    const token = isAuthenticate().token

    getUser(userId, token) // read method must return something
      .then((data) => {
        console.log(data)
        if (data.error) {
          console.log('ERROR')
          this.setState({ redirectToSignin: true })
        } else {
          let following = this.checkFollow(data)
          this.setState({ user: data, following })
          this.setState({ mentionUsername: this.state.user.name })
          console.log(this.state.mentionUsername)
          this.loadPosts(data._id)
        }
      })
  }

  /* Get users */
  loadMentions = () => {
    const mention = this.state.mentionUsername
    getDynamic(mention).then((data) => {
      console.log(data)
      if (data.error) {
        console.log(data.error)
      } else {
        this.setState({ users: data })
      }
    })
  }

  /* Get following users posts */
  loadFollowing = () => {
    const followingIds = this.state.user.following
      .map((user) => user._id)
      .join(',')

    getFollowingUserPost(followingIds).then((data) => {
      console.log(data)
      if (data.error) {
        console.log(data.error)
      } else {
        this.setState({ followingUsersPost: data })
      }
    })
  }

  /* Get Liked posts */
  loadLikedPosts = () => {
    getAllPost().then((data) => {
      const {
        match: { params },
      } = this.props
      if (data.error) {
        console.log(data.error)
      } else {
        const postLiked = data.filter((post) =>
          post.likes.includes(params.userId)
        )
        console.log(postLiked.includes(params.userId))

        this.setState({ likedPosts: postLiked })
      }
    })
  }

  loadPosts = (userId) => {
    console.log(userId)
    const token = isAuthenticate().token
    getPostByUser(userId, token).then((data) => {
      if (data.error) {
      } else {
        this.setState({ posts: data })
      }
    })

    this.loadMentions()
    this.loadLikedPosts()
    this.loadFollowing()
  }

  componentDidMount() {
    console.log('user id from route params: ', this.props.match.params.userId)
    const userId = this.props.match.params.userId
    this.init(userId)
  }

  // another lifecycle that grabs props from react-dom; fires up when props changes
  componentWillReceiveProps(props) {
    const userId = props.match.params.userId
    this.init(userId)
  }

  render() {
    console.log(this.state.user.following.map((user) => user._id).join(','))
    const { redirectToSignin, user, users, posts, likedPosts,followingUsersPost } = this.state
    if (redirectToSignin) return <Redirect to='/signin' />
    const photoUrl = user._id
      ? `${process.env.REACT_APP_API_URL}/user/photo/${
          user._id
        }?${new Date().getTime()}`
      : `https://robohash.org/${user.name}`

    return (
      <div className='container'>
        <h2 className='mt-5 mb-5'>Profile</h2>
        <div className='row'>
          <div className='col-md-6'>
            <img
              style={{ height: '200px', width: 'auto' }}
              className='img-thumbnail'
              src={photoUrl}
              onError={(i) =>
                (i.target.src = `https://robohash.org/${user.name}`)
              }
              alt={user.name}
            />
          </div>

          <div className='col-md-6'>
            <div className='lead mt-2'>
              <p>Hello, {user.name}</p>
              <p>Email: {user.email}</p>
              <p>{`Joined ${new Date(user.created).toDateString()}`}</p>
            </div>

            {isAuthenticate().user && isAuthenticate().user._id === user._id ? (
              <div className='d-line-block'>
                <Link
                  className='btn btn-raised btn-success mr-5'
                  to={`/user/edit/${user._id}`}
                >
                  Edit Profile
                </Link>

                <DeleteProfile userId={user._id} />
              </div>
            ) : (
              <FollowProfileButton
                following={this.state.following}
                onButtonClick={this.clickFollowButton}
              />
            )}
          </div>
        </div>
        <div className='container-fluid'>
          <hr />
          <p className='lead'>{user.about}</p>

          <hr />
          <ProfileTabs
            followers={user.followers}
            following={user.following}
            posts={posts}
            mentions={users}
            liked={likedPosts}
            follwingPosts={followingUsersPost}
          />
        </div>
      </div>
    )
  }
}

export default withRouter(Profile)
