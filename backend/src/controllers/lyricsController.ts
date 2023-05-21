import { Router, Request, Response } from "express";
import { GetLyrics } from "../managers/lyricsManager";

const router: Router = Router();

router.get("/:trackId", async (req: Request, res: Response) => {
    const { trackId } = req.params;
    const { spotifyToken } = res.locals;
    const lyrics = await GetLyrics(trackId, spotifyToken);
    if(lyrics === null) {
        res.status(500).send("No lyrics found.").end();
        return;
    }
    res.status(200).send(lyrics).end();
});

export default router;