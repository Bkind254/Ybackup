import cors from "cors";
import ytdl, { getInfo, chooseFormat } from "ytdl-core";
import { json } from "body-parser";
import express from "express";
//const ffmpegPath = "/usr/bin/ffmpeg";
//const ffmpegPath = "C:\\PATH_Programs\\ffmpeg";
//const ffmpeg = require("fluent-ffmpeg");

//ffmpeg.setFfmpegPath(ffmpegPath);

const app = express();
app.use(cors());
app.use(json());

app.post("/download", async (req, res) => {
  const url = req.body.url;
  const info = await getInfo(url);
  console.log(url);
  console.log(info.formats);
  const format = chooseFormat(info.formats, {
    filter: "videoandaudio",
    quality: "highestvideo",
    format: "mp4",
  });

  const video = ytdl(url, { format });
  const sanitizedTitle = info.videoDetails.title.replace(/[^\w\s.]/gi, "");
  res.header(
    "Content-Disposition",
    `attachment; filename="${sanitizedTitle}.${format.container}"`
  );
  video.pipe(res);
});
/*
app.post("/download-audio", async (req, res) => {
  const url = req.body.url;
  const info = await ytdl.getInfo(url);
  const format = ytdl.filterFormats(info.formats, "audioonly")[0];
  const audio = ytdl(url, { format });

  const sanitizedTitle = info.videoDetails.title.replace(/[^\w\s.]/gi, "");

  const converter = ffmpeg(audio)
    .toFormat("mp3")
    .on("error", (err) => {
      console.log("An error occurred: " + err.message);
    })
    .on("end", () => {
      console.log("Audio conversion complete");
    });

  res.header(
    "Content-Disposition",
    `attachment; filename="${sanitizedTitle}.mp3"`
  );

  converter.pipe(res);
});
*/
app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
