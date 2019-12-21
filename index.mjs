import * as path from "path";
import express from "express";

const port = process.env.PORT || 5000;

const app = express();

app.use(express.static(path.join(process.cwd(), "static")));

const server = app.listen(port);
