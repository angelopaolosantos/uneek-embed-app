import { Icon } from 'rsuite'
import { Component } from 'react'
import DropdownEngagement from './dropdown/dropdown-engagement'
import DropdownWedding from './dropdown/dropdown-wedding'
import DropdownFine from './dropdown/dropdown-fine'
import DropdownFashion from './dropdown/dropdown-fashion'
// import DropdownCustom from './dropdown/dropdown-custom'
// import DropdownAbout from './dropdown/dropdown-about'
import DropdownCollection from './dropdown/dropdown-collection'
import Link from 'next/link'

class MainNavigation extends Component {
    render() {
        return (
            <div className="container">
                <div className="menu-wrapper">
                    <ul className="menu">
                        <li className="menu-item">Engagement
                        <div className="mega-menu">
                                <DropdownEngagement />
                            </div>
                        </li>
                        <li className="menu-item">Wedding
                    <div className="mega-menu">
                                <DropdownWedding />
                            </div>
                        </li>
                        <li className="menu-item">Fine Jewelry
                    <div className="mega-menu">
                                <DropdownFine />
                            </div>
                        </li>
                        <li className="menu-item">Fashion Jewelry
                    <div className="mega-menu">
                                <DropdownFashion />
                            </div>
                        </li>
                        <li className="menu-item">Collections
                    <div className="mega-menu">
                                <DropdownCollection />
                            </div>
                        </li>
                        <li className="menu-item">Custom Design
                        </li>
                        <li className="menu-item">About
                        </li>
                    </ul>
                    <ul className="menu">
                        <li><Link href="/store-locator"><a><Icon icon="map-marker" /> Find a retailer</a></Link></li>
                        <li><Link href="/search"><a><Icon icon="search" /> Search</a></Link></li>
                    </ul>
                </div>
                <style jsx>{`
.mega-menu {
    position: absolute;
    left: 0px;
    top: 56px;
    background-color: white;
    width: 100%;
    display: none;
}

.menu-item:hover > .mega-menu{
    display: block;
}

.container {
    max-width: 992px;
    margin: 0px auto;
  }

.container a, .container a:hover, .container a:active {
    text-decoration: none;
}

        .menu-wrapper {
            display: flex;
            position: relative;
            width: 100%;
            justify-content: space-between;
        }

        ul.menu {
            display: flex;
            list-style-type: none;
            margin: 0px;
            padding: 0px;
            justify-content: flex-start;
        }
        .menu li {
            padding: 18px 16px;
        }
        `}
                </style>
            </div >
        )
    }
}

export default MainNavigation