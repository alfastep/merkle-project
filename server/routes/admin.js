const express = require('express');
const db = require('../util/db');

const router = express.Router();

router
  // A GET route that retrieves all of the registered users from the database
  .get(
    '/',
    async (req, res) => {
      try {
        const users = await db.query(`SELECT * FROM users`);
        res.status(200).json({msg: 'Request successful', data: users});
      } catch (error) {
        res.json({msg: error});
      }
    }
  );

module.exports = router;