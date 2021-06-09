const PATHS = {
    movies: {
        latest: { path: "/latest", method: "get" },
        upcoming: { path: "/upcoming", method: "get" },
        top_rated: { path: "/top_rated", method: "get" },
        popular: { path: "/popular", method: "get" },
    },
    series: {
        popular: { path: "/popular", method: "get" },
        top_rated: { path: "/top_rated", method: "get" },
    },
    genre: {
        movie: { path: "/movie/list", method: "get" },
        tv: { path: "/tv/list", method: "get" },
    },
    base: {
        movie: { path: "/movie", method: "get" },
        series: { path: "/tv", method: "get" },
    },
};

export { PATHS };
