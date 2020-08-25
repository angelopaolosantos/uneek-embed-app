import Link from "next/link";

const Dropdown = () => (
  <div className="container">
    <div className="submenu-container">
      <div>
        <Link href="/categories/fashion-jewelry">
          <a>View all Fashion jewelry</a>
        </Link>
        <div className="submenus">
          <div className="submenu">
            <ul>
              <h3>All Diamonds</h3>
              <li>Rings &amp; Bands</li>
              <li>Earrings</li>
              <li>Hoops</li>
              <li>Bracelets</li>
              <li>Pendants &amp; Necklaces</li>
            </ul>
          </div>
          <div className="submenu">
            <ul>
              <h3>With Color Diamonds</h3>
              <li>Rings &amp; Bands</li>
              <li>Earrings</li>
              <li>Hoops</li>
              <li>Bracelets</li>
              <li>Pendants &amp; Necklaces</li>
            </ul>
          </div>
          <div className="submenu">
            <ul>
              <h3>With Gem Stones</h3>
              <li>Rings &amp; Bands</li>
              <li>Earrings</li>
              <li>Hoops</li>
              <li>Bracelets</li>
              <li>Pendants &amp; Necklaces</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="image-showcase">
        <img src="/images/navigation/fashion-showcase-1.jpg" />
        <p>Image Showcase Text here!</p>
      </div>
      <div className="image-showcase">
        <img src="/images/navigation/fashion-showcase-2.jpg" />
        <p>Image Showcase Text here!</p>
      </div>
    </div>
  </div>
);

export default Dropdown;
