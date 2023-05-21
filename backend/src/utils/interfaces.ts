
interface LyricsLineInterface {
    startTimeMS: number | string;
    endTimeMS: number | string;
    syllables: Array<any>;
    words: string;
}

interface LyricsInterface {
    syncType: string;
    lines: Array<LyricsLineInterface>;
}

interface CacheInterface {
    clientId: string;
    accessToken: string;
    accessTokenExpirationTimestampMs: number;
    isAnonymous: boolean;
}

export {
    LyricsInterface,
    LyricsLineInterface,
    CacheInterface
}