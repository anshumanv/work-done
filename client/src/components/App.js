import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ReadString from './ReadString';
import Register from './Register';
import Profile from './Profile';
import SetString from './SetString';
import Landing from './Landing';
import MobileContainer from './MobileContainer'
import DesktopContainer from './DesktopContainer'
import NotFound from './NotFound';

const ResponsiveContainer = ({ children }) => (
  <div>
    <DesktopContainer>{children}</DesktopContainer>
    <MobileContainer>{children}</MobileContainer>
  </div>
)

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
            <Route path="/" exact render={() =>  <Landing />} />
            <ResponsiveContainer>
            <Switch>
              <Route path="/register" exact render={() =>  <Register drizzle={drizzle} drizzleState={drizzleState} />} />
              <Route path="/u/:userAddress" exact render={() =>  <Profile drizzle={drizzle} drizzleState={drizzleState} />} />
              <Route path="/read" exact render={() =>  <ReadString drizzle={drizzle} drizzleState={drizzleState} />} />
              <Route path="/edit" exact render={() => <SetString drizzle={drizzle} drizzleState={drizzleState} />} />
              <Route component={NotFound} />
            </Switch>
            </ResponsiveContainer>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
