import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import DefaultAvatar from '../images/avatar.png';

class ProfileTabs extends Component {
  render() {
    const {
      followers,
      following,
      posts,
      mentions,
      liked,
      follwingPosts,
    } = this.props
    return (
      <div>
        <div className='row'>
          <div className='col'>
            <h3 className='text-primary'>Followers</h3>
            <hr />
            <hr />
            {followers &&
              followers.length &&
              followers.map((person) => (
                <div key={person._id}>
                  <div className='row'>
                    <Link to={`/user/${person._id}`}>
                      <img
                        style={{
                          borderRadius: '50%',
                          border: '2px solid black',
                        }}
                        className='mr-3'
                        src={`${process.env.REACT_APP_API_URL}/user/photo/${person._id}`}
                        onError={(i) => (i.target.src = `${DefaultAvatar}`)}
                        alt={person.name}
                        height='40px'
                        weight='40px'
                      />
                      <h3 className='lead' style={{ display: 'inline' }}>
                        {person.name}
                      </h3>
                    </Link>
                  </div>
                </div>
              ))}
          </div>

          <div className='col'>
            <h3 className='text-primary'>Following</h3>
            <hr />
            <hr />
            {following &&
              following.length &&
              following.map((person) => (
                <div key={person._id}>
                  <div className='row'>
                    <div>
                      <Link to={`/user/${person._id}`}>
                        <img
                          style={{
                            borderRadius: '50%',
                            border: '2px solid black',
                          }}
                          className='mr-3'
                          src={`${process.env.REACT_APP_API_URL}/user/photo/${person._id}`}
                          onError={(i) => (i.target.src = `${DefaultAvatar}`)}
                          alt={person.name}
                          height='40px'
                          weight='40px'
                        />
                        <h3 className='lead' style={{ display: 'inline' }}>
                          {person.name}
                        </h3>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
          </div>

          <div className='col'>
            <h3 className='text-primary'>Posts</h3>
            <hr />
            <hr />
            {posts && posts.length ? (
              posts.map((post) => (
                <div key={post._id}>
                  <Link to={`/post/${post._id}`}>
                    <p className='lead'>{post.title}</p>
                  </Link>
                </div>
              ))
            ) : (
              <p>No post yet</p>
            )}
          </div>
          <div className='col'>
            <h3 className='text-primary'>Mentions</h3>
            <hr />
            <hr />
            {mentions && mentions.length ? (
              mentions.map((mention) => (
                <div key={mention._id}>
                  <Link to={`/post/${mention._id}`}>
                    <p className='lead'>{mention.title}</p>
                  </Link>
                </div>
              ))
            ) : (
              <p>No mention yet</p>
            )}
          </div>
          <div className='col'>
            <h3 className='text-primary'>Liked</h3>
            <hr />
            <hr />
            {liked && liked.length ? (
              liked.map((like) => (
                <div key={like._id}>
                  <Link to={`/post/${like._id}`}>
                    <p className='lead'>{like.title}</p>
                  </Link>
                </div>
              ))
            ) : (
              <p>No liked post yet</p>
            )}
          </div>
        </div>

        <br />
        <br />
        <br />

        <div className='row'>
          <div className='col-md-12'>
            <h3 className='text-primary mt-5'>Following User's Posts</h3>
            <hr />
            <hr />
            {follwingPosts && follwingPosts.length ? (
              follwingPosts.map((post) => (
                <>
                  <div key={post._id} className='card mb-1 p-3'>
                    <Link to={`/post/${post._id}`}>
                      <p className='lead'>{post.title}</p>
                      <p>
                        {post.content} by{' '}
                        <strong className='blue-text'>
                          {post.postedBy.name}
                        </strong>{' '}
                      </p>
                    </Link>
                  </div>
                  <hr />
                </>
              ))
            ) : (
              <p>No post yet</p>
            )}
          </div>
        </div>
      </div>
    )
  }
}

export default ProfileTabs;
