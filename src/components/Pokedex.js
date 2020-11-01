import React from "react";

import "../styles/Pokedex.scss";

export default function Pokedex(props) {
  const { closeModal, pokeData } = props;

  const uppercaseFirstLetter = (name) => {
    return name[0].toUpperCase() + name.slice(1);
  };
  return (
    <section className="module-container">
      <div className="pokedex-container">
        <div className="lefthand-pokedex">
          <div className="glass"></div>
          <div className="poke-screen">
            <span>#{pokeData.id.toString().padStart(3, "0")}</span>
            <img
              src={pokeData.sprites.other["official-artwork"].front_default}
              alt={pokeData.name}
            />
          </div>
          <div className="controllers">
            <div className="circle-button"></div>
            <div className="cross">
              <span className="cross-button up"></span>
              <span className="cross-button right"></span>
              <span className="cross-button down"></span>
              <span className="cross-button left"></span>
              <span className="cross-button center"></span>
            </div>
          </div>
        </div>

        <div className="righthand-pokedex">
          <button onClick={closeModal}>Close</button>
          <div className="poke-info-screen">
            <h2>{uppercaseFirstLetter(pokeData.name)}</h2>
            <h3>Type</h3>
            <ul>
              {pokeData.types.map((item) => (
                <li key={`type-${item.type.name}`}>{item.type.name}</li>
              ))}
            </ul>
            <h3>Abilities</h3>
            <ul>
              {pokeData.abilities.map((each, index) => (
                <li key={`ability-${each.ability.name}`}>
                  {each.ability.name}
                </li>
              ))}
            </ul>
            <h3>Moves</h3>
            <ul>
              {pokeData.moves.map((each) => (
                <li key={`move-${each.move.name}`}>{each.move.name}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
