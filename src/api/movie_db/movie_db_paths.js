const PATHS = {
    movies: {
        latest: { path: "/latest", method: "GET" },
        upcoming: { path: "/upcoming", method: "GET" },
        top_rated: { path: "/top_rated", method: "GET" },
        popular: { path: "/popular", method: "GET" },
    },
    series: {
        popular: { path: "/popular", method: "GET" },
        top_rated: { path: "/top_rated", method: "GET" },
    },
    genre: {
        movie: { path: "/movie/list", method: "GET" },
        series: { path: "/tv/list", method: "GET" },
    },
    base: {
        movie: { path: "/movie", method: "GET" },
        series: { path: "/tv", method: "GET" },
    },
};

export { PATHS };
