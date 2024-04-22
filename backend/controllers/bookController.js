import PayOS from "@payos/node";

export const buyBook = async (req, res) => {
  const payos = new PayOS({
    client_id: "76f689ee-34c1-41fb-a55a-851301c9bf8a",
    api_key: "a17ba6c2-e0a9-4c61-8eb4-d089c94104d1",
    checksum_key:
      "cc6588a50aa03dc242d292791a0f2ea7199ce905cd72e2e8ecb7d40533601087",
  });
  const order = {
    amount: 200000,
    description: "Bí mật của may mắn",
    orderCode: 1,
    returnUrl: "http://localhost:3000/",
    cancelUrl: "http://localhost:3000/",
  };
  // const paymentLink = await payos.createPaymentLink(order);
  res.redirect(303, paymentLink.checkoutUrl);
};
