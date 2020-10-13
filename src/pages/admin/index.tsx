import { Button } from 'antd'
import Link from 'next/link'
import auth0 from '../../utils/auth0'
import Template from '../../components/admin/templates/default'

const Page = ({ session }) => {
  return (
    <Template session={session}>
      {session ? (
        <div>
          <h1>Admin Page</h1>
          <p>Click links below to </p>
          <ul>
            <li>
              <Link href="/admin/accesskeys">
                <a>Access Keys</a>
              </Link>
            </li>
            <li>
              <Link href="/admin/catalog/products">
                <a>Products</a>
              </Link>
            </li>
            <li>
              <Link href="/admin/catalog/categories">
                <a>Categories</a>
              </Link>
            </li>
            <li>
              <Link href="/admin/inquiries">
                <a>Inquiries</a>
              </Link>
            </li>
          </ul>
        </div>
      ) : (
        <div className="login-container">
          <div className="login-box">
            <Link href="/admin">
              <a>
                <img
                  src="https://uneek-web-assets.s3-us-west-1.amazonaws.com/uneek-embed/UNEEK_OFFICIAL_LOGO.png"
                  width="150"
                />
              </a>
            </Link>
            <div>
              <p>Log into Admin Panel</p>
            </div>
            <Button>
              <Link href="/api/auth0/login">
                <a>Login</a>
              </Link>
            </Button>
          </div>
        </div>
      )}
      <style jsx>{`
        .login-container {
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .login-box {
          max-width: 1000px;
          border: 1px solid #d2d2d2;
          text-align: center;
          padding: 50px;
        }
      `}</style>
    </Template>
  )
}

export default Page

export async function getServerSideProps({ req, res }) {
  const session = await auth0.getSession(req)

  // check if user is logged in
  if (session) {
    const tokenCache = auth0.tokenCache(req, res)
    const { accessToken } = await tokenCache.getAccessToken({
      /** Add additional scopes here
       *  scopes: [`delete:file`],
       * */
      refresh: true,
    })
  }

  return { props: { session } }
}
