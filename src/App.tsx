import { useGameEngine } from "./hooks/useGameEngine";
import GameCanvas from "./components/GameCanvas";
import Controls from "./components/Controls";
import ScoreBoard from "./components/ScoreBoard";

function App() {
    const { snake, food, setDirection, direction, isGameOver, score, resetGame } = useGameEngine();

    return (
        <div className="game-container">
            <h1>React Snake</h1>
            <ScoreBoard
                score={score}
                highScore={0} // You can add localStorage for this later!
                isGameOver={isGameOver}
                onRestart={resetGame}
            />
            <GameCanvas
                snake={snake}
                food={food}
                gridSize={20}
                cellSize={20}
                isGameOver={isGameOver}
            />
            <Controls
                direction={direction}
                setDirection={setDirection}
                isGameOver={isGameOver}
            />
        </div>
    );
}

export default App;