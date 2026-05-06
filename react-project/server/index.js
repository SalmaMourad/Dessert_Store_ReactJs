const express = require("express");
const cors = require("cors");
const Stripe = require("stripe");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

app.post("/checkout", async (req, res) => {
  try {
    const { products } = req.body;

    const line_items = products.map((item) => ({
      price_data: {
        currency: "egp",

        product_data: {
          name: item.name,
        },

        unit_amount: item.price * 100,
      },

      quantity: item.quantity,
    }));

   const session =
  await stripe.checkout.sessions.create({
    payment_method_types: ["card"],

    line_items,

    mode: "payment",

    success_url:
      "http://localhost:5173/success",

    cancel_url:
      "http://localhost:5173/cancel",
  });

res.json({
  url: session.url,
});

    // res.json({ id: session.id });
res.json({ url: session.url });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: "Stripe Error",
    });
  }
});

app.listen(3001, () => {
  console.log("Stripe Server Running 🚀");
});