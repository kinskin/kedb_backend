import express from "express";

import { MovieDB } from "./src/api/index.js";

import { logging } from "./src/utils/misc.js";

class KEDB {
    constructor() {
        this.app = express();
        this.PORT = process.env.PORT || 3000;

        // initializise MovieDB
        this.movie_db = new MovieDB();
    }

    async start() {
        await this.movie_db.init();
        this.app.listen(this.PORT, logging(`Listening to PORT ${this.PORT}`));
    }
}

//Initialize KEDB Application
const kedb = new KEDB();
kedb.start();
