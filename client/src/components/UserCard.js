import React, { Component } from 'react'
import { Card, Icon, Image } from 'semantic-ui-react'

export default class UserCard extends Component {
  render() {
    const { user } = this.props;
    if( !user ) return <div>Loading...</div>
    return (
      <div>
        <Card>
          <Image src='https://avatars2.githubusercontent.com/u/21009455?s=400&v=4' />
          <Card.Content>
            <Card.Header>{user.userName}</Card.Header>
            <Card.Meta>
              <span className='date'>Joined in 2015</span>
            </Card.Meta>
            <Card.Meta>
              <span className='date'>{user.email}</span>
              <span className='date'>{user.userAddress}</span>
            </Card.Meta>
            <Card.Description>{user.info}</Card.Description>
          </Card.Content>
          <Card.Content extra>
            <a>
              <Icon name='user' />
              22 Friends
            </a>
          </Card.Content>
        </Card>
      </div>
    )
  }
}
