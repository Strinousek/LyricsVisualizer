import { Response, Request, NextFunction } from 'express';
import { GetCachedData, SetCachedData } from "../managers/fileManager";
import env from "../utils/config";
import { CacheInterface } from "./interfaces";

const SPOTIFY_TOKEN_API_URL = "https://open.spotify.com/get_access_token?reason=transport&productType=web_player";

let spotifyToken: string | null = null;

const BindSpotifyToken = async () => {
    const cache = await GetCachedData();
    if(cache !== null && cache.accessToken.length > 0) {
        spotifyToken = cache.accessToken;
        return;
    }

    try {
        const response: CacheInterface = await fetch(SPOTIFY_TOKEN_API_URL, {
            headers: {
                "User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.0.0 Safari/537.36",
                "App-platform": "WebPlayer",
                "content-type": "text/html; charset=utf-8",
                "cookie": `sp_dc=${env.SP_DC};`,
            }
        }).then((res) => res.json());
        const isCached = await SetCachedData(response).then(() => true).catch(() => false);
        if(!isCached) {
            spotifyToken = null;
            return;
        }

        spotifyToken = response.accessToken;
    } catch {
        console.log("An error occured during the binding of spotify token.");
        spotifyToken = null;
    }
};

BindSpotifyToken();

const GetSpotifyToken = () => spotifyToken;

export {
    GetSpotifyToken
}