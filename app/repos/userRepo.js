var User = require("../models/user");

module.exports = {
    getUserById: (userId) => {
        try {
            return User.findOne({_id: userId});
        } catch (e) {
            throw e;
        }
    }
}