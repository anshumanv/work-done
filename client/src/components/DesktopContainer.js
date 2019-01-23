import React, { Component } from 'react';
import {
  Button,
  Container,
  Divider,
  Grid,
  Header,
  Icon,
  Image,
  List,
  Menu,
  Responsive,
  Segment,
  Sidebar,
  Popup,
  Visibility,
} from 'semantic-ui-react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const getWidth = () => {
  const isSSR = typeof window === 'undefined'

  return isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth
}

export default class DesktopContainer extends Component {
  state = {}

  hideFixedMenu = () => this.setState({ fixed: false })
  showFixedMenu = () => this.setState({ fixed: true })

  render() {
    const { children, drizzle, drizzleState } = this.props
    const { fixed } = this.state
    const address = drizzleState.accounts[0]
    return (
      <Responsive getWidth={getWidth} minWidth={Responsive.onlyTablet.minWidth}>
        <Visibility
          once={false}
          onBottomPassed={this.showFixedMenu}
          onBottomPassedReverse={this.hideFixedMenu}
        >
          <Segment
            inverted
            textAlign='center'
            style={{ padding: '1em 0em' }}
            vertical
          >
            <Menu
              fixed={fixed ? 'top' : null}
              inverted={!fixed}
              pointing={!fixed}
              secondary={!fixed}
              size='large'
            >
              <Container>
                <Menu.Item as={ Link } to='/' active>
                  Home
                </Menu.Item>
                <Menu.Item as={ Link } to="/register">Your Page</Menu.Item>
                <Menu.Item as={ Link } to='/about'>About</Menu.Item>
                <Menu.Item position='right'>
                  <Button as='a' href={`/u/${address}`} inverted={!fixed} primary={fixed} style={{ marginLeft: '0.5em' }}>
                    Profile
                  </Button>
                </Menu.Item>
                <Popup trigger={<Button icon='user' />} verticalOffset={20} content={`Your address - ${address}`} position='bottom center' inverted />
              </Container>
            </Menu>
          </Segment>
        </Visibility>

        {children}
      </Responsive>
    )
  }
}

DesktopContainer.propTypes = {
  children: PropTypes.node,
}
