import React, { Component } from 'react'
import { drizzleConnect } from 'drizzle-react'
import UserForm from './UserForm'

const styles = {
  formRoot: {
    margin: '2rem',
    display: 'flex',
    justifyContent: 'center'
  }
}

class Register extends Component {
  render() {
    const { drizzle, drizzleState } = this.props;
    return (
      <div style={styles.formRoot}>
        <UserForm drizzle={drizzle} drizzleState={drizzleState} />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    drizzleState: state,
    WorkDone: state.contracts.WorkDone
  }
}

export default drizzleConnect(Register, mapStateToProps)
