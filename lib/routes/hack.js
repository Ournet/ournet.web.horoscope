'use strict';

var express = require('express');
var utils = require('../utils');
/*eslint new-cap:1*/
var route = module.exports = express.Router();

function sendMessage(req, res) {
  utils.maxage(res, 60 * 60 * 60);

  var link = 'https://github.com/Ournet/ournet.web.horoscope';

  res.setHeader('Location', link);

  res.status(404)
    .send({
      message: 'We don`t use PHP!',
      link: link,
      target: 'Hackers'
    });
}

//index

route.get('/wp-login.php', sendMessage);
route.get('/wordpress/wp-admin', sendMessage);
route.get('/test/wp-admin', sendMessage);
route.get('/wp-admin', sendMessage);
