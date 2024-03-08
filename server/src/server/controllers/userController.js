const UserServices = require('../services/userServices');
const {validationResult} = require('express-validator');
const {UserAlreadyExistsError, UserNotFoundError} = require("../models/errors");

class UserController {
    static async getUsers(req, res) {
        const users = await UserServices.getUsers();
        res.json(users);
    }

    static async getUserById(req, res) {
        const id = req.params.id;
        try {
            const user = await UserServices.getUserById(id);
            res.json(user);
        } catch (e) {
            if (e instanceof UserNotFoundError) {
                res.status(404).json({error: e.message});
            } else {
                res.status(500).json({error: "Internal server error"});
            }
        }
    }

    static async searchUsers(req, res) {
        const search = req.params.search;
        const users = await UserServices.searchUsers(search);
        res.json(users);
    }

    static async createUser(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }

        try {
            const {email, firstName, lastName} = req.body;
            const user = await UserServices.createUser(email, firstName, lastName);
            res.json(user);
        }catch (e) {
            if (e instanceof UserAlreadyExistsError) {
                res.status(409).json({error: e.message});
            } else {
                res.status(500).json({error: "Internal server error"});
            }
        }
    }

    static async sendEmails(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }

        try {
            const {ids, mail} = req.body;
            const idsArr = ids.split(",")
            await UserServices.sendMails(idsArr, mail)
            res.json("OK")
        } catch (e) {
            if (e instanceof UserNotFoundError) {
                res.status(404).json({error: e.message});
            } else {
                res.status(500).json({error: "Internal server error"});
            }
        }

    }

    static async updateUserById(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }

        try {
            const id = req.params.id;
            const {email, firstName, lastName} = req.body;
            const user = await UserServices.updateUserById(id, email, firstName, lastName);
            res.json(user);
        } catch (e) {
            if (e instanceof UserNotFoundError) {
                res.status(404).json({error: e.message});
            } else if (e instanceof UserAlreadyExistsError) {
                res.status(409).json({error: e.message});
            } else {
                res.status(500).json({error: "Internal server error"});
            }
        }
    }

    static async deleteUserById(req, res) {
        try {
            const id = req.params.id;
            const user = await UserServices.deleteUserById(id);
            res.json(user);
        } catch (e) {
            if (e instanceof UserNotFoundError) {
                res.status(404).json({error: e.message});
            } else {
                res.status(500).json({error: "Internal server error"});
            }

        }
    }
}

module.exports = UserController;