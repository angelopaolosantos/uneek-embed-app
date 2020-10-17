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
            <li><Link href="/categories/engagement-rings/halo" prefetch={false} ><a>Halo <img src="/images/halo.png" width={40} /></a></Link></li>
            <li><Link href="/categories/engagement-rings/classic"><a>Classic <img src="/images/classic.png" width={40} /></a></Link></li>
            <li><Link href="/categories/engagement-rings/three-stone"><a>Three Stone <img src="/images/three-stone.png" width={40} /></a></Link></li>
            <li><Link href="/categories/engagement-rings/solitaire"><a>Solitaire <img src="/images/solitaire.png" width={40} /></a></Link></li>
          </ul>
        </div>
        <div className="submenu">
          <ul>
            <h3>By Collection</h3>
            <li><Link href="/categories/engagement-rings/silhouette-collection"><a>Silhouette</a></Link></li>
            <li><Link href="/categories/engagement-rings/petals-collection"><a>Petals</a></Link></li>
            <li><Link href="/categories/engagement-rings/us-collection"><a>Us</a></Link></li>
            <li><Link href="/categories/engagement-rings/infinity-collection"><a>Infinity</a></Link></li>
          </ul>
        </div>
      </div>
    </div>
    <div className="image-showcase">
    <Link href="/categories/engagement-rings/us-collection"><a><img src="/images/navigation/collection-showcase-1.jpg" /></a></Link>
    <p><Link href="/categories/engagement-rings/us-collection"><a><strong>Us Collection</strong></a></Link></p>
    </div>
    <div className="image-showcase">
    <Link href="/categories/engagement-rings/petals-collection"><a><img src="/images/navigation/collection-showcase-2.jpg" /></a></Link>
      <p><Link href="/categories/engagement-rings/petals-collection"><a><strong>Petals Collection</strong></a></Link></p>
    </div>
  </div>
);

export default Dropdown;
