const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();
const PORT = process.env.PORT || 3050;
const { ACCESS_KEY_PUBLIC, ACCESS_KEY_PRIVATE, REGION, S3_BUCKET } =
  process.env;

const AWS = require("aws-sdk");
// const S3 = require('aws-sdk/clients/s3')

AWS.config.update({
  accessKeyId: ACCESS_KEY_PUBLIC,
  secretAccessKey: ACCESS_KEY_PRIVATE,
  region: REGION,
});
const S3 = new AWS.S3();

const app = express();

const {
  seed,
  getListings,
  getAllListings,
  getFilteredListings,
  addToCart,
  getItemIds,
  getCartItem,
  deleteListing,
  deleteCartItem,
  addUsersListing,
  markAsComplete,
  deletePurchased,
} = require("./controller");

const { createPaymentIntent } = require("./stripeController");

app.use(express.json());
app.use(cors());

// For Heroku
// app.use(express.static(path.resolve(__dirname, "../build")));

app.post("/api/s3", (req, res) => {
  const photo = req.body;

  const buf = new Buffer(
    photo.file?.replace(/^data:image\/\w+;base64,/, ""),
    "base64"
  );

  const params = {
    Bucket: S3_BUCKET,
    Body: buf,
    Key: photo.fileName,
    ContentType: photo.fileType,
    ACL: "public-read",
  };

  S3.upload(params, (err, data) => {
    console.log(222222, err);
    let response, code;
    if (err) {
      response = err;
      code = 500;
    } else {
      response = data;
      code = 200;
    }
    res.status(code).send(response);
  });
});

app.post("/addNewListing", addUsersListing);

app.post("/seed", seed);

app.get("/getListings/:id", getListings);

app.get("/listings", getAllListings);

app.get("/getFilteredListings/:cat", getFilteredListings);

app.post("/addToCart", addToCart);

app.get("/getIds/:id", getItemIds);

app.get("/getCartItem/:id", getCartItem);

app.delete("/deleteListing/:id", deleteListing);

app.delete("/deleteCartItem/:id", deleteCartItem);

app.post("/create-payment-intent", createPaymentIntent);

app.put('/itemBought/:id', markAsComplete)

app.delete('/deleteBought/:id', deletePurchased)

// After all Endpoints
// app.get("/*", function (req, res) {
//   res.sendFile(path.join(__dirname, "../build", "index.html"));
// });

app.listen(PORT, () => {
  console.log(`server is listening on port ${PORT}`);
});
