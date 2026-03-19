import { useEffect } from "react";
import type { Direction } from "../types/gameTypes";

type ControlsProps = {
    direction: Direction;
    setDirection: (dir: Direction) => void;
    isGameOver: boolean;
};

const Controls = ({ direction, setDirection, isGameOver }: ControlsProps) => {
    // Prevent reversing direction (important game logic)
    const isOpposite = (newDir: Direction) => {
        return (
            (direction === "UP" && newDir === "DOWN") ||
            (direction === "DOWN" && newDir === "UP") ||
            (direction === "LEFT" && newDir === "RIGHT") ||
            (direction === "RIGHT" && newDir === "LEFT")
        );
    };

    const handleDirectionChange = (newDir: Direction) => {
        if (!isOpposite(newDir) && !isGameOver) {
            setDirection(newDir);
        }
    };

    // Keyboard controls
    useEffect(() => {

        // Debounce rapid key presses
        let lastKeyTime = 0;
        const handleKeyDown = (e: KeyboardEvent) => {

            const now = Date.now();
            if (now - lastKeyTime < 50)
            {
                return; // Ignore if less than 50ms since last key press
            }
            lastKeyTime = now;
            switch (e.key) {
                case "ArrowUp":
                    handleDirectionChange("UP");
                    break;
                case "ArrowDown":
                    handleDirectionChange("DOWN");
                    break;
                case "ArrowLeft":
                    handleDirectionChange("LEFT");
                    break;
                case "ArrowRight":
                    handleDirectionChange("RIGHT");
                    break;
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [direction, isGameOver]);

    // Optional: on-screen controls (mobile-friendly)
    return (
        <div style={{ marginTop: "1rem", textAlign: "center" }}>
            <div>
                <button onClick={() => handleDirectionChange("UP")}>↑</button>
            </div>
            <div>
                <button onClick={() => handleDirectionChange("LEFT")}>←</button>
                <button onClick={() => handleDirectionChange("DOWN")}>↓</button>
                <button onClick={() => handleDirectionChange("RIGHT")}>→</button>
            </div>
        </div>
    );
};

export default Controls;