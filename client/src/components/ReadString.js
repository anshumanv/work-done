import React, { Component } from 'react'

export default class ReadString extends Component {

  state = {
    dataKey: null
  }

  componentDidMount() {
    const { drizzle, drizzleState } = this.props;
  
    console.log(drizzle, drizzleState)
    const contract = drizzle.contracts.StringStore;
    const dataKey = contract.methods["myString"].cacheCall();

    this.setState({ dataKey})
  }

  render() {
    const { dataKey } = this.state;
    const { StringStore }= this.props.drizzleState.contracts;

    const myString = StringStore.myString[dataKey];


    return (
      <div>
        Hey there, your string is {myString && myString.value}
      </div>
    )
  }
}
