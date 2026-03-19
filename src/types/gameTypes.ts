export type Direction = "UP" | "DOWN" | "LEFT" | "RIGHT";

export type Point = {
    x: number;
    y: number;
};

export type GameState = {
    snake: Point[];
    food: Point;
    direction: Direction;
    isGameOver: boolean;
    score: number;
};