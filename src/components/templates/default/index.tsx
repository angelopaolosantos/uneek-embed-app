import Header from '../../header'
import Footer from '../../footer'
import MainNavigation from '../../main-navigation'

const Template = (props) => (
  <div className="container">
    <div className="content-wrapper">
      <Header displayText="Uneek Launches New Website!" />
      <MainNavigation />
      <div className="content">
      {props.children}
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