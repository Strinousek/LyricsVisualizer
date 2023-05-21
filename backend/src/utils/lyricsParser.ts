import { LyricsInterface } from "./interfaces";

/**
 * The only real reason for this method is the fact that
 * from Spotify Lyrics API we receive few properties in wrong types.
 * This method just casts them into their designated ones.
 * @param lyrics 
 * @returns 
 */
const LyricsParser = (lyrics: any): LyricsInterface => {
    let parsedLyricsLines = [...lyrics.lines];

    for(let i=0; i < parsedLyricsLines.length; i++) {
        const line = parsedLyricsLines[i];
        parsedLyricsLines[i].endTimeMs = parseInt(line.endTimeMs);
        parsedLyricsLines[i].startTimeMs = parseInt(line.startTimeMs);
    }

    return {
        syncType: lyrics.syncType,
        lines: parsedLyricsLines
    };
};

export default LyricsParser;