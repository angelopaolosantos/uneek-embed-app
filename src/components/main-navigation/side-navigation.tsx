import { Button, Drawer, Nav, Icon, Navbar } from 'rsuite'
import NavigationBlock from './side-navigation-drawer'
import Link from 'next/link'
import { Component } from 'react'

const styles = { width: 100 };
type AppProps = {
}

type AppState = {
  backdrop: boolean
  show: boolean
  placement: 'left'|'right'
  full: boolean
}

class SideNavigation extends Component<AppProps, AppState> {
  constructor(props) {
    super(props);
    this.state = {
      backdrop: true,
      show: false,
      placement: 'left',
      full: true
    };
    this.close = this.close.bind(this);
    this.toggleDrawer = this.toggleDrawer.bind(this);
  }
  close() {
    this.setState({
      show: false
    });
  }
  toggleDrawer() {
    this.setState({ show: true });
  }
  render() {
    const { backdrop, show, placement, full } = this.state;

    return (
      <div className="container">
        <div className="side-navigation-block">
          <Navbar appearance="subtle">
            <Navbar.Header>
              <Link href="/">
                <a><img className="navbar-brand logo" src='/images/UNEEK_LOGO_WEB_150px.png' /></a>
              </Link>
            </Navbar.Header>
            <Navbar.Body>
              <Nav pullRight>
                <Nav.Item onClick={this.toggleDrawer}><Icon icon='bars' /></Nav.Item>
              </Nav>
            </Navbar.Body>
          </Navbar>
          <Drawer backdrop={backdrop} show={show} onHide={this.close} placement={placement} full={full}>
            <Drawer.Header>
              <Drawer.Title>Menu</Drawer.Title>
            </Drawer.Header>
            <Drawer.Body>
              <NavigationBlock />
            </Drawer.Body>
            <Drawer.Footer>
              <Button onClick={this.close} appearance="subtle">
                Close
            </Button>
            </Drawer.Footer>
          </Drawer>
        </div>
        <style jsx>{`
      .side-navigation-block {
        
      }

      .container {
        font-family: 'Asap', sans-serif;
      }

      .navbar-brand {
      padding: 5px 5px;
      height: 50px;
      display: inline-block;
      }

      body {
        font-family: 'Roboto', sans-serif;
      }
      `}</style>
      </div>
    );
  }
}

export default SideNavigation