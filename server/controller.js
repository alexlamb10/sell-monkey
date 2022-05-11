require("dotenv").config();
const Sequelize = require("sequelize");

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
});

module.exports = {
  seed: (req, res) => {
    sequelize
      .query(
        `
            drop table if exists cart_items;
            drop table if exists items;

                CREATE TABLE items (
                    item_id SERIAL PRIMARY KEY,
                    user_id VARCHAR(50),
                    product_name VARCHAR(255),
                    price INT,
                    description TEXT,
                    shipping boolean,
                    category VARCHAR(255),
                    picture TEXT
                );

                CREATE TABLE cart_items (
                    user_id VARCHAR(50),
                    item_id INT REFERENCES items(item_id),
                    cart_total FLOAT,
                    number_of_items INT
                );
        `
      )
      .then(() => {
        console.log("DB seeded!");
        res.sendStatus(200);
      })
      .catch((err) => {
        console.log("Error Seeding DB", err);
      });
  },
  getListings: (req, res) => {
    let { id } = req.params;
    console.log(id);
    sequelize
      .query(
        `
      SELECT item_id, product_name, price, description, shipping, category, picture FROM items
      WHERE user_id = '${id}'
    `
      )
      .then((dbRes) => {
        console.log("Hit DB");
        res.status(200).send(dbRes[0]);
      });
  },
  getAllListings: (req, res) => {
    let { id } = req.params;
    console.log(id);
    sequelize
      .query(
        `
      SELECT item_id, product_name, price, description, shipping, category, picture FROM items
    `
      )
      .then((dbRes) => {
        console.log("Hit DB");
        res.status(200).send(dbRes[0]);
      });
  },
  getFilteredListings: (req, res) => {
    let { cat } = req.params;
    console.log(cat);
    sequelize
      .query(
        `
      SELECT item_id, product_name, price, description, shipping, category, picture FROM items
      WHERE category = '${cat}'
    `
      )
      .then((dbRes) => {
        console.log("Hit DB Get Filtered listings ");
        res.status(200).send(dbRes[0]);
      });
  },
};
