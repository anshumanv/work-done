import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
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
        <Router>
          <div>
            <Route path="/" exact render={() =>  <ReadString drizzle={drizzle} drizzleState={drizzleState} />} />
            <Route path="/edit" exact render={() => <SetString drizzle={drizzle} drizzleState={drizzleState} />} />
          </div>
        </Router>
          Drizzle Loaded!
          
          
      </div>
    );
  }
}

export default App;
