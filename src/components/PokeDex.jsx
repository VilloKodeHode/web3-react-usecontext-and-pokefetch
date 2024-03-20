import { useEffect, useState } from "react";

// FETCH: Syntax for fetching data
export default function PokeDex() {
  // set useStates for different data
  const [pokemonList, setPokemonList] = useState(null);
  const [pokemonMoreInfo, setPokemonMoreInfo] = useState(null);
  // typical way of setting url:
  const numberOfPokeMons = 150;
  const baseUrl = `https://pokeapi.co/api/v2/pokemon/?limit=${numberOfPokeMons}`;

  // FETCH: use a useEffect to fetch data. UseEffect runs when the component mounts
  useEffect(() => {
    // FETCH: This code is identical how you could do it in vanilla code. The only difference is using the useState to set the data:
    async function fetchEmAll() {
      const response = await fetch(baseUrl);
      const data = await response.json();
      console.log(data.results[0].name);
      setPokemonList(data.results);
      console.log(pokemonList);

      const pokemonUrls = data.results.map((pokemon) => pokemon.url);
      const pokemonPromises = pokemonUrls.map((url) =>
        fetch(url).then((response) => response.json())
      );
      const pokemonDetails = await Promise.all(pokemonPromises);
      // this is the final data we want to use since it provides more data then the first fetch:
      setPokemonMoreInfo(pokemonDetails);
      console.log("pokemonDetails:", pokemonDetails);
    }
    fetchEmAll();
  }, [baseUrl]);

  return (
    <>
      <h1>pokeDex</h1>
      <ul className="flex flex-wrap gap-8 max-w-[400px]">
        {pokemonMoreInfo?.map((pokemon) => (
          <>
            <li
              key={pokemon.name}
              className="list-none transition-all hover:scale-150"
            >
              <p>{pokemon.name}</p>
              <img src={pokemon.sprites.front_default} alt="" />
            </li>
          </>
        ))}
      </ul>
    </>
  );
}
