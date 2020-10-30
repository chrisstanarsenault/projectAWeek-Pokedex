import React, { useState, useEffect } from "react";

import Card from "./Card";

import Pokeball from "../images/pokeballLoader.png";
import "../styles/CardsContainer.scss";

export default function CardsContainer() {
  const [pokeList, setPokeList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const areCardsLoaded = () => {
    setIsLoading((prev) => !prev);
  };

  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon/?limit=150")
      .then((response) => response.json())
      .then((body) => {
        setPokeList(body.results);
      });
  }, []);

  if (isLoading) {
    return <img className="pokeball-spinner" src={Pokeball} alt="pokeball" />;
  } else {
    return (
      <section className="cards-container">
        {pokeList.map((poke, index) => (
          <Card
            key={poke.name}
            pokeInfo={poke}
            pokeNum={index + 1}
            areCardsLoaded={areCardsLoaded}
          />
        ))}
      </section>
    );
  }
}
