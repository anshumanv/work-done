import React, { Component } from 'react'
import { Form } from 'semantic-ui-react'

const styles = {
  formStyles: {
    width: '75%',
    maxWidth: '600px'
  }
}

class UserForm extends Component {
  state = { name: '', email: '', info: '', userName: '', stackId: null }

  handleChange = (e, { name, value }) => this.setState({ [name]: value })

  handleSubmit = () => {
    const { name, email, info, userName } = this.state
    const { drizzle, drizzleState } = this.props;
    const contract = drizzle.contracts.WorkDone;
    const userAddress = drizzleState.accounts[0];
    const payload = {
      email,
      userName,
      info
    }
    console.log(contract)
    const stackId = contract.methods.createUser.cacheSend(userName, info, email , {
      from: drizzleState.accounts[0]
    })
    this.setState({ stackId })
  }

  getTxStatus = () => {
    const { stackId } = this.state;
    const { transactions, transactionStack } = this.props.drizzleState;

    const txHash = transactionStack[stackId];

    if(!txHash) return null;

    return `Transaction status: ${transactions[txHash].status}`; 
  }

  render() {
    const { name, email, info, userName } = this.state

    return (
      <div style={styles.formStyles}>
        <Form onSubmit={this.handleSubmit}>
          <Form.Input
            placeholder='Name'
            name='name'
            value={name}
            label="Name"
            onChange={this.handleChange}
          />
          <Form.Input
            placeholder='Email'
            name='email'
            value={email}
            label="Email"
            onChange={this.handleChange}
          />
          <Form.Input
            placeholder='Info'
            name='info'
            value={info}
            label="What you do"
            onChange={this.handleChange}
          />
          <Form.Input
            placeholder='User Name'
            name='userName'
            value={userName}
            label="Username"
            onChange={this.handleChange}
          />
          <Form.Button content='Submit' />
        </Form>
        <strong>onChange:</strong>
        <pre>{JSON.stringify({ name, email, info, userName }, null, 2)}</pre>
        <div>{this.getTxStatus()}</div>
      </div>
    )
  }
}

export default UserForm
