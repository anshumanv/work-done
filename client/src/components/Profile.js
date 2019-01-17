import React, { Component } from 'react'
import UserCard from './UserCard'

export default class Profile extends Component {
  
  state = {
    user: null
  }

  componentDidMount() {
    const { drizzle, drizzleState } = this.props;
    const contract = drizzle.contracts.WorkDone;

    contract.methods.users(drizzleState.accounts[0]).call().then(res => {
      const { userName, userAddress, email, info } = res;
      this.setState({
        user: {
          userName,
          userAddress,
          email,
          info,
        }
      })
    })
  }
  
  render() {
    const { user } = this.state;
    return (
      <div>
        <UserCard user={user} />
      </div>
    )
  }
}
