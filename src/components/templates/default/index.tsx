import Header from '../../header'
import Footer from '../../footer'
import MainNavigation from '../../main-navigation'
import Link from 'next/link'
import {
  getParentUrl,
  isPartnerAuthorized,
} from '../../../utils/uneek-utilities'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

const Template = (props) => {
  const {children, partnerKey} = props
  const router = useRouter()

  /** Check if Partner is Authorized */
  useEffect(() => {
    const parentUrl = getParentUrl()
    isPartnerAuthorized(partnerKey, parentUrl).then((data) => {
      console.log(data)
      if (data === false) {
        router.push('/unauthorized')
      }
    })
  }, [])

  return (
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
)}

export default Template