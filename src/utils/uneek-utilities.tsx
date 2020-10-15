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

async function isPartnerAuthorized(partnerKey, parentUrl) {
  const VERIFY_ACCESS_KEY = `
      query VerifyAccessKey($key: String!) {
        verifyAccessKey(key: $key) {
          key
          url
        }
      }
    `
  console.log('Partner Key:', partnerKey)
  
  if (sessionStorage.getItem('partner_key')) {
    console.log("Verified Partner already in session")
    return true
  }

  if (partnerKey && typeof partnerKey == "string") {
    // check if partner key is valid
    const result = await fetchAPI(VERIFY_ACCESS_KEY, {
      variables: { key: partnerKey },
    })
    console.log(result)

    if (result?.verifyAccessKey.url == parentUrl) {
      console.log('Parent Website and Retailer is authorized')
      sessionStorage.setItem('partner_key', result.verifyAccessKey.key)
      return true
    }
  }

  return false
}

export { formatNumber, getParentUrl, isPartnerAuthorized }
