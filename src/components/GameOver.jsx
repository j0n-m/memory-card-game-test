import '../styles/gameover.css'

export default function GameOver({ handleClick, isGameWon = false }) {
  return (
    <div className="game-over">
      <h2 className='title'>{isGameWon ? 'Game Over, You win!' : 'Game Over'}</h2>
      <button className="retry-btn" onClick={handleClick}>Play again</button>
    </div>
  )
}