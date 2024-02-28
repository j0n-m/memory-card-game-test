// export default function getPokemons() {
//   return [{ name: 'pichu', id: 1 }, { name: 'squirtle', id: 2 }]
// }
const Pokemons = (function Pokemons() {
  let pokemonIds = []; //Pokemon ids to be used to fetch pokeAPI
  const API = `https://pokeapi.co/api/v2/pokemon/`

  async function getPokemons(numOfPokemons = 1) {
    // if (!pokemonIds.length) {
    //   pokemonIds = getRandomID(numOfPokemons);
    // }
    pokemonIds = getRandomID(numOfPokemons);
    // const poke = await handleFetchPokemon(1);
    // console.log(poke)
    const pokeList = [];
    for (const pokeId of pokemonIds) {
      pokeList.push(await handleFetchPokemon(pokeId))
    }
    console.log(pokeList)

    return pokeList //[{name,id,artwork}]
  }
  async function handleFetchPokemon(pokemonId) {
    const response = await fetch(`${API}${pokemonId}`, { mode: 'cors' });
    const data = await response.json();
    const artwork = data.sprites.other['official-artwork']['front_default']
    const { name, id } = await data;
    // console.log(name.toUpperCase())
    return { name: name.toUpperCase(), id, artwork, isClicked: false };
  }
  function getRandomID(maxAmount) {
    //1-151
    const result = [];
    const history = [];
    let currentCount = 0;
    while (currentCount < maxAmount) {
      let id = parseInt(Math.random() * (151) + 1)
      const isDuplicate = history.some((el) => el == id)
      if (isDuplicate) {
        // console.log('is duplicaate')
        continue;
      }
      history.push(id);
      result.push(id);
      currentCount++;
    }
    return result;
  }
  async function getNewList(amount) {
    const list = await getPokemons(amount);
    console.log('newly new list', list)
    return list;
  }
  function reshuffle(pokemonList) {
    // console.log('reshuffling -> ', pokemonList)
    const currentPokemonList = [...pokemonList]
    const newPokemonList = [];
    // console.log('old list ->', currentPokemonList)
    while (currentPokemonList.length) {
      let randomIndex = parseInt(Math.random() * currentPokemonList.length); //0 to n length
      const pokemon = currentPokemonList[randomIndex]; //pokemon object
      newPokemonList.push(pokemon)
      currentPokemonList.splice(randomIndex, 1); //removes from currentList
    }
    return newPokemonList;
  }
  return { getPokemons, reshuffle, getNewList }
})();
export default Pokemons;