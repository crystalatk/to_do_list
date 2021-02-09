'use strict';
const express = require('express'),
    router = express.Router(),
    bcrypt = require('bcryptjs'),
    UsersModel = require('../models/users');


router.get('/', async (req, res) => {
    const listObject =  await UsersModel.getAllLists(req.session.user_id);
    res.render('template', {
        locals: {
            title: 'Your Lists',
            listObject,
        },
        partials: {
            body: 'partials/login',
        },
    });
});

// GET users listing~
router.get('/register', (req, res) => {
    res.render('template', {
        locals: {
            title: 'Register for an Account',
        },
        partials: {
            body: 'partials/register',
        },
    });
});

router.get('/login', (req, res) => {
    res.render('template', {
        locals: {
            title: 'User Login',
        },
        partials: {
            body: 'partials/login',
        },
    });
});

router.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
})


// POST user routes~
router.post('/register', async (req, res) => {
    const { username, password } = req.body;
    
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    const response = await UsersModel.addUser(
        username, 
        hash
    );
    console.log("Registration Response", response);
    if (response.id) {
        res.redirect('/users/login');
    } else {
        res.send("ERROR: Please Try Submitting Again").status(500);
    }
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = new UsersModel(null, username, password);
    const response = await user.login();
    console.log("LOGIN RESPONSE IS:", response);

    if (!!response.isValid) {
        // do stuff if a user is logged in
        req.session.is_logged_in = response.isValid;
        req.session.user_id = response.user_id;
        req.session.username = response.username;
        res.redirect('/lists');
    } else {
        res.sendStatus(403);
    }
});

module.exports = router;