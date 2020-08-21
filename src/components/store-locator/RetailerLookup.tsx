import withStoreLocator from '../../contexts/store-locator/withStoreLocator'
import { Component } from 'react'
import { InputGroup, Input, Icon, Form } from 'rsuite'
import ReactHtmlParser from 'react-html-parser';

type AppProps = {
    context: {
        setKeyword: (string)=>void
        searchKeyword: ()=>void
        getMyLocation: ()=>void
        setCenter: (any)=>void
        keyword: string
        nearRetailers: any[]
    }
}

class RetailerLookup extends Component<AppProps,{}> {
    render() {
        const { searchKeyword, setKeyword, keyword, nearRetailers, setCenter, getMyLocation } = this.props.context

        return (
            <div className="retailer-list">
                <Form onSubmit={()=>searchKeyword()}>
                    <InputGroup inside>
                        <Input placeholder="Enter your Zip Code, City, or Address " onChange={(val)=>setKeyword(val)} value={keyword} />
                        <InputGroup.Button onClick={()=>searchKeyword()}>
                            <Icon icon="search" />
                        </InputGroup.Button>
                    </InputGroup>
                </Form>
                <div>
                <a onClick={getMyLocation} ><Icon icon="map-marker" /> Use My Location</a>
                </div>
                <div>
                    {nearRetailers.length>0 &&
                    <h3>Results:</h3> }
                    {nearRetailers.map((retailer: {Title:string, distance: number, Latitude: number, Longitude: number})=>{ return(
                    <div key={ReactHtmlParser(retailer.Title)}><a onClick={()=>setCenter({lat: retailer.Latitude, lng: retailer.Longitude})} >{ReactHtmlParser(retailer.Title)}</a> distance: {retailer.distance} Miles</div>
                    )})}
                   
                </div>
            </div>
        )
    }
}

export default withStoreLocator(RetailerLookup)