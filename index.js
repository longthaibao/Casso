import express, { urlencoded } from "express";
import cors from "cors";
import PayOS from "@payos/node";

const app = express();
app.use("/assets", express.static("/Users/macbookpro/Documents/Casso/assets"));
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
app.use(urlencoded({ extended: true }));
app.post("/create-payment-link", async (req, res) => {
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
      returnUrl: "http://localhost:3001/dowloadbook",
      cancelUrl: "http://localhost:3001/home",
      signature: "string",
    };

    // Tạo link thanh toán
    const paymentLink = await payos.createPaymentLink(order);
    const link = paymentLink.checkoutUrl;
    res.json(link);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
app.use("/home", (req, res) => {
  res.render("home.pug");
});
app.get("/dowloadbook", (req, res) => {
  res.render("success.pug");
});
app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
