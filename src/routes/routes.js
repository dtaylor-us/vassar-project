const express = require('express');
const router = express.Router();
const controllers = require('../controllers/controllers');

router.get('/say-something', controllers.saySomething);
router.post('/person', controllers.create);

// Retrieve all Notes
router.get('/person', controllers.findAll);

// Retrieve a single Note with personId
router.get('/person/:personId', controllers.findOne);

// Update a Note with personId
router.put('/person/:personId', controllers.update);

// Delete a Note with personId
router.delete('/person/:personId', controllers.deletePerson);
module.exports = router;
