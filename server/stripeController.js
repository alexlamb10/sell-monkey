const Stripe = require("stripe");

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

module.exports = {
  createPaymentIntent: async (req, res) => {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 1999,
      currency: "usd",
    });

    res.status(200).send(paymentIntent);
  },
};
