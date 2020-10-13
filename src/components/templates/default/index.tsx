import Header from '../../header'
import Footer from '../../footer'
import MainNavigation from '../../main-navigation'
import Link from 'next/link'

const Template = ({children}) => (
  <div className="container">
    <div className="content-wrapper">
      <Header>
        Follow <strong>Uneek</strong> on <Link href="https://www.instagram.com/uneekjewelry/" ><a target="_blank"><em>Instagram!</em></a></Link>
      </Header>
      <MainNavigation />
      <div className="content">
      {children}
      </div>
    </div>
    <div className="footer">
    <Footer />
    </div>
    <style jsx>{`
    .container {
      display: flex;
      flex-direction: column;
      min-height: 100vh;
    }

    .content-wrapper {
      flex: 1 0 auto;
    }
    
    .footer {
      flex-shrink: 0;
    }
    `}
    </style>
  </div >
)

export default Template