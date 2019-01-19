import React, { Component } from 'react'
import UserForm from './UserForm'

const styles = {
  formRoot: {
    margin: '2rem',
    display: 'flex',
    justifyContent: 'center'
  }
}

export default class Register extends Component {
  render() {
    const { drizzle, drizzleState } = this.props;
    return (
      <div style={styles.formRoot}>
        <UserForm drizzle={drizzle} drizzleState={drizzleState} />
      </div>
    )
  }
}
