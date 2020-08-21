import { Component } from 'react'
import Head from 'next/head'
import Template from '../../components/templates/default'
import StoreLocator from '../../components/store-locator'

class Page extends Component {
    render() {
        return (
            <Template>
                <Head>
                    <title>Uneek Jewelry - Store Locator</title>
                </Head>
                <main>
                    <h1>Find A Retailer Near You</h1>
                    <StoreLocator />
                </main>
            </Template>
        )
    }

}

export default Page