import express from "express";
import { logging } from "./src/utils/misc.js";

import MovieDB from "./src/api/movie_db.js";
import Cache from "./src/utils/cache.js";

class KEDB {
    constructor() {
        this.app = express();
        this.PORT = process.env.PORT || 3000;

        // initializise MovieDB
        this.movie_db = new MovieDB();
    }

    async start() {
        await this.movie_db.init_movies();
        this.app.listen(this.PORT, logging(`Listening to PORT ${this.PORT}`));
    }
}

const kedb = new KEDB();
kedb.start();
