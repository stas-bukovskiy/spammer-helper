const User = require('../models/userModel');
const {UserNotFoundError, UserAlreadyExistsError} = require('../models/errors');
const {isValidObjectId} = require("mongoose");

class UserService {
    static async getUsers() {
        return User.find().sort({email: 1});
    }

    static async getUserById(id) {
        if (!isValidObjectId(id)) {
            throw new UserNotFoundError();
        }

        const user = await User.findById(id);
        if (!user) {
            throw new UserNotFoundError();
        }

        return user;
    }

    static async searchUsers(searchQuery) {
        searchQuery = `${searchQuery}`
        return User.find({
            $or: [{email: {$regex: searchQuery, $options: 'i'}}, {
                firstName: {
                    $regex: searchQuery,
                    $options: 'i'
                }
            }, {lastName: {$regex: searchQuery, $options: 'i'}}]
        });
    }

    static async createUser(email, firstName, lastName) {
        const exist = await User.exists({email});
        if (exist) {
            throw new UserAlreadyExistsError();
        }

        const user = new User({email, firstName, lastName});
        await user.save();
        return user;
    }

    static async sendMails(ids, mail) {
        await User.updateMany(
            { _id: { $in: ids } },
            { $inc: { mailsSent: 1 } }
        );
    }

    static async updateUserById(id, email, firstName, lastName) {
        if (!isValidObjectId(id)) {
            throw new UserNotFoundError();
        }

        const exist = await User.exists({email, _id: {$ne: id}});
        if (exist) {
            throw new UserAlreadyExistsError();
        }

        const user = await User.findById(id);
        if (!user) {
            throw new UserNotFoundError();
        }

        user.email = email;
        user.firstName = firstName;
        user.lastName = lastName;
        await user.save();
        return user;
    }

    static async deleteUserById(id) {
        if (!isValidObjectId(id)) {
            throw new UserNotFoundError();
        }

        const user = await User.findByIdAndDelete(id);
        if (!user) {
            throw new UserNotFoundError();
        }

        return user;
    }
}

module.exports = UserService;