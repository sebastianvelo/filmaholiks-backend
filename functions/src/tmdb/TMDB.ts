import TMDBClient from "tmdb-js";
import config from "./tmdb.config.json";

const TMDB = new TMDBClient(config.api_key);
export default TMDB;