import styled from "styled-components";
import uv from "../assets/uv.svg";
import viento from "../assets/viento.svg";
import humedad from "../assets/humedad.svg";
import umbrella from "../assets/umbrella.svg";
import smoke from "../assets/smoke.svg";
import sunrise from "../assets/sunrise.svg";
import moonrise from "../assets/moonrise.svg";

const GridDatosDest = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: 1fr 1fr;
  gap: 20px;
  align-items: center;
  height: 270px;
`;

const StylDivDato = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr;
  align-items: center;
  text-align: center;
  background-size: cover;
  background-position: center;
  border-radius: 10%;
  border: 3px solid #7393A7;
  width: 100px;
  height: 100px;
`;

export default function DatosDestacados(props){
      
  let viento_dir = null;

  function DirDelViento(dir){

    if(dir<=22.5 || dir>337.5){
      viento_dir = "Norte";
    } else if(dir>22.5 && dir<=67.5){
      viento_dir = "N.E.";
    } else if(dir>67.5 && dir<=112.5){
      viento_dir = "Este";
    } else if(dir>112.5 && dir<=157.5){
      viento_dir = "S.E.";
    } else if(dir>157.5 && dir<=202.5){
      viento_dir = "Sur";
    } else if(dir>202.5 && dir<=247.5){
      viento_dir = "S.O.";
    } else if(dir>247.5 && dir<=292.5){
      viento_dir = "Oeste";
    } else if(dir>292.5 && dir<=337.5){
      viento_dir = "N.O.";
    } else {
      viento_dir = "s/d";
    }

    return(viento_dir);
  }

  DirDelViento(props["data"]["viento_dir"]);

  return(

    <div style={{display:"flex", flexDirection:"column", textAlign:"center"}} >

      <h2>EL CLIMA EN CORDOBA</h2>

      <GridDatosDest>

        <StylDivDato style={{backgroundImage:`url(${umbrella})`}} >
          <div>Probabilidad de lluvia:</div>
          <div><b>{props["data"]["lluvia"]}%</b></div>
        </StylDivDato>

        <StylDivDato style={{backgroundImage:`url(${humedad})`}} >
          <div>Humedad:</div>
          <div><b>{props["data"]["humedad"]}%</b></div>
        </StylDivDato>

        <StylDivDato style={{backgroundImage:`url(${viento})`}} >
          <div>Viento:</div>
          <div><b>{viento_dir} {props["data"]["viento_km"]}km/h</b></div>
        </StylDivDato>

        <StylDivDato style={{backgroundImage:`url(${uv})`}} >
          <div>Indice UV:</div>
          <div><b>{props["data"]["uv"]}</b></div>
        </StylDivDato>

        <StylDivDato>
          <div style={{backgroundImage:`url(${sunrise})`, backgroundSize:"cover", backgroundPosition: "center"}} >
            Amanece: {props["data"]["amanece"]}
          </div>
          <div style={{backgroundImage:`url(${moonrise})`, backgroundSize:"cover", backgroundPosition: "center"}} >
            Anochece: {props["data"]["anochece"]}
          </div>
        </StylDivDato>

        <StylDivDato style={{backgroundImage:`url(${smoke})`}} >
          <div>Visibilidad:</div>
          <div><b>{props["data"]["visibilidad"]}km</b></div>
        </StylDivDato>

      </GridDatosDest>

    </div>
  );
}