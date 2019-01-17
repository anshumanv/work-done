import React, { Component } from 'react'
import { Card, Icon, Image, Grid, Header } from 'semantic-ui-react'

export default class UserCard extends Component {
  render() {
    const { user } = this.props;
    if( !user ) return <div>Loading...</div>
    return (
      <div>
        <Grid style={{paddingLeft: '3rem'}}>
          <Grid.Column>
          <Header as='h2'>
            <Image src="https://avatars2.githubusercontent.com/u/21009455?s=300&v=4" style={{width: '8.5em'}} size='small' circular ></Image>
            <Header.Content>
              { user.userName }
              <Header.Subheader>Developer</Header.Subheader>
            </Header.Content>
          </Header>
          <Header as='h3'>
            What I do
            <Header.Subheader>{ user.info }</Header.Subheader>
          </Header>
          <Header as='h3'>
            Address
            <Header.Subheader>{ user.userAddress }</Header.Subheader>
          </Header>
          <Header as='h3'>
            Email
            <Header.Subheader>{ user.email }</Header.Subheader>
          </Header>
          </Grid.Column>
        </Grid>
      </div>
    )
  }
}
