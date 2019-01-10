import React, { Component } from 'react';
import ReadString from './ReadString';
import SetString from './SetString';

class App extends Component {
  state = {
    loading: true,
    drizzleState: null
  }

  componentDidMount() {
    const { drizzle } = this.props;
    
    this.unsubscribe = drizzle.store.subscribe(() => {
      const drizzleState = drizzle.store.getState();

      if(drizzleState.drizzleStatus.initialized) {
        this.setState({ loading: false, drizzleState})
      }
    })
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    const { drizzle } = this.props;
    const { loading, drizzleState } = this.state;

    if(loading) return "Loading Drizzle ...";

    return (
      <div className="App">
        Drizzle Loaded!
        <ReadString drizzle={drizzle} drizzleState={drizzleState} />
        <SetString drizzle={drizzle} drizzleState={drizzleState} />
      </div>
    );
  }
}

export default App;
