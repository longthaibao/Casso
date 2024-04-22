import express, { urlencoded } from "express";
import cors from "cors";
import PayOS from "@payos/node";
import { dirname } from "path";
import { fileURLToPath } from "url";
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
app.get("/create-payment-link", async (req, res) => {
  try {
    const payos = new PayOS(
      "76f689ee-34c1-41fb-a55a-851301c9bf8a",
      "a17ba6c2-e0a9-4c61-8eb4-d089c94104d1",
      "cc6588a50aa03dc242d292791a0f2ea7199ce905cd72e2e8ecb7d40533601087"
    );

    // Tạo đối tượng order
    const order = {
      amount: 10000,
      description: "Bí mật của may mắn",
      orderCode: Number(String(Date.now()).slice(-6)),
      returnUrl: "https://casso.vercel-rqt8.app/dowloadbook",
      cancelUrl: "https://casso-rqt8.vercel.app/",
      signature: "string",
    };

    // Tạo link thanh toán
    const paymentLink = await payos.createPaymentLink(order);
    const link = paymentLink.checkoutUrl;
    res.redirect(link);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
app.get("/dowloadbook", (req, res) => {
  res.render("success.pug");
});
app.get("/", (req, res) => {
  res.render("home.pug");
});
app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
