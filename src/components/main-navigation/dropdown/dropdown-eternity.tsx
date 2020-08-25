import Link from "next/link";

const Dropdown = () => (
  <div className="container">
    <div className="submenu-container">
      <div>
        <Link href="/categories/eternity-bands">
          <a>View all Eternity Bands</a>
        </Link>
        <div className="submenus">
          <div className="submenu">
            <ul>
              <h3>By Stone Shape</h3>
              <li>Round</li>
              <li>Emerald</li>
              <li>Oval</li>
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
