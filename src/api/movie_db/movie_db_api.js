import fetch from "node-fetch";
import { logging } from "../../utils/misc.js";
import { PATHS } from "./movie_db_paths.js";

class MovieDBAPI {
    constructor() {
        this.api_key = process.env.MOVIEDB_API_KEY;
        this.api_url = process.env.MOVIEDB_API_URL;
        this.PATHS = PATHS;
    }

    async fetch_api(url, method) {
        logging(`[${method}] - ${url}`);
        let resp = await fetch(url, { method });
        if (resp.status !== 200) return;
        resp = await resp.json();
        return resp;
    }

    async fetch_movies(type, page = 1) {
        let page_extention = `&page=${page}`;
        let { path, method } = this.PATHS.movies[`${type}`];
        let fetch_path = `${this.api_url}/movie${path}?api_key=${this.api_key}${
            type !== "latest" ? page_extention : ""
        }`;
        let resp = await this.fetch_api(fetch_path, (method = method));
    }

    async fetch_series(type, page = 1) {
        let page_extention = `&page=${page}`;
        let { path, method } = this.PATHS.movies[`${type}`];
        let fetch_path = `${this.api_url}/tv${path}?api_key=${this.api_key}${
            type !== "latest" ? page_extention : ""
        }`;
        let resp = await this.fetch_api(fetch_path, (method = method));
    }

    async fetch_genres(type) {
        let { path, method } = this.PATHS.genre[`${type}`];
        let fetch_path = `${this.api_url}${path}?api_key=${this.api_key}`;
        let resp = await this.fetch_api(fetch_path, (method = method));
    }

    async fetch_trending(type, day_or_week) {
        let { path, method } = this.PATHS.base[`${type}`];
        let fetch_path = `${this.api_url}/trending${path}/${day_or_week}?api_key=${this.api_key}`;
        let resp = await this.fetch_api(fetch_path, (method = method));
    }

    async fetch_search(search_type, search_value, page) {
        let { path, method } = this.PATHS.base[`${search_type}`];
        let fetch_path = `${this.api_url}/search${path}${this.api_key}&query=${search_value}&page=${page}`;
        let resp = await this.fetch_api(fetch_path, (method = method));
    }

    // async fetch_by_id(type, id) {
    //     let resp;

    //     if (type) {
    //         let { path, method } = this.PATHS.base[`${type}`];
    //         let fetch_path = `${this.api_url}${path}/${id}${this.api_key}`;
    //         resp = await fetch(fetch_path, { method });
    //         resp = await resp.json();
    //         return resp;
    //     }

    //     let { movie, series } = this.PATHS.base;
    //     resp = await fetch(`${this.api_url}${movie.path}/${id}${this.api_key}`, {
    //         method: movie.method,
    //     });

    //     if (resp.status !== 200) {
    //         resp = await fetch(`${this.api_url}${series.path}/${id}${this.api_key}`, {
    //             method: series.method,
    //         });
    //     }
    //     resp = await resp.json();
    //     console.log("This is the fetch by id resp: ", resp);
    //     // return resp;
    // }
}

export default MovieDBAPI;
