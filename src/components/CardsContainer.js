import React, { useState, useEffect } from "react";

import Card from "./Card";
import PokedexModal from "./Pokedex";
import Input from "./Input";

import Pokeball from "../images/pokeballLoader.png";
import "../styles/CardsContainer.scss";

const Pokedex = require("pokeapi-js-wrapper");

export default function CardsContainer() {
  const [pokeList, setPokeList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pokeModalData, setPokeModalData] = useState({});

  const invalidPokemon = {
    id: "000",
    name: "invalid Pokemon",
    sprites: {
      other: {
        "official-artwork": {
          front_default: Pokeball,
        },
      },
    },
    types: [
      {
        type: {
          name: "N/A",
        },
      },
    ],
    abilities: [
      {
        ability: {
          name: "N/A",
        },
      },
    ],
    moves: [
      {
        move: {
          name: "N/A",
        },
      },
    ],
  };

  const P = new Pokedex.Pokedex();

  const getPoke = async (pokemon) => {
    await P.getPokemonByName(pokemon) // with Promise
      .then(function (response) {
        setPokeModalData(response);
        setIsModalOpen(true);
      })
      .catch((err) => {
        setPokeModalData(invalidPokemon);
        setIsModalOpen(true);
      });
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const getPokeData = (data) => {
    setPokeModalData(data);
  };

  const formatInput = (str) => {
    if (str[0] === "0" && str[1] === "0") {
      return str[2];
    } else if (str[0] === "0" && str[1] !== "0") {
      return `${str[1] + str[2]}`;
    } else {
      return str.toLowerCase();
    }
  };

  const getInputSelection = (inputData) => {
    getPoke(formatInput(inputData));
  };

  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon/?limit=150")
      .then((response) => response.json())
      .then((body) => {
        setPokeList(body.results);
      });
  }, []);

  return (
    <section className="cards-container">
      <Input getInput={getInputSelection} />
      {isModalOpen && (
        <PokedexModal closeModal={closeModal} pokeData={pokeModalData} />
      )}
      {pokeList.map((poke, index) => (
        <Card
          key={poke.name}
          pokeInfo={poke}
          pokeNum={index + 1}
          openModal={openModal}
          getPokeData={getPokeData}
        />
      ))}
    </section>
  );
}
