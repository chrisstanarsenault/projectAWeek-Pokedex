import React, { useState, useEffect } from "react";

import Card from "./Card";

import "../styles/CardsContainer.scss";

export default function CardsContainer() {
  const [pokeList, setPokeList] = useState([]);

  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon/?limit=150")
      .then((response) => response.json())
      .then((body) => {
        setPokeList(body.results);
      });
  }, []);

  return (
    <section className="cards-container">
      {pokeList.map((poke, index) => (
        <Card key={poke.name} pokeInfo={poke} pokeNum={index + 1} />
      ))}
    </section>
  );
}
