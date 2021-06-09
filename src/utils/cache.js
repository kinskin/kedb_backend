import { logging } from "./misc.js";

class Cache {
    constructor() {
        this.cache = new Map();
    }

    set(key, sub_key, value) {
        value = this.data_manipulation(sub_key, value);
        this.cache.set(`${key}`, value);
        let cached_data = this.get(key);
        if (cached_data === {}) return;
        console.log(cached_data);
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

    data_manipulation(sub_key, value) {
        let data = {};
        data["sub_type"] = sub_key;
        if (sub_key === "latest") {
            data["data"] = value;
        } else {
            data[`page_${value.page}`] = value.results;
        }
        return data;
    }
}

export default Cache;
