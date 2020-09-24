import { Icon } from "rsuite";
import DropdownEngagement from "./dropdown/dropdown-engagement";
import DropdownFashion from "./dropdown/dropdown-fashion";
import DropdownEternity from "./dropdown/dropdown-eternity";
import DropdownStackables from "./dropdown/dropdown-stackables";
import DropdownBands from "./dropdown/dropdown-bands"
import DropdownOOAK from "./dropdown/dropdown-ooak";
import Link from "next/link";

const MainNavigation = () => {
  return (
    <div className="container">
      <div className="menu-wrapper">
        <ul className="menu">
          <li className="menu-item">
            <Link href="/categories/engagement-rings"><a>Engagement Rings</a></Link>
            <div className="mega-menu">
              <DropdownEngagement />
            </div>
          </li>
          <li className="menu-item">
          <Link href="/categories/wedding-and-anniversary-bands"><a>Wedding &amp; Anniversary Bands</a></Link>
            <div className="mega-menu">
              <DropdownBands />
            </div>
          </li>
          <li className="menu-item">
          <Link href="/categories/fine-jewelry"><a>Fine Jewelry</a></Link>
            <div className="mega-menu">
              <DropdownFashion />
            </div>
          </li>
          <li className="menu-item">
          <Link href="/categories/one-of-a-kind"><a>One Of A Kind</a></Link>
            <div className="mega-menu">
              <DropdownOOAK />
            </div>
          </li>
          
        </ul>
        <ul className="menu">
          <li>
            <Link href="/search">
              <a>
                <Icon icon="search" /> Search
              </a>
            </Link>
          </li>
        </ul>
      </div>
      <style jsx>
        {`
          .mega-menu {
            position: absolute;
            left: 0px;
            top: 56px;
            background-color: white;
            width: 100%;
            display: none;
           
          }

          .menu-item:hover > .mega-menu {
           
            display: block;
          }

          .container {
            max-width: 992px;
            margin: 0px auto;
          }

          .container a,
          .container a:hover,
          .container a:active {
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
    </div>
  );
};

export default MainNavigation;
