var mongoose = require('mongoose');
Promise = require('bluebird');
mongoose.Promise = Promise;

var url = "mongodb://root:123456@ds147864.mlab.com:47864/mwaproject";
mongoose.connect(url, {
    useMongoClient: true
})

//TODO: considering the index later
let eventSchema = new mongoose.Schema({
    //id: String,
    name: {type: String, required:true},
    description: String,
    remark: String,
    date: Date,
    created_at: Date,
    updated_at: Date,
    address: {
        street: String,
        city: String,
        state: String,
        zipcode: Number,
    },
    location: [Number],
    tags: [String],
    isDelete: Boolean,
    users:[String]
});

eventSchema.statics.get = function (uid = null) {
    console.log("searching database: " + uid);
    return new Promise((res, rej) => {
        if (uid === null) {
            Event.find({}, function (err, data) {
                if (err) rej(err);
                res(data);
            })
        } else {
            Event.find({
                'name': uid
            }, function (err, data) {
                if (err) rej(err);
                res(data);
            })
        }
    })
}

// on every save, add the date
eventSchema.pre('save', function(next) {
    var currentDate = new Date();
    this.updated_at = currentDate;
    if (!this.created_at) this.created_at = currentDate;
    next();
});

eventSchema.methods.add = function () {
    console.log("Save");

    return new Promise((resolve, reject) => {
        newEvent = this;
        //console.log(newEvent);
        newEvent.save(function (err) {
            if (err) {
                reject({
                    message: err,
                    status: 0
                })
            } else {
                console.log("new event Added Successfully !");
                resolve({
                    message: "New Event Added",
                    status: 1
                })
            }
        })
    })
};

eventSchema.methods.remove = function (id = null) {
    console.log("remove");

    return new Promise((res, rej) => {
        if (id === null) {
            res({ message : "Remove Failed. No ID found"});
        } else {
            Event.findByIdAndRemove({
                '_id': id
            }, function (err, data) {
                if (err) rej(err);
                res({message : "Remove Successfully", data: data});
            })
        }
    });
};

let Event = mongoose.model('Event',eventSchema);

module.exports = Event;