import express, {Application} from "express";
import lyricsController from "./controllers/lyricsController";
import cors from "cors";
import tokenMiddleware from "./middlewares/tokenMiddleware";

const app: Application = express();



app.use(cors());

app.use(tokenMiddleware);

app.use("/lyrics/", lyricsController);

app.listen(8080, () => console.log("LyricsVisualizer RestfulAPI is running..."));