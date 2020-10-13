import Link from 'next/link'

const Dropdown = () => (
  <div className="container">
    <div className="submenu-container">
      <div>
        <Link href="/categories/one-of-a-kind/">
          <a>View all One of a Kind Jewelry</a>
        </Link>
        <div className="submenus">
          <div className="submenu">
            <ul>
              <h3>By Type</h3>
              <li>
                <Link href="/categories/one-of-a-kind/rings-and-bands">
                  <a>Rings &amp; Bands</a>
                </Link>
              </li>
              <li>
                <Link href="/categories/wedding-and-anniversary-bands/eternity-bands">
                  <a>Eternity Bands</a>
                </Link>
              </li>
              <li>
                <Link href="/categories/one-of-a-kind/earrings">
                  <a>Earrings</a>
                </Link>
              </li>
              <li>
                <Link href="/categories/one-of-a-kind/hoops">
                  <a>Hoops</a>
                </Link>
              </li>
              <li>
                <Link href="/categories/one-of-a-kind/bracelets">
                  <a>Bracelets</a>
                </Link>
              </li>
              <li>
                <Link href="/categories/one-of-a-kind/bangles">
                  <a>Bangles</a>
                </Link>
              </li>
              <li>
                <Link href="/categories/one-of-a-kind/pendants-and-necklaces">
                  <a>Pendants &amp; Necklaces</a>
                </Link>
              </li>
            </ul>
          </div>
          <div className="submenu">
            <ul>
              <h3>Stone Type</h3>
              <li>
                <Link href="/categories/one-of-a-kind/white-diamond">
                  <a>White Diamond</a>
                </Link>
              </li>
              <li>
                <Link href="/categories/one-of-a-kind/colored-diamond">
                  <a>Colored Diamond</a>
                </Link>
              </li>
              <li>
                <Link href="/categories/one-of-a-kind/sapphire">
                  <a>Sapphire</a>
                </Link>
              </li>
              <li>
                <Link href="/categories/one-of-a-kind/ruby">
                  <a>Ruby</a>
                </Link>
              </li>
              <li>
                <Link href="/categories/one-of-a-kind/emerald">
                  <a>Emerald</a>
                </Link>
              </li>
              <li>
                <Link href="/categories/one-of-a-kind/exotic">
                  <a>Exotic</a>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="image-showcase">
      <Link href="/categories/one-of-a-kind/colored-diamond"><img src="/images/navigation/ooak-showcase-1.jpg" /></Link>
        <p><Link href="/categories/one-of-a-kind/colored-diamond"><a><strong>Explore Colored Diamonds</strong></a></Link></p>
      </div>
      <div className="image-showcase">
      <Link href="/categories/one-of-a-kind/exotic"><img src="/images/navigation/ooak-showcase-2.jpg" /></Link>
        <p><Link href="/categories/one-of-a-kind/exotic"><a><strong>View Exotics</strong></a></Link></p>
      </div>
    </div>
  </div>
)

export default Dropdown
