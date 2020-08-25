import Link from "next/link"

const Dropdown = () => (
  <div className="submenu-container">
    <div>
        <Link href="/categories/bridal-jewelry">
          <a>View all bridal jewelry</a>
        </Link>
      <div className="submenus">
        <div className="submenu">
          <ul>
            <h3>By Setting</h3>
            <li>Three Stone</li>
            <li>Solitaire</li>
            <li>Halo</li>
            <li>Silhoette</li>
            <li>Infinity</li>
            <li>Two Tone</li>
          </ul>
        </div>
        <div className="submenu">
          <ul>
            <h3>By Center Stone</h3>
            <li>Pink Diamond</li>
            <li>Yellow Diamond</li>
            <li>Blue Sapphire</li>
            <li>Emerald</li>
            <li>Ruby</li>
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
