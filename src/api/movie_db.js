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

    async init() {
        // await this.init_movies();
        // await this.init_series();
        // await this.init_genres();
        await this.init_trending();
    }

    async init_movies() {
        await this.fetch_movies("latest");
        await this.fetch_movies("upcoming");
        await this.fetch_movies("top_rated");
        await this.fetch_movies("popular");
        logging(`Fetching movies completed`);
    }

    async init_series() {
        await this.fetch_series("popular");
        await this.fetch_series("top_rated");
        logging(`Fetching series completed`);
    }

    async init_genres() {
        await this.fetch_genres("movie");
        await this.fetch_genres("series");
        logging(`Fetching genre completed`);
    }

    async init_trending() {
        await this.fetch_trending("movie", "day");
        await this.fetch_trending("movie", "week");
        await this.fetch_trending("series", "day");
        await this.fetch_trending("series", "week");
        logging(`Fetching trending completed`);
    }

    async fetch_movies(type, page = 1) {
        let page_extention = `&page=${page}`;
        let { path, method } = this.PATHS.movies[`${type}`];
        let fetch_path = `${this.api_url}/movie${path}?api_key=${this.api_key}${
            type !== "latest" ? page_extention : ""
        }`;
        let resp = await fetch(fetch_path, { method });
        resp = await resp.json();
        this.cache.set("movies", type, resp);
    }

    async fetch_series(type, page = 1) {
        let page_extention = `&page=${page}`;
        let { path, method } = this.PATHS.movies[`${type}`];
        let fetch_path = `${this.api_url}/tv${path}?api_key=${this.api_key}${
            type !== "latest" ? page_extention : ""
        }`;
        let resp = await fetch(fetch_path, { method });
        resp = await resp.json();
        console.log("This is the series resp: ", resp);
        // this.cache.set("tv_series", type, resp);
    }

    async fetch_genres(type) {
        let { path, method } = this.PATHS.genre[`${type}`];
        let fetch_path = `${this.api_url}${path}?api_key=${this.api_key}`;
        let resp = await fetch(fetch_path, { method });
        resp = await resp.json();
        console.log("This is the genre resp: ", resp);
        // this.cache.set("genre", type, resp);
    }

    async fetch_trending(type, day_or_week) {
        let { path, method } = this.PATHS.base[`${type}`];
        let fetch_path = `${this.api_url}/trending${path}/${day_or_week}?api_key=${this.api_key}`;
        let resp = await fetch(fetch_path, { method });
        resp = await resp.json();
        console.log("This is the trending resp: ", resp);
        // this.cache.set("trending", type, resp);
    }

    async fetch_search(search_type, search_value, page) {
        let { path, method } = this.PATHS.base[`${search_type}`];
        let fetch_path = `${this.api_url}/search${path}${this.api_key}&query=${search_value}&page=${page}`;
        let resp = await fetch(fetch_path, { method });
        resp = await resp.json();
        console.log("This is the search resp: ", resp);
        // this.cache.set("trending", type, resp);
    }

    async fetch_by_id(type, id) {
        let resp;

        if (type) {
            let { path, method } = this.PATHS.base[`${type}`];
            let fetch_path = `${this.api_url}${path}/${id}${this.api_key}`;
            resp = await fetch(fetch_path, { method });
            resp = await resp.json();
            return resp;
        }

        let { movie, series } = this.PATHS.base;
        resp = await fetch(`${this.api_url}${movie.path}/${id}${this.api_key}`, {
            method: movie.method,
        });

        if (resp.status !== 200) {
            resp = await fetch(`${this.api_url}${series.path}/${id}${this.api_key}`, {
                method: series.method,
            });
        }
        resp = await resp.json();
        console.log("This is the fetch by id resp: ", resp);
        // return resp;
    }
}

export default MovieDB;
