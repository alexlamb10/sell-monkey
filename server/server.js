const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();
const PORT = process.env.PORT || 3050;

const app = express();

let {
  seed,
  getListings,
  getAllListings,
  getFilteredListings,
} = require("./controller");

app.use(express.json());
app.use(cors());

// For Heroku
// app.use(express.static(path.resolve(__dirname, "../build")));

app.post("/seed", seed);

app.get("/getListings/:id", getListings);

app.get("/getListings", getAllListings);

app.get('/getFilteredListings/:cat', getFilteredListings)

// After all Endpoints
// app.get("/*", function (req, res) {
//   res.sendFile(path.join(__dirname, "../build", "index.html"));
// });

app.listen(PORT, () => {
  console.log(`server is listening on port ${PORT}`);
});
