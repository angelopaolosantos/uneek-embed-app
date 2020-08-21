import { Icon } from 'rsuite'

const NavigationBlock = () => (
    <div className="menu-wrapper">
        <ul className="menu">
            <li>Engagement</li>
            <li>Wedding</li>
            <li>Fine Jewelry</li>
            <li>Fashion Jewelry</li>
            <li>Custom Design</li>
            <li>About</li>
        </ul>
        <ul className="menu">
            <li><Icon icon="map-marker" /> Find a retailer</li>
            <li><Icon icon="search" /> Search</li>
        </ul>
    </div>
)

export default NavigationBlock