import Link from 'next/link'
import { Button } from 'antd'

const Navigation = ({ session }) => {
  return (
    <div className="navigation-container">
      <div>
        <Link href="/admin"><a><img
          src="https://uneek-web-assets.s3-us-west-1.amazonaws.com/uneek-embed/UNEEK_OFFICIAL_LOGO.png"
          width="100"
        /></a></Link>
      </div>
      {session?.user ? (
        <div>
          Welcome <strong>{session.user.nickname}</strong> &nbsp;
          <Button>
            <Link href="/api/auth0/logout">
              <a>Logout</a>
            </Link>
          </Button>
        </div>
      ) : (
        <div>
          Click here to Login &nbsp;
          <Button>
            <Link href="/api/auth0/login">
              <a>Login</a>
            </Link>
          </Button>
        </div>
      )}
      <style jsx>{`
        .navigation-container {
          padding: 0.5em;
          display: flex;
          justify-content: space-between;
          border-bottom: 1px solid #d2d2d2;
        }
        `}</style>
    </div>
  )
}

export default Navigation
