import { useState } from "react";

const choices = ["stone", "paper", "scissor"];

export default function App() {
  const [playerChoice, setPlayerChoice] = useState("");
  const [computerChoice, setComputerChoice] = useState("");
  const [result, setResult] = useState("");
  const [rounds, setRounds] = useState(0);
  const [history, setHistory] = useState([]);
  const [streak, setStreak] = useState(0);

  const getComputerChoice = () => {
    return choices[Math.floor(Math.random() * choices.length)];
  };

  const getWinner = (player, computer) => {
    if (player === computer) return "Draw";

    if (
      (player === "stone" && computer === "scissor") ||
      (player === "paper" && computer === "stone") ||
      (player === "scissor" && computer === "paper")
    ) {
      return "Player Wins";
    } else {
      return "Computer Wins";
    }
  };

  const playGame = (choice) => {
    const computer = getComputerChoice();
    const winner = getWinner(choice, computer);

    setPlayerChoice(choice);
    setComputerChoice(computer);
    setResult(winner);
    setRounds((prev) => prev + 1);

    if (winner === "Player Wins") {
      setStreak((prev) => prev + 1);
    } else {
      setStreak(0);
    }

    setHistory((prev) => [
      ...prev,
      {
        round: rounds + 1,
        player: choice,
        computer: computer,
        result: winner,
      },
    ]);
  };

  const resetGame = () => {
    setPlayerChoice("");
    setComputerChoice("");
    setResult("");
    setRounds(0);
    setHistory([]);
    setStreak(0);
  };

  return (
    <div>
      <h1>Stone Paper Scissor</h1>

      <button onClick={() => playGame("stone")}> Stone 🪨</button>
      <button onClick={() => playGame("paper")}>Paper 📄</button>
      <button onClick={() => playGame("scissor")}>Scissor✂️ </button>

      <p>Rounds: {rounds}</p>
      <p>Streak: {streak}</p>

      {playerChoice && (
        <div>
          <p>You: {playerChoice}</p>
          <p>Computer: {computerChoice}</p>
          <p>{result}</p>
        </div>
      )}

      <button onClick={resetGame}>Reset</button>

      <h3>History</h3>
      <ul>
        {history.map((item, index) => (
          <li key={index}>
            Round {item.round}: {item.player} vs {item.computer} →{" "}
            {item.result}
          </li>
        ))}
      </ul>
    </div>
  );
}