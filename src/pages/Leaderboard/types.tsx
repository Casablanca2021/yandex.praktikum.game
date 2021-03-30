type Leaders = {
    id: number;
    name: string;
    points: number;
    avatar: string;
}

type LeaderboardPage = {
    activeItem: string;
    leaders: Leaders[];
}

export { LeaderboardPage, Leaders };
