import fetch from "node-fetch";
import { PATHS } from "./movie_db_paths.js";
import { logging } from "../utils/misc.js";

import Cache from "../utils/cache.js";

class MovieDB {
    constructor() {
        this.api_key = process.env.MOVIEDB_API_KEY;
        this.api_url = process.env.MOVIEDB_API_URL;
        this.PATHS = PATHS;

        // Initialize Cache
        this.cache = new Cache();
    }

    async init_movies() {
        await this.fetch_movies("latest");
        await this.fetch_movies("upcoming");
        await this.fetch_movies("top_rated");
        await this.fetch_movies("popular");
        logging(`Fetching movies completed`);
    }

    async fetch_movies(type, page = 1) {
        let pageExtention = `&page=${page}`;
        let { path, method } = this.PATHS.movies[`${type}`];
        let fetchPath = `${this.api_url}/movie${path}?api_key=${this.api_key}${
            type !== "latest" ? pageExtention : ""
        }`;
        let resp = await fetch(fetchPath, { method });
        resp = await resp.json();
        this.cache.set("movies", type, resp);
    }
}

export default MovieDB;
