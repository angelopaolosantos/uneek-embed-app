import { Icon } from 'rsuite'
import Link from 'next/link'

const NavigationBlock = () => (
    <div className="menu-wrapper">
        <ul className="menu">
            <li><Link href="/categories/bridal-jewelry"><a>Bridal Jewelry</a></Link></li>
            <li><Link href="/categories/fashion-jewelry"><a>Fashion Jewelry</a></Link></li>
            <li><Link href="/categories/eternity-bands"><a>Eternity Bands</a></Link></li>
            <li><Link href="/categories/stackables"><a>Stackables</a></Link></li>
            <li><Link href="/categories/one-of-a-kind"><a>One of a Kind</a></Link></li>
        </ul>
        <ul className="menu">
            <li><Icon icon="search" /> <Link href="/search">Search</Link></li>
        </ul>
    </div>
)

export default NavigationBlock