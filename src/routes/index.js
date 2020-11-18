const express = require('express');
const router = express.Router();
/* Obtiene el home de la aplicacion. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
module.exports = router;