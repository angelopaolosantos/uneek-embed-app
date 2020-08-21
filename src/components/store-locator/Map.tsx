// @ts-nocheck

import { Map, GoogleApiWrapper, InfoWindow } from 'google-maps-react'
import withStoreLocator from '../../contexts/store-locator/withStoreLocator'
import { compose } from 'recompose'
import { Component } from 'react'
import ReactHtmlParser from 'react-html-parser';

type AppProps = {
    context: {
        unSelectMarker: () => void
        center: { lat: number, lng: number }
        showingInfoWindow: boolean
        activeMarker: {}
        selectedPlace: { name: string, address: string, phone: string, member: string }
        markers: any[]
    }
    google: any
}

class StoreLocatorMap extends Component<AppProps, {}> {
    render() {
        const { center, markers, activeMarker, showingInfoWindow, unSelectMarker, selectedPlace, zoom } = this.props.context
        const google = this.props.google
        const markerData = { marker: activeMarker, onClose: unSelectMarker, visible: showingInfoWindow }

        return (
            <div>
                <Map google={google} center={center} zoom={zoom}>
                    {markers}
                    <InfoWindow {...markerData}>
                        <div>
                            <h4>{ReactHtmlParser(selectedPlace.name)}</h4>
                            <p>Address:{selectedPlace.address}</p>
                            <p>Phone:{selectedPlace.phone}</p>
                            <p>Website:</p>
                            <p>{selectedPlace.member}</p>
                        </div>
                    </InfoWindow>
                </Map>
            </div>
        )
    }
}

export default compose(
    GoogleApiWrapper({ apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY }),
    withStoreLocator)
    (StoreLocatorMap)