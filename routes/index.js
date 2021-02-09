'use strict';

console.log("We made it to index");

const express = require('express'),
    router = express.Router();

/* GET home page. */
router.get('/', async (req, res, next) => {
    res.render('template', {
        locals: {
            title: 'Welcome! register or login to get started',
        },
        partials: {
            body: 'partials/login',
        },
    });
});

module.exports = router;
