import PayOS from "@payos/node";

export const buyBook = async (req, res) => {
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
      returnUrl: "https://casso-rqt8.vercel.app/dowloadbook",
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
};
