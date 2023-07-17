import express from "express";
import cors from "cors";
import dotenv from "dotenv";

const app = express();

dotenv.config();

const port = process.env.PORT;

app
  .use(cors())
  .get("/health", (_req, res) => res.send("OK!"));

app.listen(port, () => {
  console.log (`[server]> Server is running at http://localhost:${port}`);
})