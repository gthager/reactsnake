import { useEffect, useRef } from "react";
import type { Point } from "../types/gameTypes";

type GameCanvasProps = {
    snake: Point[];
    food: Point;
    gridSize: number;
    cellSize: number;
    isGameOver: boolean;
};

const GameCanvas = ({
                        snake,
                        food,
                        gridSize,
                        cellSize,
                        isGameOver,
                    }: GameCanvasProps) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    const draw = (ctx: CanvasRenderingContext2D) => {
        // Clear canvas
        ctx.clearRect(0, 0, gridSize * cellSize, gridSize * cellSize);

        // Draw snake
        ctx.fillStyle = "green";
        snake.forEach((segment) => {
            ctx.fillRect(
                segment.x * cellSize,
                segment.y * cellSize,
                cellSize,
                cellSize
            );
        });

        // Draw food
        ctx.fillStyle = "red";
        ctx.fillRect(
            food.x * cellSize,
            food.y * cellSize,
            cellSize,
            cellSize
        );

        // Game Over overlay
        if (isGameOver) {
            ctx.fillStyle = "rgba(0,0,0,0.5)";
            ctx.fillRect(0, 0, gridSize * cellSize, gridSize * cellSize);

            ctx.fillStyle = "white";
            ctx.font = "24px Arial";
            ctx.textAlign = "center";
            ctx.fillText(
                "Game Over",
                (gridSize * cellSize) / 2,
                (gridSize * cellSize) / 2
            );
        }
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        draw(ctx);
    }, [snake, food, isGameOver]);

    return (
        <canvas
            ref={canvasRef}
            width={gridSize * cellSize}
            height={gridSize * cellSize}
            style={{
                border: "2px solid #333",
                backgroundColor: "#111",
            }}
        />
    );
};

export default GameCanvas;