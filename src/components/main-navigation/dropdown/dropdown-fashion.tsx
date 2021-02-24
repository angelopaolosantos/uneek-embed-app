import Link from 'next/link'

const Dropdown = () => (
  <div className="container">
    <div className="submenu-container">
      <div>
        <Link href="/categories/fine-jewelry">
          <a>View all Fine Jewelry</a>
        </Link>
        <div className="submenus">
          <div className="submenu">
            <ul>
              <h3>By Type</h3>
              <li>
                <Link href="/categories/fine-jewelry/rings-and-bands">
                  <a>Rings &amp; Bands</a>
                </Link>
              </li>
              <li>
                <Link href="/categories/fine-jewelry/earrings">
                  <a>Earrings</a>
                </Link>
              </li>
              <li>
                <Link href="/categories/fine-jewelry/hoops">
                  <a>Hoops</a>
                </Link>
              </li>
              <li>
                <Link href="/categories/fine-jewelry/bracelets">
                  <a>Bracelets</a>
                </Link>
              </li>
              <li>
                <Link href="/categories/fine-jewelry/bangles">
                  <a>Bangles</a>
                </Link>
              </li>
              <li>
                <Link href="/categories/fine-jewelry/pendants-and-necklaces">
                  <a>Pendants &amp; Necklaces</a>
                </Link>
              </li>
            </ul>
          </div>
          <div className="submenu">
            <ul>
              <h3>Stone Type</h3>
              <li>
                <Link href="/categories/fine-jewelry/white-diamond">
                  <a>White Diamond</a>
                </Link>
              </li>
              <li>
                <Link href="/categories/fine-jewelry/colored-diamond">
                  <a>Colored Diamond</a>
                </Link>
              </li>
              <li>
                <Link href="/categories/fine-jewelry/sapphire">
                  <a>Sapphire</a>
                </Link>
              </li>
              <li>
                <Link href="/categories/fine-jewelry/ruby">
                  <a>Ruby</a>
                </Link>
              </li>
              <li>
                <Link href="/categories/fine-jewelry/emerald">
                  <a>Emerald</a>
                </Link>
              </li>
              <li>
                <Link href="/categories/fine-jewelry/exotic">
                  <a>Exotic</a>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="image-showcase">
      <Link href="/categories/fine-jewelry/sapphire"><a><img src="/images/navigation/fine-showcase-1.jpg" /></a></Link>
        <p><Link href="/categories/fine-jewelry/sapphire"><a><strong>Explore Sapphire</strong></a></Link></p>
      </div>
      <div className="image-showcase">
      <Link href="/categories/fine-jewelry/earrings"><a><img src="/images/navigation/fine-showcase-2.jpg" /></a></Link>
        <p><Link href="/categories/fine-jewelry/earrings"><a><strong>View Earrings</strong></a></Link></p>
      </div>
    </div>
  </div>
)

export default Dropdown
