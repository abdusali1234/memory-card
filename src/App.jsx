import { useState, useEffect } from "react";
import Card from "./components/Card";
import Modal from "./components/Modal";
import "./App.css";

function App() {
  // Some cool pokemon from when I was a wee lad
  const pokemons = [
    {
      id: 0,
      name: "charizard",
    },
    {
      id: 1,
      name: "lucario",
    },
    {
      id: 2,
      name: "piplup",
    },
    {
      id: 3,
      name: "pikachu",
    },
    {
      id: 4,
      name: "eevee",
    },
    {
      id: 5,
      name: "squirtle",
    },
    {
      id: 6,
      name: "psyduck",
    },
    {
      id: 7,
      name: "diglett",
    },
    {
      id: 8,
      name: "mew",
    },
  ];

  const [pokemonData, setPokemonData] = useState([]);

  function shuffle(arr) {
    let shuffled = arr
      .map((val) => ({ val, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ val }) => val);
    return shuffled;
  }

  async function getPokemonData() {
    try {
      const fetchedResults = await Promise.all(
        pokemons.map(async (pokemon) => {
          console.log(pokemon);
          const response = await fetch(
            `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`
          );
          const data = await response.json();
          return {
            ...pokemon,
            imageUrl: data.sprites.other.dream_world.front_default,
            name: pokemon.name[0].toUpperCase() + pokemon.name.slice(1),
          };
        })
      );

      setPokemonData(() => shuffle(fetchedResults));
    } catch (err) {
      console.log("Error fetching from Pokemon API: ", err);
    }
  }

  useEffect(() => {
    getPokemonData();
  }, []);

  const [selectedPokemonIds, setSelectedPokemonIds] = useState([]);
  const [currScore, setCurrScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [modalDialogMessage, setModalDialogMessage] = useState("");

  function checkGameStatus(pokemonId) {
    if (selectedPokemonIds.includes(pokemonId)) {
      console.log(selectedPokemonIds);
      setModalDialogMessage(() => "Game Over!");
      console.log(modalDialogMessage);
    } else {
      setSelectedPokemonIds((prev) => [...prev, pokemonId]);
      console.log(selectedPokemonIds);
      setCurrScore((currScore) => currScore + 1);
      setPokemonData(() => shuffle(pokemonData));
      if (currScore == 8) {
        setModalDialogMessage(() => "You won!");
      }
    }
  }

  function resetGame() {
    if (currScore > bestScore) {
      setBestScore(() => currScore);
    }
    setCurrScore(() => 0);
    setSelectedPokemonIds(() => []);
    setModalDialogMessage(() => "");
    setPokemonData(() => shuffle(pokemonData));
  }

  return (
    <>
      {modalDialogMessage && (
        <Modal message={modalDialogMessage} handleChange={resetGame}></Modal>
      )}
      <div className="pokemon-card-grid">
        {pokemonData.map((pokemon) => (
          <Card
            {...pokemon}
            key={pokemon.id}
            handleChange={() => checkGameStatus(pokemon.id)}
          ></Card>
        ))}
      </div>
    </>
  );
}

export default App;
