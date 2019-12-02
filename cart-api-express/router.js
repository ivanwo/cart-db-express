const express = require("express");
const pool = require("./connection");
const cartRoutes = express.Router();

cartRoutes.get("/cart-items", (req, res) => {
  let sql = "SELECT * FROM shopping_cart";
  pool.query(sql).then(result => {
    res.status(200);
    res.json(result.rows);
  });
});

cartRoutes.get("/cart-items/:id", (req, res) => {
  const id = parseInt(req.params.id);
  let sql = "SELECT * FROM shopping_cart WHERE id = $1::int";
  params = [id];
  pool.query(sql, params).then(result => {
    if (result.rows.length !== 0) {
      res.status(200);
      res.json(result.rows[0]);
    } else {
      res.status(404);
      res.json("ID not found");
    }
  });
});
cartRoutes.post("/cart-items", (req, res) => {
  const item = req.body;
  let sql =
    "INSERT INTO shopping_cart (product, price, quantity) VALUES ($1::TEXT, $2::FLOAT, $3::INT) RETURNING *";
  let params = [item.product, item.price, item.quantity];
  pool.query(sql, params).then(result => {
    res.status(201);
    res.json(result.rows[0]);
  });
});
cartRoutes.put("/cart-items/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const item = req.body;
  item.id = id;
  let sql = `UPDATE shopping_cart SET product=$1::TEXT, price=$2::FLOAT, quantity=$3::INT WHERE id =$4::INT RETURNING *`;
  let params = [item.product, item.price, item.quantity, id];
  pool.query(sql, params).then(result => {
    res.status(200);
    res.json(result.rows[0]);
  });
});
cartRoutes.delete("/cart-items/:id", (req, res) => {
  const id = parseInt(req.params.id);
  let sql = "DELETE FROM shopping_cart WHERE id=$1::int";
  let params = [id];
  pool.query(sql, params).then(result => {
    res.sendStatus(204);
  });
  // const index = cart.findIndex(i => i.id === id);
  // if (index !== -1) cart.splice(index, 1);
  // res.status(204);
  // res.json();
});

module.exports = cartRoutes;
