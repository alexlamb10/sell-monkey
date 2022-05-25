const Stripe = require("stripe");

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

module.exports = {
  createPaymentIntent: async (req, res) => {
    let { total } = req.body;
    total = Math.round(total * 100);
    const paymentIntent = await stripe.paymentIntents.create({
      amount: total,
      currency: "usd",
    });

    res.status(200).send(paymentIntent);
  },
};
