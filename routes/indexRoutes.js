const express = require('express');
const router = express.Router();

router.get('/', (req, res) => res.render('home'));
router.get('/diennang', (req, res) => res.render('diennang'));
router.get('/dulieu', (req, res) => res.render('dulieu'));
router.get('/user', (req, res) => res.render('user'));
router.get('/login', (req, res) => res.render('login'));
module.exports = router;