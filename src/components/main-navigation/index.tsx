import MainNavigation from './main-navigation'
import SideNavigation from './side-navigation'
import { useState, Component } from 'react'

type AppState = {
  activeKey: any
  isMobile: boolean
  isSticky: boolean
  stickyOffset: number
}

class Navigation extends Component<{}, AppState> {
  constructor(props) {
    super(props);
    this.handleSelect = this.handleSelect.bind(this);
    this.state = {
      activeKey: null,
      isMobile: false,
      isSticky: false,
      stickyOffset: 0
    };
  }
  handleSelect(eventKey) {
    this.setState({
      activeKey: eventKey
    });
  }

  componentDidMount() {
    window.addEventListener("resize", this.handleResize.bind(this));
    this.handleResize();

    window.addEventListener("scroll", this.handleSticky.bind(this));
    this.handleSticky();
  }
  
  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize.bind(this));
    window.removeEventListener("scroll", this.handleSticky.bind(this));
  }

  handleSticky() {
    const navbar = document.getElementById('navbar')
    
    if (this.state.isSticky==false){
      const sticky = navbar.offsetTop
      if(window.pageYOffset >= sticky) {
        navbar.classList.add('sticky')
        navbar.classList.remove('nav-wrapper')
        this.setState({isSticky: true, stickyOffset: sticky})
        // console.log(`isSticky: `, this.state.isSticky)
      }
    } else if(window.pageYOffset < this.state.stickyOffset) {
      navbar.classList.remove('sticky')
      navbar.classList.add('nav-wrapper')
      this.setState({isSticky: false, stickyOffset: 0})
      // console.log(`isSticky: `, this.state.isSticky)
    } else if (window.pageYOffset > 0 && this.state.stickyOffset==0) {
      this.setState({stickyOffset: 50})
    }
  }

  handleResize() {
    let isMobile = (window.innerWidth <= 992);
    if (isMobile !== this.state.isMobile) {
      this.setState({ isMobile });
    }
  }

  render() {
    const { isMobile, isSticky } = this.state;
    let navigation

    if (isMobile) {
      navigation = <SideNavigation />
    } else {
      navigation = <MainNavigation />
    }

    return (
      <div className="nav-wrapper" id="navbar">
        {navigation}
      </div>
    );
  }
}

export default Navigation