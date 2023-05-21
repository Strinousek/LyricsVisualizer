import { LyricsInterface } from "../utils/interfaces";
import LyricsParser from "../utils/lyricsParser";
import { GetLyricsFile } from "./fileManager";

const SPOTIFY_LYRICS_API_URL = "https://spclient.wg.spotify.com/color-lyrics/v2/track/";


const GetLyrics = async (trackId: string, token: string): Promise<LyricsInterface | null> => {
    let lyrics = await GetLyricsFile(trackId);
    if(lyrics !== null)
        return lyrics;

    try {
        const response = await fetch(SPOTIFY_LYRICS_API_URL + trackId + "?format=json&market=from_token", {
            headers: {
                "User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.0.0 Safari/537.36",
                "App-platform": "WebPlayer",
                "Authorization": `Bearer ${token}`,
            }
        }).then(res => res.json());
        const lyrics: LyricsInterface = LyricsParser(response.lyrics);
        return lyrics; 
    } catch {
        return null;
    }
};

export {
    GetLyrics,
}