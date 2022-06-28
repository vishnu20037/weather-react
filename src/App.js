import "./App.css";
import React from "react";
// import "leaflet/dist/leaflet.css";
//import { useState } from "react";
import $ from "jquery";

import L from "leaflet";
import {
  MapContainer,
  useMapEvents,
  TileLayer,
  //useMap,
  Marker,
  Popup,
  
} from "react-leaflet";
function App() {
  function LocationMarker() {
    var popup = L.popup();
    const map = useMapEvents({
      click: (e) => {
        const { lat, lng } = e.latlng;
        const coords = [lat, lng];
        popup.setLatLng(e.latlng).openOn(map);
        $(document).ready(function () {
          $.ajax({
            url:
              "https://api.openweathermap.org/data/2.5/weather?lat=" +
              e.latlng.lat +
              "&lon=" +
              e.latlng.lng +
              "&appid=72bd54c93f410e46cde02d674f48578b",
            dataType: "json",
            success: function (data) {
              // storing json data in variables
              var cityName = data.name;
              var country = data.sys.country;
              var temperature = Math.round((data.main.temp - 273) * 100) / 100;
              var humidity = data.main.humidity;
              var visibility = data.visibility / 1000;
              popup.setContent( cityName +', '+country + "<br>" + temperature + "°C<br>"+
                humidity + "%" + "<br>"+ visibility +"KM" );
            },
            error: function () {
              alert("error receiving wind data from openweathermap");
            },
          });
        });
      },
    });
    return null;
  }
  return (
    <MapContainer center={[28, 73]} zoom={8}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <LocationMarker />
    </MapContainer>
  );
}

export default App;
