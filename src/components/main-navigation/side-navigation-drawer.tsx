import { Icon } from "rsuite";
import Link from "next/link";
import { Menu } from "antd";
const { SubMenu } = Menu;

const NavigationBlock = () => (
  <div className="menu-wrapper">
    <Menu mode="inline">
      <SubMenu key="sub1" title={<span><strong>Engagement Rings</strong></span>}>
        <Menu.Item key="1"><Link href="/categories/engagement-rings">
          <a>View all engagement rings</a>
        </Link></Menu.Item>
        <Menu.ItemGroup key="g1" title="By Setting">
          <Menu.Item key="1"><Link href="/categories/engagement-rings/three-stone">Three Stone</Link></Menu.Item>
          <Menu.Item key="2"><Link href="/categories/engagement-rings/solitaire">Solitaire</Link></Menu.Item>
          <Menu.Item key="3"><Link href="/categories/engagement-rings/halo">Halo</Link></Menu.Item>
        </Menu.ItemGroup>
        <Menu.ItemGroup key="g2" title="By Collection">
          <Menu.Item key="4"><Link href="/categories/engagement-rings/silhouette-collection">Silhouette</Link></Menu.Item>
          <Menu.Item key="5"><Link href="/categories/engagement-rings/petals-collection">Petals</Link></Menu.Item>
          <Menu.Item key="6"><Link href="/categories/engagement-rings/us-collection">Us</Link></Menu.Item>
          <Menu.Item key="7"><Link href="/categories/engagement-rings/infinity-collection">Infinity</Link></Menu.Item>
        </Menu.ItemGroup>
      </SubMenu>

      <SubMenu key="sub2" title={<span><strong>Wedding &amp; Anniversary Bands</strong></span>}>
      <Menu.Item key="8"><Link href="/categories/wedding-and-anniversary-bands">
          <a>View all wedding &amp; anniversary bands</a>
        </Link></Menu.Item>
        <Menu.ItemGroup key="g3" title="By Type">
          <Menu.Item key="9"><Link href="/categories/wedding-and-anniversary-bands/wedding-bands">Wedding Bands</Link></Menu.Item>
          <Menu.Item key="10"><Link href="/categories/wedding-and-anniversary-bands/eternity-bands">Eternity Bands</Link></Menu.Item>
          <Menu.Item key="11"><Link href="/categories/wedding-and-anniversary-bands/stackable-bands">Stackable Bands</Link></Menu.Item>
          <Menu.Item key="12"><Link href="/categories/wedding-and-anniversary-bands/fashion-bands">Fashion Bands</Link></Menu.Item>
        </Menu.ItemGroup>
        </SubMenu>

        <SubMenu key="sub3" title={<span><strong>Fine Jewelry</strong></span>}>
      <Menu.Item key="13"><Link href="/categories/fine-jewelry">
          <a>View all fine jewelry</a>
        </Link></Menu.Item>
        <Menu.ItemGroup key="g4" title="By Type">
          <Menu.Item key="14"><Link href="/categories/fine-jewelry/rings-and-bands">Rings and Bands</Link></Menu.Item>
          <Menu.Item key="15"><Link href="/categories/fine-jewelry/earrings">Earrings</Link></Menu.Item>
          <Menu.Item key="16"><Link href="/categories/fine-jewelry/hoops">Hoops</Link></Menu.Item>
          <Menu.Item key="17"><Link href="/categories/fine-jewelry/bracelets">Bracelets</Link></Menu.Item>
          <Menu.Item key="18"><Link href="/categories/fine-jewelry/bangles">Bangles</Link></Menu.Item>
          <Menu.Item key="19"><Link href="/categories/fine-jewelry/pendants-and-necklaces">Pendants &amp; Necklaces</Link></Menu.Item>
        </Menu.ItemGroup>

        <Menu.ItemGroup key="g5" title="Stone Type">
          <Menu.Item key="20"><Link href="/categories/fine-jewelry/white-diamond">White Diamond</Link></Menu.Item>
          <Menu.Item key="21"><Link href="/categories/fine-jewelry/colored-diamond">Colored Diamond</Link></Menu.Item>
          <Menu.Item key="22"><Link href="/categories/fine-jewelry/sapphire">Sapphire</Link></Menu.Item>
          <Menu.Item key="23"><Link href="/categories/fine-jewelry/ruby">Ruby</Link></Menu.Item>
          <Menu.Item key="24"><Link href="/categories/fine-jewelry/emerald">Emerald</Link></Menu.Item>
          <Menu.Item key="25"><Link href="/categories/fine-jewelry/exotic">Exotic</Link></Menu.Item>
        </Menu.ItemGroup>
        </SubMenu>

        <SubMenu key="sub4" title={<span><strong>One Of A Kind</strong></span>}>
      <Menu.Item key="26"><Link href="/categories/one-of-a-kind">
          <a>View all fine jewelry</a>
        </Link></Menu.Item>
        <Menu.ItemGroup key="g6" title="By Type">
          <Menu.Item key="27"><Link href="/categories/one-of-a-kind/rings-and-bands">Rings and Bands</Link></Menu.Item>
          <Menu.Item key="28"><Link href="/categories/wedding-and-anniversary-bands/eternity-bands">Eternity Bands</Link></Menu.Item>
          <Menu.Item key="29"><Link href="/categories/one-of-a-kind/earrings">Earrings</Link></Menu.Item>
          <Menu.Item key="30"><Link href="/categories/one-of-a-kind/hoops">Hoops</Link></Menu.Item>
          <Menu.Item key="31"><Link href="/categories/one-of-a-kind/bracelets">Bracelets</Link></Menu.Item>
          <Menu.Item key="32"><Link href="/categories/one-of-a-kind/bangles">Bangles</Link></Menu.Item>
          <Menu.Item key="33"><Link href="/categories/one-of-a-kind/pendants-and-necklaces">Pendants &amp; Necklaces</Link></Menu.Item>
        </Menu.ItemGroup>

        <Menu.ItemGroup key="g7" title="Stone Type">
          <Menu.Item key="34"><Link href="/categories/one-of-a-kind/white-diamond">White Diamond</Link></Menu.Item>
          <Menu.Item key="35"><Link href="/categories/one-of-a-kind/colored-diamond">Colored Diamond</Link></Menu.Item>
          <Menu.Item key="36"><Link href="/categories/one-of-a-kind/sapphire">Sapphire</Link></Menu.Item>
          <Menu.Item key="37"><Link href="/categories/one-of-a-kind/ruby">Ruby</Link></Menu.Item>
          <Menu.Item key="38"><Link href="/categories/one-of-a-kind/emerald">Emerald</Link></Menu.Item>
          <Menu.Item key="39"><Link href="/categories/one-of-a-kind/exotic">Exotic</Link></Menu.Item>
        </Menu.ItemGroup>
        </SubMenu>


        
      <Menu.Item key="40"><Icon icon="search" /> <Link href="/search"><strong>Search</strong></Link></Menu.Item>
    </Menu>
  </div>
);

export default NavigationBlock;
