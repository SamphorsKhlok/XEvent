var express = require('express');
var mongoose = require('mongoose')

var url = "mongodb://root:123456@ds147864.mlab.com:47864/mwaproject";
mongoose.connect(url, {
    useMongoClient: true
})

let userSchema = new mongoose.Schema({
    userID: String,
    email: String,
    address: {
        street: String,
        city: String,
        State: String,
        zipcode: Number,
    },
    dob: Date,
    skill: String,
    education: String,
    bio: String,
    enabled: Number,
    role: Number
})

userSchema.statics.get = function (uid = null) {

    console.log("searching database: " + uid);
    return new Promise((res, rej) => {
        if (uid === null) {
            User.find({}, function (err, data) {
                if (err) rej(err)
                res(JSON.stringify(data))
            })
        } else {
            User.find({
                'userID': uid
            }, function (err, data) {
                if (err) rej(err)
                res(JSON.stringify(data))
            })
        }
    })
}

userSchema.methods.add = function () {
    return new Promise((resolve, reject) => {

        newUser = this;

        newUser.save(function (err) {
            if (err) {
                reject({
                    message: err,
                    status: 0
                })
            } else {
                console.log("user Added Successfully !");
                resolve({
                    message: "New User Added",
                    status: 1
                })
            }
        })
    })
}

let User = mongoose.model('User', userSchema) 

module.exports = User;