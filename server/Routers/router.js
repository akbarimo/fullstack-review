const router = require('express').Router();
const methods = require('../controllers/githubController.js');

router.get('/repos', methods.get);

router.post('/repos', methods.post);

module.exports = router;