import React, { Component } from 'react'
import { Dimmer, Loader, Grid } from 'semantic-ui-react'
import UserCard from './UserCard'
import UserForm from './UserForm'
import SupportUser from './SupportUser'

const styles = {
  profileRoot: {
    marginTop: '2rem'
  }
}

export default class Profile extends Component {
  
  state = {
    user: null,
    loading: true,
    registeredUser: null,
  }

  componentDidMount() {
    const { drizzle, drizzleState } = this.props;
    const contract = drizzle.contracts.WorkDone;

    contract.methods.users(drizzleState.accounts[0]).call().then(res => {
      const { userName, userAddress, email, info } = res;
      console.log(res)
      if (!res.email) {
        return this.setState({
          loading: false,
          registeredUser: false,
        })
      }
      this.setState({
        user: {
          userName,
          userAddress,
          email,
          info,
        }, loading: false, registeredUser: true
      })
    })
  }
  
  render() {
    const { user, loading, registeredUser } = this.state;
    const { drizzle, drizzleState } = this.props;
    const { profileRoot } = styles;

    if (loading) return (
      <Dimmer active>
        <Loader>Loading</Loader>
      </Dimmer>
    )

    if (!registeredUser) return (
      <UserForm drizzle={drizzle} drizzleState={drizzleState} />
    )
    return (
      <div>
        <Grid centered style={profileRoot} className="profile-root">
            <Grid.Column width={11}>
              <UserCard user={user} />
            </Grid.Column>
            <Grid.Column width={5}>
              <SupportUser user={user} />
            </Grid.Column>
        </Grid>
      </div>
    )
  }
}
