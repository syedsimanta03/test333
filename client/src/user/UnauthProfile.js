import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { getUnAuthUser } from '../post/apiPost'
import { ReactTagify } from 'react-tagify'
class UnauthProfile extends Component {
  constructor() {
    super()
    this.state = {
      users: [],
    }
  }

  componentDidMount() {
    getUnAuthUser().then((data) => {
      console.log(data)
      if (data.error) {
        console.log(data.error)
      } else {
        this.setState({ users: data })
      }
    })
  }

  tagStyle = {
    color: 'black',
    fontWeight: 'bold',
  }

  mentionStyle = {
    color: 'blue',
    cursor: 'pointer',
  }

  mentionRedirect = (username) => {
    const { users } = this.state
    const sameUser = users.find((user) =>
      user.postedBy.name.includes(username) ? user : null
    )
    const userId = sameUser.postedBy._id
    return this.props.history.push(`/unauthuser/${userId}`)
  }

  render() {
    const { users } = this.state
    const {
      match: { params },
    } = this.props

    const renderUsers = users.filter(
      (user) => user.postedBy._id === params.userId
    )

    const userInfo = [
      ...new Set(renderUsers.map((user) => user.postedBy.name)),
    ].toString()

    return (
      <div className='container mt-5'>
        <div className='row'>
          <div className='card col-md-4'>
            <img
              style={{ height: 'auto', width: '30vw' }}
              className='img-thumbnail'
              src={
                `/user/photo/${params._id}` ||
                `https://robohash.org/${userInfo}`
              }
              onError={(i) =>
                (i.target.src = `https://robohash.org/${userInfo}`)
              }
              alt={userInfo}
            />
            <div className='card-body'>
              <h5 className='card-title'>{userInfo}</h5>
            </div>
          </div>
          <div className='col-md-8'>
            {renderUsers.map((user, i) => (
              <div className='card'>
                <div className='bg-white shadow p-5'>
                  <h5>{user.title}</h5>
                  <ReactTagify
                    tagStyle={this.tagStyle}
                    mentionStyle={this.mentionStyle}
                    tagClicked={(tag) =>
                      this.mentionRedirect(tag.split('@')[1])
                    }
                  >
                    {user.content}
                  </ReactTagify>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(UnauthProfile)
