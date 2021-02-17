import { fetchAPI } from '../contexts/apollo/fetchAPI'

/** Format Number with comma e.g. 1,234,456.00 */
function formatNumber(num) {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}

/** Get parent url of host website, used on embedded codes in iframes */
function getParentUrl() {
  var isInIframe = parent !== window,
    parentUrl = null

  if (isInIframe) {
    parentUrl = document.referrer
  }
  return parentUrl
}

const isBrowser = () => typeof window !== 'undefined'

async function isPartnerAuthorized(partnerKey, parentUrl) {
  if (isBrowser) {
    if (window.sessionStorage.getItem('partner_key')) {
      console.log('Verified Partner already in session')
      return true
    }
  }

  const VERIFY_ACCESS_KEY = `
      query VerifyAccessKey($key: String!) {
        verifyAccessKey(key: $key) {
          key
          url
        }
      }
    `

  if (partnerKey) {
    // check if partner key is valid
    const result = await fetchAPI(VERIFY_ACCESS_KEY, {
      variables: { key: partnerKey },
    })
    
    if (result?.verifyAccessKey?.url === parentUrl) {
      
      console.log('Parent Website and Retailer is authorized')
      if (isBrowser) {
        window.sessionStorage.setItem('partner_key', result.verifyAccessKey.key)
        return true
      }
    } else {
      console.log('Parent Website and Retailer is not authorized')
    }
  }

  return false
}

export { formatNumber, getParentUrl, isPartnerAuthorized }
