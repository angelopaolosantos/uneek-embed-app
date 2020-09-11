const Template = ({children}) => (
  <div className="container">
    <div className="content-wrapper">
      <div className="content">
      {children}
      </div>
    </div>
    <div className="footer">
    Uneek Admin
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