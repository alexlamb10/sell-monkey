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
                    price FLOAT,
                    description TEXT,
                    shipping VARCHAR(50),
                    category VARCHAR(255),
                    picture TEXT
                );

                CREATE TABLE cart_items (
                    user_id VARCHAR(50),
                    item_id INT REFERENCES items(item_id)
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
    // Get listings based off id from params
    let { id } = req.params;
    console.log(id);
    sequelize
      .query(
        `
      SELECT item_id, product_name, price, description, shipping, category, picture FROM items
      WHERE user_id = '${id}';
    `
      )
      .then((dbRes) => {
        console.log("Hit DB");
        res.status(200).send(dbRes[0]);
      });
  },
  getAllListings: (req, res) => {
    // Get all listings from database
    let { id } = req.params;
    console.log(id);
    sequelize
      .query(
        `
      SELECT item_id, product_name, price, description, shipping, category, picture FROM items;
    `
      )
      .then((dbRes) => {
        console.log("Hit DB");
        res.status(200).send(dbRes[0]);
      });
  },
  getFilteredListings: (req, res) => {
    // Get listings based off category from params
    let { cat } = req.params;
    console.log(cat);
    sequelize
      .query(
        `
      SELECT item_id, product_name, price, description, shipping, category, picture FROM items
      WHERE category = '${cat}';
    `
      )
      .then((dbRes) => {
        console.log("Hit DB Get Filtered listings ");
        res.status(200).send(dbRes[0]);
      });
  },
  addToCart: (req, res) => {
    let item_id = req.body.item;
    let user_id = req.body.id;

    // Insert new cart item into the database
    sequelize
      .query(
        `
      INSERT INTO cart_items (user_id, item_id)
        VALUES (${user_id}, ${item_id});
    `
      )
      .then((dbRes) => {
        res.status(200).send("Item Added to Cart!");
      });
  },
  getItemIds: (req, res) => {
    let { id } = req.params;
    console.log(id);

    sequelize
      .query(
        `
      SELECT item_id FROM cart_items
      WHERE user_id = '${id}';
    `
      )
      .then((dbRes) => {
        console.log(dbRes[0]);
        res.status(200).send(dbRes[0]);
      });
  },
  getCartItem: (req, res) => {
    let { id } = req.params;
    console.log(id);
    sequelize
      .query(
        `
      SELECT item_id, product_name, price, description, shipping, category, picture FROM items
      WHERE item_id = ${id};
    `
      )
      .then((dbRes) => {
        res.status(200).send(dbRes[0]);
      });
  },
  deleteListing: (req, res) => {
    let { id } = req.params;
    sequelize
      .query(
        `
      DELETE FROM cart_items
      WHERE item_id = ${id};
      
      DELETE FROM items
      WHERE item_id = ${id};
    `
      )
      .then((dbRes) => {
        res.status(200).send("Item Deleted");
      });
  },
  deleteCartItem: (req, res) => {
    let { id } = req.params;
    sequelize
      .query(
        `
      DELETE FROM cart_items
      WHERE item_id = ${id};
    `
      )
      .then((dbRes) => {
        res.status(200).send("Item deleted from your cart!");
      });
  },
  addUsersListing: (req, res) => {
    const { id, name, description, price, shipping, category, data } = req.body;

    sequelize
      .query(
        `
      INSERT INTO items (user_id, product_name, price, description, shipping, category, picture)
        VALUES ('${id}', '${name}', ${price}, '${description}', '${shipping}', '${category}', '${data}')
    `
      )
      .then((dbRes) => {
        res.status(200).send("Item listed for sale!");
      });
  },
};
