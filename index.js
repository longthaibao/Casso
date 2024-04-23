import express, { urlencoded } from "express";
import cors from "cors";
import PayOS from "@payos/node";
import { dirname } from "path";
import { fileURLToPath } from "url";
import { buyBookRouter } from "./routes/buybook.route.js";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();

app.set("views", `${__dirname}/views`);
app.set("view engine", "pug");
app.use("/assets", express.static(`${__dirname}/assets`));

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
app.use(urlencoded({ extended: true }));
app.use("/create-payment-link", buyBookRouter);
app.get("/dowloadbook", (req, res) => {
  res.render("success.pug");
});
app.get("/", (req, res) => {
  res.render("home.pug");
});
app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
