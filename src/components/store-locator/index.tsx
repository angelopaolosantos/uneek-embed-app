import RetailerLookup from './RetailerLookup'
import Map from "./Map"
import StoreLocatorProvider from '../../contexts/store-locator/StoreLocatorProvider'

const StoreLocator = () => {
    return (
        <StoreLocatorProvider>
            <RetailerLookup />
            <div id="map-block">
                <div id="map_canvas">
                    <Map />
                </div>
            </div>
            <style jsx>{`
                #map-block {
                    border: 1px solid #d2d2d2;
                    position:relative; top:0;
                    height: 500px;
                }
                #map_canvas {
                    width:100%; height:100%;
                }
                `}
            </style>
        </StoreLocatorProvider>
    )
}

export default StoreLocator