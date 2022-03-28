import { logging } from "./misc.js";

class Cache {
    constructor() {
        this.cache = new Map();
    }

    set(key, sub_key, value, day_or_week = null) {
        value = this.data_manipulation(sub_key, value);
        this.cache.set(`${key}`, value);
        let cached_data = this.get(key);
        console.log(`this is the ${key} and ${sub_key} data: ${cached_data}`);
        if (cached_data === {}) return;
        return true;
    }

    get(key) {
        return this.cache.get(`${key}`);
    }

    delete(key) {
        this.cache.delete(`${key}`);
        let deleted_data = this.cache.get(key);
        if (deleted_data !== {}) return;
        return true;
    }

    clear() {
        this.cache.clear();
        logging("Cache cleared");
    }

    size() {
        logging(`Cache size: ${this.cache.size}`);
    }
}

export default Cache;
