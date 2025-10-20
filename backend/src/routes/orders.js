  const express = require('express');
const router = express.Router();

const pool = require('../utils/db');        // PostgreSQL
const redis = require('../utils/redis');    // Redis
const { producer } = require('../utils/redpanda'); // Redpanda

// POST /orders - create a new order
router.post('/', async (req, res) => {
  try {
    const { customer, items, total } = req.body;

    // 1️⃣ Save to PostgreSQL
    const result = await pool.query(
      'INSERT INTO orders(customer, items, total) VALUES($1, $2, $3) RETURNING *',
      [customer, JSON.stringify(items), total]
    );
    const newOrder = result.rows[0];

    // 2️⃣ Cache in Redis
    await redis.set(`order:${newOrder.id}`, JSON.stringify(newOrder));

    // 3️⃣ Publish to Redpanda
    await producer.send({
      topic: 'orders',
      messages: [{ value: JSON.stringify(newOrder) }],
    });

    res.status(201).json({ success: true, order: newOrder });
  } catch (err) {
    console.error('Error creating order:', err);
    res.status(500).json({ success: false, error: 'Server Error' });
  }
});
// GET /orders - fetch all orders
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM orders ORDER BY created_at DESC');
    res.json({ success: true, orders: result.rows });
  } catch (error) {
    console.error("❌ Error fetching orders:", error);
    res.status(500).json({ success: false, error: "Server Error" });
  }
});


module.exports = router;
