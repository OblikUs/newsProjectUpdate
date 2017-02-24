const express = require('express');
const router = express.Router();
const dummy = require('../dummmy.json');

//Getting from database
router.route('/')
  .get((req, res) => {
    console.log('req: ', dummy);
   // res.json(dummy);
   res.send(dummy);
})

module.exports = router;