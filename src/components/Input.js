import React, { useState } from "react";

import "../styles/Input.scss";

export default function Input(props) {
  const [inputValue, setInputValue] = useState("");

  const { getInput } = props;
  const handleSubmit = (e, inputVal) => {
    e.preventDefault();
    getInput(inputVal);
    setInputValue("");
  };

  return (
    <form onSubmit={(e) => handleSubmit(e, inputValue)}>
      <label htmlFor="input-selection">
        Enter Pokemon name or number, or choose from cards below
      </label>
      <br />
      <input
        type="text"
        value={inputValue}
        id="input-selection"
        name="input-selection"
        placeholder="pokemon name or number"
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button type="submit">Look up Pokemon</button>
    </form>
  );
}
