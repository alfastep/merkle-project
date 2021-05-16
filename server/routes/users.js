const express = require('express');
const { body, validationResult } = require('express-validator');
const db = require('../util/db');
const {isValidStateAbbreviation} = require("usa-state-validator")

const router = express.Router();

/* 
A POST route that registers users and inserts them into the database. I am using express validator to validate the data from the request body before inserting into the database.
*/
router
  .post(
    '/',
    [body('firstName')
      .exists()
      .notEmpty()
      .withMessage('Your first name is required')
      .isAlpha()
      .withMessage('Must be only alphabetical chars'),
    body('lastName')
      .exists()
      .notEmpty()
      .withMessage('Your last name is required')
      .isAlpha()
      .withMessage('Must be only alphabetical chars'),
    body('address1')
      .exists()
      .notEmpty()
      .withMessage('Your address1 is required'),
    body('address2')
      .optional(),
    body('city')
      .exists()
      .notEmpty()
      .withMessage('Your city is required')
      .isAlpha()
      .withMessage('Must be only alphabetical chars'),
    body('state')
      .exists()
      .notEmpty()
      .withMessage('Your state abbreviation is required')
      .isLength({ max: 2 })
      .withMessage('Enter the two letter state abbreviation')
      .isAlpha()
      .withMessage('Must be only alphabetical chars')
      .custom((value, { req }) => {
        if (!isValidStateAbbreviation(value)) {
          throw new Error('Invalid state abbreviation');
        }

        return true;
      })
      .withMessage('Must be a valid United States state abbreviation'),
    body('zip')
      .exists()
      .notEmpty()
      .withMessage('Your zip is required')
      .isLength({ min: 5 })
      .isLength({ max: 9 })
      .withMessage('Your zipcode can be 5 or 9 digits long')
      .isNumeric()
      .withMessage('Must be only numeric chars')],
    async (req, res) => {
      const errors = validationResult(req);
      if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
      } else {
        try {
          await db.query(
            `
            INSERT INTO users (first_name, last_name, address1, address2, city, state, zip, country)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
            `, [req.body.firstName, req.body.lastName, req.body.address1, req.body.address2, req.body.city, req.body.state, req.body.zip, req.body.country]
          );
          res.status(200).json({msg: 'User successfully added'});
        } catch (error) {
          res.json({msg: error});
        }
      }
    }
  );

module.exports = router;