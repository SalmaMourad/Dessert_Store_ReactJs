// server.js
const express = require("express");
const stripe = require("stripe")("sk_test_YOUR_SECRET_KEY"); // 🔑 from Stripe dashboard
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/create-checkout-session", async (req, res) => {
  const { items } = req.body;

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: items.map((item) => ({
      price_data: {
        currency: "egp",
        product_data: { name: item.name },
        unit_amount: item.price * 100, // Stripe uses cents/piasters
      },
      quantity: item.quantity,
    })),
    mode: "payment",
    success_url: "http://localhost:5173/success",
    cancel_url: "http://localhost:5173/cart",
  });

  res.json({ url: session.url });
});

app.listen(4000, () => console.log("Server running on port 4000"));