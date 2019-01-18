import React, { Component } from 'react'
import { Header, Grid, Form, Input } from 'semantic-ui-react';

export default class SupportUser extends Component {
  state = {
    amount: 0,
    stackId: null,
  }

  handleChange = (e, { name, value }) => this.setState({ [name]: value })

  sendTransaction = () => {
    console.log('lel')
    const { drizzle, drizzleState, user: {userAddress } } = this.props;
    const { amount } = this.state;
    const contract = drizzle.contracts.WorkDone;

    const stackId = contract.methods.donate.cacheSend(userAddress, {
      from: drizzleState.accounts[0],
      value: amount
    })

    this.setState({ stackId });
  }

  getTxStatus = () => {
    const { stackId } = this.state;
    const { transactions, transactionStack } = this.props.drizzleState;

    const txHash = transactionStack[stackId];

    if(!txHash) return null;

    return `Transaction status: ${transactions[txHash].status}`; 
  }

  render() {
    const { amount } = this.state;
    const { user } = this.props;
    return (
      <div>
        <Grid style={{paddingRight: '3rem'}}>
          <Grid.Column>
        <Header as='h3'>
          Support { user.userName } 🎉
          <Header.Subheader>Please pick the amount you wanna support with and confirm transaction! 💸</Header.Subheader>
        </Header>
        <Form onSubmit={this.sendTransaction}>
          <Form.Field required>
            <label>Support worth:</label>
            <Input placeholder='Eth' name='amount' value={amount} onChange={this.handleChange} type='number' />
          </Form.Field>
          <Form.Button content='💲 Support' type='submit' />
        </Form>
        <div>{this.getTxStatus()}</div>
        </Grid.Column>
        </Grid>
      </div>
    )
  }
}
