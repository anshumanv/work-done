import React, { Component } from 'react'
import { Dimmer, Loader, Grid } from 'semantic-ui-react'
import UserCard from './UserCard'
import UserForm from './UserForm'
import SupportUser from './SupportUser'
import NotFound from './NotFound'

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
    const profileAddress = window.location.href.split('/')[4]
    console.log(profileAddress)
    try {
      contract.methods.users(profileAddress).call().then(res => {
        const { userName, userAddress, email, info, donationsGiven, donationsRecieved } = res;
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
            donationsGiven,
            donationsRecieved
          }, loading: false, registeredUser: true
        })
      })
      
    } catch (error) {
      console.log(error)
      this.setState({
        registeredUser: false,
        loading: false
      })
    }
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
      <NotFound />
    )
    return (
      <div>
        <Grid centered style={profileRoot} className="profile-root">
            <Grid.Column width={11}>
              <UserCard user={user} />
            </Grid.Column>
            <Grid.Column width={5}>
              <SupportUser drizzle={drizzle} drizzleState={drizzleState} user={user} />
            </Grid.Column>
        </Grid>
      </div>
    )
  }
}
