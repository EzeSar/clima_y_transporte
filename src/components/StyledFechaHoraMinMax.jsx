import styled from "styled-components";

const StylFechaHoraMinMax = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: repeat(5, 1fr);
  background-size: cover;
  background-position: top,right;
  align-items: center;
  justify-items: center;
  font-size: 1.5em;
  font-weight: bold;
  color: whitesmoke;
  text-shadow:
  1px 1px 1px black,
  0 0 0.5em red;
  padding: 10px;
  gap: 10px;
  border: ridge 10px burlywood;
`;

export default function StyledFechaHoraMinMax(props){
  return(
    <StylFechaHoraMinMax style={{backgroundImage:`url(${props.image})`}} >
      <div>{props.data.fecha}</div>
      <div>hora: {props.data.hora}</div>
      <div>min: {props.data.min}</div>
      <div>max: {props.data.max}</div>
      <div>{props.data.weather.name}</div>
    </StylFechaHoraMinMax>
  );
}