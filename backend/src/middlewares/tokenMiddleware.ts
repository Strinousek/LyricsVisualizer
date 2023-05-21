import { Response } from 'express';
import { Request } from 'express';
import { NextFunction } from 'express';
import { GetSpotifyToken } from "../utils/spotifyToken";

const tokenMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const spotifyToken = GetSpotifyToken()
    if(spotifyToken === null) {
        res.status(500).send("LyricsVisualizerAPI has trouble connecting to Spotify services. Try again later!").end();
        return;
    }
    res.locals.spotifyToken = spotifyToken;
    next(); return;
};

export default tokenMiddleware;