const express = require('express');
const router = express.Router();

const customerController = require('../controllers/customerController');

router.get('/showcustomersdata', customerController.list);
router.post('/addcustomer', customerController.addcustomer)

module.exports = router;