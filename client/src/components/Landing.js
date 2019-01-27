import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Link } from 'react-router-dom';
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
  Popup,
  Sidebar,
  Visibility,
} from 'semantic-ui-react'

// Heads up!
// We using React Static to prerender our docs with server side rendering, this is a quite simple solution.
// For more advanced usage please check Responsive docs under the "Usage" section.
const getWidth = () => {
  const isSSR = typeof window === 'undefined'

  return isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth
}

/* eslint-disable react/no-multi-comp */
/* Heads up! HomepageHeading uses inline styling, however it's not the best practice. Use CSS or styled components for
 * such things.
 */
const HomepageHeading = ({ mobile }) => (
  <Container text>
    <Header
      as='h1'
      content='Work Done'
      inverted
      style={{
        fontSize: mobile ? '2em' : '4em',
        fontWeight: 'normal',
        marginBottom: 0,
        marginTop: mobile ? '1.5em' : '3em',
      }}
    />
    <Header
      as='h2'
      content='Support content creators on the internet in a decentralised way.'
      inverted
      style={{
        fontSize: mobile ? '1.5em' : '1.7em',
        fontWeight: 'normal',
        marginTop: mobile ? '0.5em' : '1.5em',
      }}
    />
    <Button as='a' href='/profile' primary size='huge'>
      Go!
      <Icon name='right arrow' />
    </Button>
  </Container>
)

HomepageHeading.propTypes = {
  mobile: PropTypes.bool,
}

/* Heads up!
 * Neither Semantic UI nor Semantic UI React offer a responsive navbar, however, it can be implemented easily.
 * It can be more complicated, but you can create really flexible markup.
 */
class DesktopLanding extends Component {
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
            style={{ minHeight: 700, padding: '1em 0em' }}
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
                <Menu.Item as={ Link } to="/register">Register</Menu.Item>
                <Menu.Item as={ Link } to='/about'>About</Menu.Item>
                <Menu.Item position='right'>
                  <Button as={ Link } to={`/u/${address}`} inverted={!fixed} primary={fixed} style={{ marginLeft: '0.5em' }}>
                    Profile
                  </Button>
                </Menu.Item>
                <Popup trigger={<Button icon='user' />} verticalOffset={20} content={`Your address - ${address}`} position='bottom center' inverted />
              </Container>
            </Menu>
            <HomepageHeading />
          </Segment>
        </Visibility>

        {children}
      </Responsive>
    )
  }
}

DesktopLanding.propTypes = {
  children: PropTypes.node,
}

class MobileLanding extends Component {
  state = {}

  handleSidebarHide = () => this.setState({ sidebarOpened: false })

  handleToggle = () => this.setState({ sidebarOpened: true })

  render() {
    const { sidebarOpened } = this.state
    const { children, drizzleState } = this.props
    const address = drizzleState.accounts[0]

    return (
      <Responsive
        as={Sidebar.Pushable}
        getWidth={getWidth}
        maxWidth={Responsive.onlyMobile.maxWidth}
      >
        <Sidebar
          as={Menu}
          animation='push'
          inverted
          onHide={this.handleSidebarHide}
          vertical
          visible={sidebarOpened}
        >
          <Menu.Item as={ Link } to='/' active>
            Home
          </Menu.Item>
          <Menu.Item as={ Link } to="/register">Register</Menu.Item>
          <Menu.Item as={ Link } to='/about'>About</Menu.Item>
        </Sidebar>

        <Sidebar.Pusher dimmed={sidebarOpened}>
          <Segment
            inverted
            textAlign='center'
            style={{ minHeight: 350, padding: '1em 0em' }}
            vertical
          >
            <Container>
              <Menu inverted pointing secondary size='large'>
                <Menu.Item onClick={this.handleToggle}>
                  <Icon name='sidebar' />
                </Menu.Item>
                <Menu.Item position='right'>
                <Button as={ Link } to={`/u/${address}`} inverted style={{ marginLeft: '0.5em' }}>
                    Profile
                  </Button>
                </Menu.Item>
              </Menu>
            </Container>
            <HomepageHeading mobile />
          </Segment>

          {children}
        </Sidebar.Pusher>
      </Responsive>
    )
  }
}

