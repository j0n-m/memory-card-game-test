import { useEffect, useState } from 'react'
import '../styles/app.css'
import Scoreboard from './Scoreboard'
import Pokemons from '../Pokemons';
import GameOver from './GameOver';

// eslint-disable-next-line react/prop-types
export default function MemoryGame({ }) {
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [pokemonList, setPokemonList] = useState([]);
  const [isGameOver, setIsGameOver] = useState(false);
  //useEffect with dependencys for score change
  //inside the body - setPokemonList?
  async function resetGame(amount) {
    const list = await Pokemons.getPokemons(amount);
    console.log('getting new pokemons', list)
    setPokemonList([...list]);
    setIsGameOver(false)
    setScore(0);
    if (score == 8) {
      setBestScore(0)
    }
  }
  function handleResetBtnClick(e) {
    e.target.textContent = "Loading...";
    e.target.disabled = true;
    resetGame(8);
  }
  useEffect(() => {
    if (isGameOver) {
      // resetGame(8);
      return;
    }
    console.log('inside effects')
    if (score == 0 && bestScore == 0) {
      setPokemonList(resetGame(8))
    }
    if (score == 0) return;
    if (score == 8) {
      console.log('in  effects looking at score == 8')
      setIsGameOver(true)
    }
    //if conditions for game flow?
    const newList = Pokemons.reshuffle(pokemonList);
    setPokemonList(newList)
    // Pokemons.getNewList(8);
    console.log('done shuffling')
  }, [score, isGameOver])

  function incrementScore(pokemonID) {
    //search the list for index of id (n)
    const listIndex = pokemonList.findIndex((pokemon) => pokemon.id == pokemonID)

    const duplicateClick = pokemonList[listIndex].isClicked;
    if (duplicateClick) {
      console.log('game over');
      setIsGameOver(true);
      return;
    }
    pokemonList[listIndex].isClicked = true;
    console.log(`is duplicate click? ${duplicateClick}`)
    setScore(score + 1);
    console.log('incremented score')
    if (score + 1 > bestScore) {
      setBestScore(score + 1);
    }
  }
  return (
    <>
      <header>
        <h1>Pokémon Memory Card Game</h1>
        <Scoreboard
          score={score}
          bestScore={bestScore}
          handleIncrementScore={incrementScore}
        />
      </header>
      {isGameOver ? <GameOver isGameWon={score == 8} handleClick={(e) => handleResetBtnClick(e)}></GameOver> :
        <main>
          {pokemonList.length ? pokemonList.map(pokemon =>
            <button type="button" className="card" key={pokemon.id} name={pokemon.name} onClick={() => incrementScore(pokemon.id)}>
              <div className="content">
                <div className="artwork">
                  <img src={pokemon.artwork} alt={pokemon.name} className='pokemon-artwork' />
                </div>
                <div className="name">
                  {pokemon.name}
                </div>

              </div>
            </button>) : <p>Loading pokemons...</p>}
        </main>}
    </>
  )
}