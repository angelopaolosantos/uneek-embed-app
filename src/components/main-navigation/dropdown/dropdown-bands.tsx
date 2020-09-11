import Link from "next/link"

const Dropdown = () => (
  <div className="submenu-container">
    <div>
        <Link href="/categories/bridal-jewelry">
          <a>View all wedding &amp; anniversary bands</a>
        </Link>
      <div className="submenus">
        <div className="submenu">
          <ul>
            <h3>By Type</h3>
            <li>Wedding Bands</li>
            <li>Eternity Bands</li>
            <li>Stackable Bands</li>
            <li>Fashion Bands</li>
          </ul>
        </div>
      </div>
    </div>
    <div className="image-showcase">
      <img src="/images/navigation/engagement-showcase-1.jpg" />
      <p>Image Showcase Text here!</p>
    </div>
    <div className="image-showcase">
      <img src="/images/navigation/engagement-showcase-2.jpg" />
      <p>Image Showcase Text here!</p>
    </div>
  </div>
);

export default Dropdown;
