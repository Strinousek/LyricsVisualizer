import fs, {constants} from "fs/promises";
import { CacheInterface, LyricsInterface } from "../utils/interfaces";

/**
 * Ensures that the cache file is present.
 * 
 * If the file is **NOT** present, tries to create a new one.
 * 
 * In case of an error, application is killed.  
*/
const EnsureCacheFile = async () => {
    try {
        const path = "./cache.json";
        const canAccess = await fs.access(path, constants.F_OK).then(() => true).catch(() => false);
        if(!canAccess) {
            const fileHandle = await fs.open(path, "w");
            const defaultCacheData = <CacheInterface>{
                accessToken: "",
                accessTokenExpirationTimestampMs: 0,
                clientId: "",
                isAnonymous: false,
            };
            await fileHandle.writeFile(JSON.stringify(defaultCacheData));
            await fileHandle.close();
            console.log("Cache file. succesfully created.")
        }
    } catch {
        console.log("An error occured during cache file ensuring. Closing application...")
        process.exit();
    }
};

/**
 * Retrieves cache data from local file.
 * @returns `CacheInterface` or `null`
 */
const GetCachedData = async (): Promise<CacheInterface | null> => {
    try {
        const path = "./cache.json";
        const fileHandle = await fs.open(path);
        const fileContent = await fileHandle.readFile("utf8");
        await fileHandle.close();
        return JSON.parse(fileContent);
    } catch {
        console.log("An error occured while getting cache data. ...")
        return null;
    }
};

/**
 * 
 * @param cacheData 
 * @returns 
 */
const SetCachedData = async (cacheData: CacheInterface): Promise<null | void> => {
    try {
        const path = "./cache.json";
        const fileHandle = await fs.open(path, "w");
        await fileHandle.writeFile(JSON.stringify(cacheData), "utf8");
        await fileHandle.close();
    } catch {
        console.log("An error occured while setting cache data. ...")
        return null;
    }
};

/**
 * Ensures that the lyrics folder is present.
 * 
 * If the folder is **NOT** present, tries to create a new one.
 * 
 * In case of an error, application is killed.  
*/
const EnsureLyricsFolder = async () => {
    try {
        const path = "./lyrics";
        const canAccess = await fs.access(path, constants.F_OK).then(() => true).catch(() => false);
        if(!canAccess)
            await fs.mkdir(path).then(() => console.log("Lyrics folder. succesfully created."));
    } catch {
        console.log("An error occured during lyrics folder ensuring. Closing application...")
        process.exit();
    }
};

/**
 * Retrieves parsed Lyrics from a local directory, if found.
 * @param trackId Spotify Track ID
 * @returns `LyricsInterface` or `null`
 */
const GetLyricsFile = async (trackId: string): Promise<null | LyricsInterface> => {
    try {
        const path = `./lyrics/${trackId}.json`;
        const fileHandle = await fs.open(path);
        const fileContent = await fileHandle.readFile("utf8");
        await fileHandle.close();
        return JSON.parse(fileContent);
    } catch {
        return null;
    }
};

/**
 * Creates lyrics file in a local directory.
 * @param trackId Spotify Track ID
 * @param lyrics
 * @returns `path` to file or `null`
 */
const CreateLyricsFile = async (trackId: string, lyrics: LyricsInterface | string): Promise<null | void> => {
    try {
        const path = `./lyrics/${trackId}.json`;
        const parsedLyrics = typeof(lyrics) == "string" ? lyrics : JSON.stringify(lyrics);
        await fs.appendFile(path, parsedLyrics);

    } catch  {
        return null;
    }
};

EnsureLyricsFolder();
EnsureCacheFile();

export {
    GetLyricsFile,
    CreateLyricsFile,
    GetCachedData,
    SetCachedData
}