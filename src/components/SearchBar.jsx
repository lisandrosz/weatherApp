import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import Loader from "./Loader";

const Container = styled.div`
  box-sizing: border-box;
  font-family: "Roboto Slab", serif;
  width: 30%;
  height: 30px;
  margin-left: 50px;
`;

const Texto = styled.input`
  margin-left: 20px;
  margin-right: 25px;
  border-radius: 8px;
  background-color: #fff7e9;
`;

const Boton = styled.button`
  background-color: #395b64;
  border-radius: 8px;
  color: #fff7e9;
  border: none;
  transition: transform 0.5s;
  &:hover {
    transform: scale(1.1);
  }
`;

export default function SearchBar({ onSearch }) {
  const [textState, setText] = useState("");
  const [loading, setLoading] = useState(false);

  const changeText = (evento) => {
    setText(evento.target.value);
  };

  const clickButton = async (event) => {
    if (event.type === "click" || event.key === "Enter") {
      setLoading(true);
      const apiKey = "698aaf398dc2de525ed31b699aa3a4c7";
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${textState}&appid=${apiKey}&units=metric/`;

      await axios
        .get(url)
        .then((response) => onSearch(response.data))
        .catch(() => alert("Ciudad no encontrada"))
        .finally(() => setLoading(false));
    }
  };

  return (
    <>
      {loading && <Loader />}
      <Container>
        <Texto
          value={textState}
          type="text"
          placeholder="Buscar..."
          onChange={changeText}
          onKeyDown={clickButton}
        />
        <Boton onClick={clickButton}>Agregar</Boton>
        <hr />
      </Container>
    </>
  );
}