MobileLanding.propTypes = {
  children: PropTypes.node,
}

const ResponsiveContainer = ({ children, drizzle, drizzleState }) => (
  <div>
    <DesktopLanding drizzle={drizzle} drizzleState={drizzleState}>{children}</DesktopLanding>
    <MobileLanding drizzle={drizzle} drizzleState={drizzleState}>{children}</MobileLanding>
  </div>
)

ResponsiveContainer.propTypes = {
  children: PropTypes.node,
}

const Landing = ({ drizzle, drizzleState }) => (
  <ResponsiveContainer drizzle={drizzle} drizzleState={drizzleState}>
    <Segment style={{ padding: '8em 0em' }} vertical>
      <Grid container stackable verticalAlign='middle'>
        <Grid.Row>
          <Grid.Column width={8}>
            <Header as='h3' style={{ fontSize: '2em' }}>
              About
            </Header>
            <p style={{ fontSize: '1.33em' }}>
              Work Done is a platform which is intended for people to recieve support for the work they're doing and sharing on the internet, the creator can just create their profile page and share it's link which can be used by people to provide support for the content they're creating and the hard work they're doing. 😝
            </p>
          </Grid.Column>
          <Grid.Column floated='right' width={6}>
            <Image bordered rounded size='large' src='../icon256.png' />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column textAlign='center'>
            <Button size='huge'>Woah! 💰</Button>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>

    <Segment style={{ padding: '0em' }} vertical>
      <Grid celled='internally' columns='equal' stackable>
        <Grid.Row textAlign='center'>
          <Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
            <Header as='h3' style={{ fontSize: '2em' }}>
              "Creators"
            </Header>
            <p style={{ fontSize: '1.33em' }}>Create your dedicated profile page and generate a link which can be shared to recieve support.</p>
          </Grid.Column>
          <Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
            <Header as='h3' style={{ fontSize: '2em' }}>
              "Supporters"
            </Header>
            <p style={{ fontSize: '1.33em' }}>
              Visit a profile you want to provide support to and then select the amount with which you wanna support and confirm the transaction! Get interesting badges and statistics for your contributions and get featured in the leaderboard.
            </p>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>

    <Segment style={{ padding: '8em 0em' }} vertical>
      <Container text>
        <Header as='h3' style={{ fontSize: '2em' }}>
          Roadmap
        </Header>
        <p style={{ fontSize: '1.33em' }}>
          Get things to work, share profile link, execute transactions
        </p>
        <Button as='a' href='/about' size='large'>
          Read More
        </Button>

        <Divider
          as='h4'
          className='header'
          horizontal
          style={{ margin: '3em 0em', textTransform: 'uppercase' }}
        >
          <a href='#'>Creator?</a>
        </Divider>

        <Header as='h3' style={{ fontSize: '2em' }}>
          Create your own page and start sharing!
        </Header>
        <p style={{ fontSize: '1.33em' }}>
          You can create your WD page and add it's links on your projects which people can use to support you.
        </p>
        <Button as='a' href='/register' size='large'>
          Yes! Create my page
        </Button>
      </Container>
    </Segment>

    <Segment inverted vertical style={{ padding: '5em 0em' }}>
      <Container>
        <Grid divided inverted stackable>
          <Grid.Row>
            <Grid.Column width={3}>
              <Header inverted as='h4' content='About' />
              <List link inverted>
                <List.Item as='a' href="/about">How it works?</List.Item>
                <List.Item as='a' href="/about">About</List.Item>
                <List.Item as='a' href="/register">Create your page</List.Item>
                <List.Item as='a' href="https://github.com/dev-bootcamp-2019/final-project-anshumanv">Report an issue</List.Item>
              </List>
            </Grid.Column>
            <Grid.Column width={7}>
              <Header as='h4' inverted>
                Work Done
              </Header>
              <p>
                Support content creators on the internet in a decentralised way and show off your contributions
              </p>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    </Segment>
  </ResponsiveContainer>
)

export default Landing