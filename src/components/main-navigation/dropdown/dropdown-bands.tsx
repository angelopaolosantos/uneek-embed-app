import Link from 'next/link'

const Dropdown = () => (
  <div className="submenu-container">
    <div>
      <Link href="/categories/wedding-and-anniversary-bands">
        <a>View all wedding &amp; anniversary bands</a>
      </Link>
      <div className="submenus">
        <div className="submenu">
          <ul>
            <h3>By Type</h3>
            <li>
              <Link href="/categories/wedding-and-anniversary-bands/wedding-bands">
                <a>Wedding Bands</a>
              </Link>
            </li>
            <li>
              <Link href="/categories/wedding-and-anniversary-bands/eternity-bands">
                <a>Eternity Bands</a>
              </Link>
            </li>
            <li>
              <Link href="/categories	/wedding-and-anniversary-bands/diamond-stackable-bands">
                <a>Diamond Stackable Bands</a>
              </Link>
            </li>
            <li>
              <Link href="/categories	/wedding-and-anniversary-bands/gemstone-bands">
                <a>Gemstone Bands</a>
              </Link>
            </li>
            <li>
              <Link href="/categories/wedding-and-anniversary-bands/fashion-bands">
                <a>Fashion Bands</a>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div className="image-showcase">
      <img src="/images/navigation/wedding-showcase-1.jpg" />
      <p><strong>Explore Wedding Bands</strong></p>
    </div>
    <div className="image-showcase">
    <Link href="/categories/wedding-and-anniversary-bands/eternity-bands"><img src="/images/navigation/wedding-showcase-2.jpg" /></Link>
      <p><Link href="/categories/wedding-and-anniversary-bands/eternity-bands"><a><strong>Eternity Bands</strong></a></Link></p>
    </div>
  </div>
)

export default Dropdown
