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
            drop table if exists items;
            drop table if exists cart_items;

                CREATE TABLE items (
                    item_id SERIAL PRIMARY KEY,
                    user_id VARCHAR(50),
                    product_name VARCHAR(255),
                    price INT,
                    description TEXT,
                    shipping boolean,
                    category VARCHAR(255)
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
};
