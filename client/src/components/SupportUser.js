import React, { Component } from 'react'
import { Header, Grid, Form, Input } from 'semantic-ui-react';

export default class SupportUser extends Component {
  state = {
    amount: 0
  }

  handleChange = (e, { name, value }) => this.setState({ [name]: value })

  sendTransaction = () => {
    console.log('lel')
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
        </Grid.Column>
        </Grid>
      </div>
    )
  }
}
