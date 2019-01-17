import React, { Component } from 'react'

export default class ReadString extends Component {

  state = {
    dataKey: null,
    usersKey: null,
  }

  componentDidMount() {
    const { drizzle, drizzleState } = this.props;
  
    console.log(drizzle, drizzleState)
    const contract = drizzle.contracts.StringStore;
    const wdContract = drizzle.contracts.WorkDone;
    console.log(wdContract)
    const dataKey = contract.methods["myString"].cacheCall();
    const usersKey = wdContract.methods.users("0x817d69DC65b378e0E45F87a475aa336509D278B5").call().then(res => console.log(res))

    this.setState({ dataKey, usersKey })
  }

  render() {
    const { dataKey, usersKey } = this.state;
    const { StringStore, WorkDone }= this.props.drizzleState.contracts;

    const myString = StringStore.myString[dataKey];
    const curUser = WorkDone.users[usersKey];
    console.log(curUser);

    return (
      <div>
        Hey there, your string is {myString && myString.value}
      </div>
    )
  }
}
