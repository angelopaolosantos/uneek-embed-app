import { Icon } from "rsuite";
import Link from "next/link";
import { Menu } from "antd";
const { SubMenu } = Menu;

const NavigationBlock = () => (
  <div className="menu-wrapper">
    <Menu mode="inline">
      <SubMenu key="sub1" title={<span><strong>Bridal</strong></span>}>
        <Menu.Item key="1"><Link href="/categories/bridal-jewelry">
          <a>View all bridal jewelry</a>
        </Link></Menu.Item>
        <Menu.ItemGroup key="g1" title="By Setting">
          <Menu.Item key="1">Three Stone</Menu.Item>
          <Menu.Item key="2">Solitaire</Menu.Item>
          <Menu.Item key="2">Halo</Menu.Item>
          <Menu.Item key="2">Silhouette</Menu.Item>
          <Menu.Item key="2">Infinity</Menu.Item>
          <Menu.Item key="2">Two Tone</Menu.Item>
        </Menu.ItemGroup>
        <Menu.ItemGroup key="g2" title="By Center Stone">
          <Menu.Item key="3">Pink Diamond</Menu.Item>
          <Menu.Item key="4">Yellow Diamond</Menu.Item>
          <Menu.Item key="4">Blue Sapphire</Menu.Item>
          <Menu.Item key="4">Emerald</Menu.Item>
          <Menu.Item key="4">Ruby</Menu.Item>
        </Menu.ItemGroup>
      </SubMenu>
      <SubMenu key="sub2" title={<span><strong>Fashion Jewelry</strong></span>}>
      <Menu.Item key="1"><Link href="/categories/fashion-jewelry">
          <a>View all fashion jewelry</a>
        </Link></Menu.Item>
        <Menu.ItemGroup key="g3" title="All White Diamonds">
          <Menu.Item key="1">Rings and Bands</Menu.Item>
          <Menu.Item key="2">Earrings</Menu.Item>
          <Menu.Item key="2">Hoops</Menu.Item>
          <Menu.Item key="2">Bracelets</Menu.Item>
          <Menu.Item key="2">Pendants and Neckalces</Menu.Item>
        </Menu.ItemGroup>
        <Menu.ItemGroup key="g4" title="Colored Diamonds">
          <Menu.Item key="1">Rings and Bands</Menu.Item>
          <Menu.Item key="2">Earrings</Menu.Item>
          <Menu.Item key="2">Hoops</Menu.Item>
          <Menu.Item key="2">Bracelets</Menu.Item>
          <Menu.Item key="2">Pendants and Neckalces</Menu.Item>
        </Menu.ItemGroup>
        <Menu.ItemGroup key="g5" title="Gem Stones">
          <Menu.Item key="1">Rings and Bands</Menu.Item>
          <Menu.Item key="2">Earrings</Menu.Item>
          <Menu.Item key="2">Hoops</Menu.Item>
          <Menu.Item key="2">Bracelets</Menu.Item>
          <Menu.Item key="2">Pendants and Neckalces</Menu.Item>
        </Menu.ItemGroup>
      </SubMenu>
      <SubMenu key="sub3" title={<span><strong>Eternity bands</strong></span>}>
      <Menu.Item key="1"><Link href="/categories/eternity-bands">
          <a>View all eternity bands</a>
        </Link></Menu.Item>
        <Menu.ItemGroup key="g6" title="By Stone Shape">
          <Menu.Item key="1">Round</Menu.Item>
          <Menu.Item key="2">Oval</Menu.Item>
          <Menu.Item key="2">Emerald</Menu.Item>
        </Menu.ItemGroup>
      </SubMenu>
      <Menu.Item key="1"><Link href="/categories/stackables"><strong>Stackables</strong></Link></Menu.Item>
      <SubMenu key="sub4" title={<span><strong>One Of A Kind</strong></span>}>
      <Menu.Item key="1"><Link href="/categories/bridal-jewelry">
          <a>View all one of a kind jewelry</a>
        </Link></Menu.Item>
        <Menu.ItemGroup key="g7" title="By Product Type">
          <Menu.Item key="1">Rings and Bands</Menu.Item>
          <Menu.Item key="2">Earrings</Menu.Item>
          <Menu.Item key="2">Hoops</Menu.Item>
          <Menu.Item key="2">Bracelets</Menu.Item>
          <Menu.Item key="2">Pendants and Neckalces</Menu.Item>
        </Menu.ItemGroup>
      </SubMenu>
      <Menu.Item key="2"><Icon icon="search" /> <Link href="/search"><strong>Search</strong></Link></Menu.Item>
    </Menu>
  </div>
);

export default NavigationBlock;
