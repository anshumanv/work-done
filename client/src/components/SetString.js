import React, { Component } from 'react'

export default class SetString extends Component {

  state = {
    stackId: null
  };

  handleKeyDown = e => {
    if(e.keyCode === 13) {
      this.setValue(e.target.value)
    }
  }


  setValue = value => {
    const { drizzle, drizzleState } = this.props;
    const contract = drizzle.contracts.StringStore;

    const stackId = contract.methods["set"].cacheSend(value, {
      from: drizzleState.accounts[0]
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
    return (
      <div>
        <input type="text" onKeyDown={this.handleKeyDown} />
        <div>{this.getTxStatus()}</div>
      </div>
    )
  }
}
