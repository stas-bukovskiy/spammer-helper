const express = require('express');
const {check} = require('express-validator');
const UserController = require('../controllers/userController');

const router = express.Router();

router.get('/', UserController.getUsers);

router.get('/:id', UserController.getUserById);
router.get('/search/:search', UserController.searchUsers);

router.post('/', [
    check('email').notEmpty().normalizeEmail(),
    check('firstName').notEmpty(),
    check('lastName').notEmpty(),
], UserController.createUser);

router.post('/send', [
    check('ids').notEmpty(),
    check("mail").notEmpty()
], UserController.sendEmails)

router.put('/:id', [
    check('email').notEmpty().normalizeEmail(),
    check('firstName').notEmpty(),
    check('lastName').notEmpty(),
], UserController.updateUserById);

router.delete('/:id', UserController.deleteUserById);

module.exports = router;