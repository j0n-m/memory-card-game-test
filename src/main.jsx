import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './components/App.jsx'
import './styles/index.css'
import Pokemons from './Pokemons.js'
import MemoryGame from './components/MemoryGame.jsx';

const pokemons = await Pokemons.getPokemons(8);
console.log('main.jsx -->', pokemons)
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App>
      <MemoryGame
        pokemons={pokemons}
      />
    </App>
  </React.StrictMode >
)
