'use strict'

// use require with a reference to bundle the file and use it in this file
// const example = require('./example')

// use require without a reference to ensure a file is bundled
// require('./example')

// A follow along with from a youtuber called Coding Train: https://www.youtube.com/watch?v=nZaZ2dB6pow

$(() => {
  // Leaflet map function
  const mymap = L.map('issMap').setView([0, 0], 1)

  // creating ISS icon as a marker
  const issIcon = L.icon({
    iconUrl: 'iss200.png',
    iconSize: [50, 32],
    iconAnchor: [25, 16]
  })

  // A default marker on map for lat 0 and lon 0
  const marker = L.marker([0, 0], {icon: issIcon}).addTo(mymap)

  // using OpenStreetMap as a reference for tiles
  const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'

  const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
  const tiles = L.tileLayer(tileUrl, { attribution })
  tiles.addTo(mymap)

  // API URL is from the website: https://wheretheiss.at/w/developer
  const apiUrl = 'https://api.wheretheiss.at/v1/satellites/25544'

  // Fetch JSON from API and map latitude and longtitude
  async function getData () {
    const response = await fetch(apiUrl)
    const data = await response.json()
    const { latitude, longitude } = data

    // marker which is pinpoints location of ISS by lat and lon
    marker.setLatLng([latitude, longitude]).addTo(mymap)

    document.getElementById('lat').textContent = latitude
    document.getElementById('lon').textContent = longitude
  }

  getData()
})
