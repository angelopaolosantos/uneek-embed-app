import Link from "next/link"

const Dropdown = () => (
  <div className="submenu-container">
    <div>
        <Link href="/categories/bridal-jewelry">
          <a>View all engagement rings</a>
        </Link>
      <div className="submenus">
        <div className="submenu">
          <ul>
            <h3>By Setting</h3>
            <li>Three Stone</li>
            <li>Solitaire</li>
            <li>Halo</li>
          </ul>
        </div>
        <div className="submenu">
          <ul>
            <h3>By Collection</h3>
            <li>Silhoette</li>
            <li>Petals</li>
            <li>Us</li>
            <li>Infinity</li>
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
