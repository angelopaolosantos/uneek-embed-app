import Link from "next/link"

const Dropdown = () => (
  <div className="submenu-container">
    <div>
        <Link href="/categories/engagement-rings">
          <a>View all engagement rings</a>
        </Link>
      <div className="submenus">
        <div className="submenu">
          <ul>
            <h3>By Setting</h3>
            <li><Link href="/categories/engagement-rings/three-stone"><a>Three Stone</a></Link></li>
            <li><Link href="/categories/engagement-rings/solitaire"><a>Solitaire</a></Link></li>
            <li><Link href="/categories/engagement-rings/halo"><a>Halo</a></Link></li>
          </ul>
        </div>
        <div className="submenu">
          <ul>
            <h3>By Collection</h3>
            <li><Link href="/categories/engagement-rings/silhouette-collection"><a>Silhoette</a></Link></li>
            <li><Link href="/categories/engagement-rings/petals-collection"><a>Petals</a></Link></li>
            <li><Link href="/categories/engagement-rings/us-collection"><a>Us</a></Link></li>
            <li><Link href="/categories/engagement-rings/infinity-collection"><a>Infinity</a></Link></li>
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
