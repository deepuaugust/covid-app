var express = require('express');
var router = express.Router();

const category = require('./category')
const roles = require('./roles')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.use('/category', category);
router.use('/roles', roles);

module.exports = router;
