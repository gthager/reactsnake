import { useEffect, useRef, useState } from "react";
import type {Point, Direction} from "../types/gameTypes";

const GRID_SIZE = 20;

const getRandomFood = (snake: Point[], gridSize: number): Point => {
    let newFood: Point;
    let isCollision = true;

    while (isCollision)
    {
        newFood = {
            x: Math.floor(Math.random() * gridSize),
            y: Math.floor(Math.random() * gridSize),
        }

        isCollision = snake.some(
            (segment) => segment.x === newFood.x && segment.y === newFood.y
        );

        if (!isCollision)
        {
            return newFood;
        }
    }

    return { x: 0, y: 0 }; // Fallback, should never reach here
}

export const useGameEngine = () => {
    const [snake, setSnake] = useState<Point[]>([{ x: 10, y: 10 }]);
    const [food, setFood] = useState<Point>(getRandomFood(snake, GRID_SIZE));
    const [direction, setDirection] = useState<Direction>("RIGHT");
    const [isGameOver, setIsGameOver] = useState(false);
    const [score, setScore] = useState(0);

    const foodRef = useRef(food);
    const directionRef = useRef(direction);
    directionRef.current = direction;
    useEffect(() => {
        foodRef.current = food;
    }, [food]);

    const moveSnake = () => {
        if (isGameOver) return;

        setSnake((prevSnake) => {
            const head = prevSnake[0];
            let newHead = { ...head };

            switch (directionRef.current) {
                case "UP":
                    newHead.y -= 1;
                    break;
                case "DOWN":
                    newHead.y += 1;
                    break;
                case "LEFT":
                    newHead.x -= 1;
                    break;
                case "RIGHT":
                    newHead.x += 1;
                    break;
            }

            // Wall collision
            if (
                newHead.x < 0 ||
                newHead.y < 0 ||
                newHead.x >= GRID_SIZE ||
                newHead.y >= GRID_SIZE
            ) {
                setIsGameOver(true);
                return prevSnake;
            }

            // Self collision
            if (prevSnake.some(seg => seg.x === newHead.x && seg.y === newHead.y)) {
                setIsGameOver(true);
                return prevSnake;
            }

            const newSnake = [newHead, ...prevSnake];

            // Food collision
            const currentFood = foodRef.current;

            if (newHead.x === currentFood.x && newHead.y === currentFood.y) {
                setFood(getRandomFood(snake, GRID_SIZE));
                setScore((s) => s + 1);
            } else {
                newSnake.pop();
            }

            return newSnake;
        });
    };

    // Game loop
    useEffect(() => {
        const interval = setInterval(moveSnake, 150);
        return () => clearInterval(interval);
    }, [isGameOver]);

    const resetGame = () => {
        setSnake([{ x: 10, y: 10 }]);
        setFood(getRandomFood(snake, GRID_SIZE));
        setDirection("RIGHT");
        setIsGameOver(false);
        setScore(0);
    };

    return {
        snake,
        food,
        direction,
        setDirection,
        isGameOver,
        score,
        resetGame,
    };
};