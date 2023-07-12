const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

const userSchema = new Schema({


    username: {
        type: String,
        unique: true,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: string,
        required: true,
        set: function(password){
            const hashedPassword = bcrypt.hash(password, 10);
            return hashedPassword;
        }
    },
    battleTag: {
        type: String,
        required: false
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model("User", userSchema);