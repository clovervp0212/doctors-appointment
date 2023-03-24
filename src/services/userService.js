import db from "../models";
import bcrypt from "bcryptjs";

// var bcrypt = require('bcryptjs');
// var salt = bcrypt.genSaltSync(10);
// var hash = bcrypt.hashSync("B4c0/\/", salt);




let createNewUser = async (user) => {
    try {
        let isEmailExist = await db.User.findOne({
            where: {
                email: user.email
            }
        });

        if (isEmailExist) {
            throw `This email "${user.email}" has already exist. Please chose an other email!`;
        } else {
            let salt = bcrypt.genSaltSync(10);
            user.password = await bcrypt.hashSync(user.password, salt);
            await db.User.create(user);
            return {
                value: "done!"
            };
        }
    } catch (e) {
        throw e;
    }
}

module.exports = {
    createNewUser: createNewUser
};