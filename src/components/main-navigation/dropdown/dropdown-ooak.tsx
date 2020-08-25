import Link from "next/link";

const Dropdown = () => (
  <div className="container">
    <div className="submenu-container">
      <div>
        <Link href="/categories/one-of-a-kind">
          <a>View all One-of-a-Kind Jewelry</a>
        </Link>
        <div className="submenus">
          <div className="submenu">
            <ul>
              <h3>By Product Type</h3>
              <li>Rings</li>
              <li>Earring</li>
              <li>Pendants &amp; Necklaces</li>
              <li>Bracelets</li>
              <li>Bangles</li>
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
