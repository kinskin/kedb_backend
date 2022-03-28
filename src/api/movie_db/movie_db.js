import Cache from "../../utils/cache.js";
import MovieDBAPI from "./movie_db_api.js";

import { logging } from "../../utils/misc.js";

class MovieDB {
    constructor() {
        // Initialize Cache
        this.cache = new Cache();

        //Initialize Movie DB API
        this.movie_db_api = new MovieDBAPI();
    }

    async init() {
        await this.init_movies();
        // await this.init_series();
        // await this.init_genres();
        // await this.init_trending();
    }

    async init_movies() {
        let latest = await this.movie_db_api.fetch_movies("latest");
        let upcoming = await this.movie_db_api.fetch_movies("upcoming");
        let top_rated = await this.movie_db_api.fetch_movies("top_rated");
        let popular = await this.movie_db_api.fetch_movies("popular");
        this.movies_data_manipulation(latest, upcoming, top_rated, popular);
        logging(`Fetching movies completed`);
    }

    async init_series() {
        await this.movie_db_api.fetch_series("popular");
        await this.movie_db_api.fetch_series("top_rated");
        logging(`Fetching series completed`);
    }

    async init_genres() {
        await this.movie_db_api.fetch_genres("movie");
        await this.movie_db_api.fetch_genres("series");
        logging(`Fetching genre completed`);
    }

    async init_trending() {
        await this.movie_db_api.fetch_trending("movie", "day");
        await this.movie_db_api.fetch_trending("movie", "week");
        await this.movie_db_api.fetch_trending("series", "day");
        await this.movie_db_api.fetch_trending("series", "week");
        logging(`Fetching trending completed`);
    }

    movies_data_manipulation(
        latest = null,
        upcoming = null,
        top_rated = null,
        popular = null,
        page = 1
    ) {
        let data,
            sub_data = {};
        data = this.get_cached_data("movies");
        if (!data) data = [];

        if (latest) {
            let cached_latest = data.filter((key) => key.sub_key === "latest");
            sub_data["sub_type"] = "latest";
            sub_data["data"] = latest;
            if (cached_latest) cached_latest = sub_data;
        }

        if (upcoming) {
            sub_data["sub_type"] = "upcoming";
            sub_data[`page_${upcoming.page}`] = upcoming.results;
        }

        if (top_rated) {
            sub_data["sub_type"] = "top_rated";
            sub_data[`page_${top_rated.page}`] = top_rated.results;
        }

        if (popular) {
            sub_data["sub_type"] = "popular";
            sub_data[`page_${popular.page}`] = popular.results;
        }
        return data;
    }

    get_cached_data() {}
    save_new_data_to_cache() {}
}

export default MovieDB;
