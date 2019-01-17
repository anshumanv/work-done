import React, { Component } from 'react'
import UserForm from './UserForm'

export default class Register extends Component {
  render() {
    const { drizzle, drizzleState } = this.props;
    return (
      <div>
        <UserForm drizzle={drizzle} drizzleState={drizzleState} />
      </div>
    )
  }
}
