import React, { Component } from 'react'
import { getAllUser } from './apiUser'
import { Link } from 'react-router-dom'
import { isAuthenticate } from '../auth/index'

class Users extends Component {
  constructor() {
    super()
    this.state = {
      users: [],
    }
  }

  componentDidMount() {
    getAllUser().then((data) => {
      if (data.error) {
        console.log(data.error)
      } else {
        this.setState({ users: data })
      }
    })
  }

  renderUsers = (users) => (
    <div className='row'>
      {users.map((user, i) => (
        <div className='card col-md-4' key={i}>
          <img
            style={{ height: 'auto', width: '30vw' }}
            className='img-thumbnail'
            src={
              `${process.env.REACT_APP_API_URL}/user/photo/${user._id}` ||
              `https://robohash.org/${user.name}`
            }
            onError={(i) =>
              (i.target.src = `https://robohash.org/${user.name}`)
            }
            alt={user.name}
          />
          <div className='card-body'>
            <h5 className='card-title'>{user.name}</h5>
            <p className='card-text'>{user.email}</p>

              { isAuthenticate().token ?
             <Link
              to={`/user/${user._id}`}
              className='btn btn-raised btn-primary btn-sm'
            >
              View Profile
            </Link>
            :
             <Link
              to={`/unauthuser/${user._id}`}
              className='btn btn-raised btn-primary btn-sm'
            >
              View Profile
            </Link>
            }
          </div>
        </div>
      ))}
    </div>
  )

  render() {
    const { users } = this.state
    return (
      <div className='container'>
        <h2 className='mt-5 mb-5'>Users</h2>

        {this.renderUsers(users)}
      </div>
    )
  }
}

export default Users
