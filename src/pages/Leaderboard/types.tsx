export type Leaders = {
    id: number;
    name: string;
    points: number;
    avatar: string;
}

export type LeaderboardState = {
    activeItem: string;
    leaders: Leaders[];
}
