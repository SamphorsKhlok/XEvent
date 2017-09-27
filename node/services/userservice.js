var express = require('express');
var mongoose = require('mongoose')

var url = "mongodb://root:123456@ds147864.mlab.com:47864/mwaproject";
mongoose.connect(url, {
    useMongoClient: true
})

let userSchema = new mongoose.Schema({
    userID: String,
    name: String,
    email: String,
    address: {
        street: String,
        city: String,
        state: String,
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

userSchema.methods.update = function () {
    return new Promise((resolve, reject) => {
        //console.log('ZIPP'+User.);
        User.findOneAndUpdate({
            userID: this.userID
        }, {
            name: this.name,
            'address.street': this.address.street,
            'address.city': this.address.city,
            'address.state': this.address.state,
            'address.zipcode': this.address.zipcode,
            dob: new Date(this.dob),
            skill: this.skill,
            education: this.education,
            bio: this.bio,
        }, (err, data) => {
            if (err) {
                throw err;
            } else {
                console.log('updated')
                resolve(data);
            }
        })
    })
}

userSchema.statics.isAdmin = function (uid) {
    console.log("check if user is admin: " + uid);
    return new Promise((resolve, reject) => {
        if (uid !== null) {
            User.findOne({
                'userID': uid,
                'role': '2'
            }, function (err, data) {
                if (err) reject(err);
                if(data)
                    resolve(true);
                else
                    resolve(false);
            })
        }
    })
}

let User = mongoose.model('User', userSchema);
module.exports = User;