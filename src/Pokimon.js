import { useState } from "react";

export default function PokimonSearch() {
  const [searchInput, setSearchInput] = useState();

  const {
    execute: fetchPokemon,
    status,
    error,
    data: pokemonImg
  } = useAsync(() => fetch(`https://pokeapi.co/api/v2/pokemon/${searchInput}`));

  const onSearchInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  return (
    <div className="App">
      <h1>Search for a pokemon</h1>
      <input type="text" onChange={onSearchInputChange} />
      <button onClick={fetchPokemon}>Search</button>
      {status === "Loading" ? "Loading..." : null}
      {status === "error" ? error : null}
      {status === "success" && pokemonImg && (
        <div>
          <img src={pokemonImg.sprites.front_default} alt="pokemon" />
        </div>
      )}
    </div>
  );
}

function useAsync(fn) {
  const [data, setData] = useState(null);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState(null);

  const execute = () => {
    setStatus("loading");
    setError(null);
    fn()
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        setStatus("success");
      })
      .catch((e) => {
        setError(e.message);
        setStatus("error");
      });
  };
  return { execute, data, status, error };
}
