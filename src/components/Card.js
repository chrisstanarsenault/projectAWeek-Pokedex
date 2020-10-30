import React, { useState, useEffect } from "react";

import "../styles/Card.scss";
const Pokedex = require("pokeapi-js-wrapper");

export default function Card(props) {
  const [pokeData, setPokeData] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const P = new Pokedex.Pokedex();
  const { name, url } = props.pokeInfo;
  const typeColorList = {
    fire: "#FDDFDF",
    grass: "#DEFDE0",
    electric: "#FCF7DE",
    water: "#DEF3FD",
    ground: "#f4e7da",
    rock: "#d5d5d4",
    fairy: "#fceaff",
    poison: "#98d7a5",
    bug: "#f8d5a3",
    dragon: "#97b3e6",
    psychic: "#eaeda1",
    flying: "#F5F5F5",
    fighting: "#E6E0D4",
    normal: "#F5F5F5",
  };

  const getPoke = (pokemon) => {
    P.getPokemonByName(pokemon) // with Promise
      .then(function (response) {
        setPokeData(response);
        props.areCardsLoaded();
      });
  };

  const uppercaseFirstLetter = (name) => {
    return name[0].toUpperCase() + name.slice(1);
  };

  useEffect(() => {
    props.areCardsLoaded();
    getPoke(name);
  }, []);

  return (
    <section
      className="pokemon-card"
      style={{
        backgroundColor: `${typeColorList[pokeData.types[0].type.name]}`,
      }}
    >
      <div>
        <span>{pokeData.id.toString().padStart(3, "0")}</span>
        <span>{pokeData.types[0].type.name}</span>
      </div>

      <div className="pokemon-image-container">
        <img
          src={pokeData.sprites.other["official-artwork"].front_default}
          alt={pokeData.name}
        />
      </div>
      <h2>{uppercaseFirstLetter(name)}</h2>
    </section>
  );
}
