import { Component } from 'react'
import Head from 'next/head'
import Template from '../../components/templates/default'
import Search from '../../components/search'

class Page extends Component {
    render() {
        return (
            <Template>
                <Head>
                    <title>Uneek Jewelry - Search Products</title>
                </Head>
                <main>
                    <Search />
                </main>
            </Template>
        )
    }

}

export default Page