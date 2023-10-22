import styled from "styled-components";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useState, useEffect } from "react";
import { DatosBondis } from "./DatosBondis";
import L from 'leaflet';

const StyledDiv = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: whitesmoke;
  text-shadow:
  1px 1px 1px black,
  0 0 0.5em blue;
  height: 600px;
  gap: 3px;
`;

export default function Transporte() {

  //Configuracion del icon a usar en Marker
  const busIcon = L.icon({
    iconUrl: require('../assets/bus.png'),
    iconSize: [25, 25],
  });

  let [datosApi, setDatosApi] = useState(DatosBondis);

  let [cargando, setCargando] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      async function obtenerDatosDeApi() {
        setCargando(true);
        let respuesta = await fetch("https://apitransporte.buenosaires.gob.ar/colectivos/vehiclePositionsSimple?client_id=cb6b18c84b3b484d98018a791577af52&client_secret=3e3DB105Fbf642Bf88d5eeB8783EE1E6");
        let datos = await respuesta.json();
        setDatosApi(datos);
        setCargando(false);
      }
      obtenerDatosDeApi();
    }, 31000);
    return () => clearInterval(interval);
  }, []);

  let lineasActivas = [];
  datosApi.map((bondi) => {
    return (lineasActivas.push(bondi["route_short_name"]))
  });
  lineasActivas = (Array.from(new Set(lineasActivas))).sort();

  let [lineaElegida, setLineaElegida] = useState([]);

  function handleChange(event) {
    setLineaElegida(datosApi.filter((bondi) => bondi["route_short_name"] === event.target.value));
  };

  function posicionPromedio() {
    let latitudes = [];
    let longitudes = [];
    lineaElegida.map((bondi) => (latitudes.push(bondi["latitude"])));
    let promLatitudes = (latitudes.reduce((a, b) => a + b,latitudes[0])) / latitudes.length;
    lineaElegida.map((bondi) => (longitudes.push(bondi["longitude"])));
    let promLongitudes = (longitudes.reduce((a, b) => a + b,longitudes[0])) / longitudes.length;
    console.log({ lat: promLatitudes, long: promLongitudes });
    setPosition({ lat: promLatitudes, long: promLongitudes });
  };

  let [position, setPosition] = useState({ lat: -34.6037, lng: -58.3816 });

  return (

    <StyledDiv>
      <h2>INFO ONLINE DE TRANSPORTE PUBLICO</h2>

      {cargando && <h4>ACTUALIZANDO DATOS...</h4>}

      {!cargando && <label>

        Selecciona una linea :

        <select value={""} onChange={handleChange}>

          {lineasActivas.map((option) => (

            <option value={option}>{option}</option>

          ))}

        </select>

      </label>}

      <button onClick={posicionPromedio}>Centrar Mapa</button>

      <MapContainer style={{ width: "100%", height: "100%" }} center={position} zoom={10} scrollWheelZoom={false}>

        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {lineaElegida.map((bondi) => {
          return (
            <Marker position={[bondi["latitude"], bondi["longitude"]]} icon={busIcon}>
              <Popup>
                Linea: {bondi["route_short_name"]}
                <br />Destino: {bondi["trip_headsign"]}
                <br />Empresa: {bondi["agency_name"]}
                <br />Velocidad: {bondi["speed"]}km/h
              </Popup>
            </Marker>)
        })}

      </MapContainer>
    </StyledDiv>
  );
}