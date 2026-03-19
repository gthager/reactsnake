type ScoreBoardProps = {
    score: number;
    highScore: number;
    isGameOver: boolean;
    onRestart: () => void;
};

const ScoreBoard = ({
                        score,
                        highScore,
                        isGameOver,
                        onRestart,
                    }: ScoreBoardProps) => {
    return (
        <div
            style={{
                marginBottom: "1rem",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                maxWidth: "400px",
            }}
        >
            <div>
                <div>Score: {score}</div>
                <div>High Score: {highScore}</div>
            </div>

            {isGameOver && (
                <button onClick={onRestart}>
                    Restart
                </button>
            )}
        </div>
    );
};

export default ScoreBoard;