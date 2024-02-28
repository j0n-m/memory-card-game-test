import '../styles/scoreboard.css';
export default function Scoreboard({ score, bestScore }) {
  return (
    <div className="scoreboard">
      <div className="current-score">
        Score: {score}
      </div>
      <div className="best-score">
        Best Score: {bestScore}
      </div>
    </div>
  )
}