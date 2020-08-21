import React, { useState, useEffect } from "react"
import StoreLocatorContext from "./StoreLocatorContext"
import Geocode from "react-geocode"
import _ from 'lodash'
import { Marker } from 'google-maps-react'
import { distance } from './MapTool'
import { useQuery, gql } from '@apollo/client';
import withApollo from '../apollo/withApollo'

Geocode.setApiKey(process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY)

function StoreLocatorProvider(props) {
    const [keyword, setKeyword] = useState("")
    const [nearLocation, setNearLocation] = useState({ lat: 0, lng: 0 })
    const [center, setCenter] = useState({ lat: 0, lng: 0 })
    const [zoom, setZoom] = useState(8) // Set Maps zoom level
    const [showingInfoWindow, setShowingInfoWindow] = useState(false)
    const [activeMarker, setActiveMarker] = useState(null)
    const [selectedPlace, setSelectedPlace] = useState({})
    const [nearRetailers, setNearRetailers] = useState([])
    const [markers, setMarkers] = useState([])

    const RETAILERS = gql`
{
    retailers(Status: "Enable"){
      ID,
      Title,
      Address,
      URL,
      Phone,
      Longitude,
      Latitude
    }
  }
`;

    function getMyLocation() {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition((position) => {
                const coordinates = { lat: position.coords.latitude, lng: position.coords.longitude }
                getNearRetailers(coordinates).then(()=>{
                    setNearLocation(coordinates)
                    setCenter(coordinates)
                })
            });
        } else {
            console.log("I can't get your position...")
        }
    }

    function selectMarker(props, marker, e) {
        setSelectedPlace(props)
        setActiveMarker(marker)
        setShowingInfoWindow(true)
    }

    function unSelectMarker(props) {
        if (showingInfoWindow) {
            setShowingInfoWindow(false)
            setActiveMarker(null)
        }
    }

    async function getNearRetailers(coords) {
        let data = await props.apollo.query({ query: RETAILERS }) // promise
        const allRetailers = data.data.retailers

        let nearRetailers = []
        for (const retailer of allRetailers) {
            const distanceFrom = distance(retailer.Latitude, retailer.Longitude, coords.lat, coords.lng)
            if (distanceFrom <= 100) {
                const newObject = { ...retailer, distance: Math.round(distanceFrom) }
                nearRetailers = [...nearRetailers, newObject]
            }
        }

        let nearMarkers = []
        for (const retailer of nearRetailers) {
            const retailerData = {
                name: retailer.Title,
                address: retailer.Address,
                phone: retailer.Phone,
                member: 'Platinum Member',
                distance: retailer.distance
            }

            const marker = <Marker {...retailerData}
                position={{ lat: retailer.Latitude, lng: retailer.Longitude }}
                title={retailer.Title}
                key={retailer.ID}
                onClick={selectMarker}
                icon={{
                    url: "/images/UNEEK_MAP_ICON.png",
                    anchor: new google.maps.Point(32, 64),
                    scaledSize: new google.maps.Size(64, 64)
                }} />
            nearMarkers = [...nearMarkers, marker]
        }

        const sortedRetailers = _.sortBy(nearRetailers, ['distance'])
        setNearRetailers(sortedRetailers)
        setMarkers(nearMarkers)
    }

    function searchKeyword() {
        Geocode.fromAddress(keyword).then(
            response => {
                if (response.results != undefined && response.results.length > 0) {
                    const { lat, lng } = response.results[0].geometry.location
                    
                    getNearRetailers({ lat, lng }).then(()=>{
                        setNearLocation({ lat, lng })
                        setCenter({ lat, lng })
                    })
                    
                }else {
                    setNearRetailers([])
                    setMarkers(null)
                }
            },
            error => {
                console.log("No Results Found!");
                setNearRetailers([]),
                setMarkers(null)
            }
        )
    }

    const value = {
        keyword,
        nearLocation,
        center,
        zoom,
        showingInfoWindow,
        activeMarker,
        selectedPlace,
        nearRetailers,
        markers,
        setKeyword,
        setNearLocation,
        setCenter,
        searchKeyword,
        getMyLocation,
        selectMarker,
        unSelectMarker,
    }

    return (
        <StoreLocatorContext.Provider value={value} >
            {props.children}
        </StoreLocatorContext.Provider>
    )
}

export default withApollo(StoreLocatorProvider)