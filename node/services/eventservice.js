var mongoose = require('mongoose');
Promise = require('bluebird');
mongoose.Promise = Promise;

const ObjectID = require('mongodb').ObjectID;

var url = "mongodb://root:123456@ds147864.mlab.com:47864/mwaproject";
mongoose.connect(url, {
    useMongoClient: true
});

var perPage = 5;

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
    users:[String],
    imageUrl: String
});

eventSchema.statics.get = function (uid = null, skip = 0, keyword = null) {
    console.log("searching database: " + uid + skip + keyword);
    //let perPage = 5;
    return new Promise((res, rej) => {
        if (uid === null) {
            Event.find({}, function (err, data) {
                if (err) rej(err);
                res(data);
            }).limit(perPage).skip(perPage*skip);
        } else {
            console.log("uid null");
            Event.find({
                "_id": ObjectID(uid)
            }, function (err, data) {
                if (err) rej(err);
                res(data);
            });
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

eventSchema.statics.removeEvent = function (id = null) {
    console.log("remove event with " + id);
    return new Promise((res, rej) => {
        if (id === null) {
            res({ message : "Remove Failed. No ID found"});
        } else {
            Event.remove({
                _id: id
            }, function (err, data) {
                if (err) rej(err);
                console.log("remove successfully" +data);
                res({message : "Remove Successfully", data: data});
            });
        }
    });
};

eventSchema.methods.update = function () {
    return new Promise((resolve, reject) => {
        this.findOneAndUpdate({
            "_id": ObjectID(id)
        }, {
            name: this.name,
            description: this.description,
            remark: this.remark,
            date: this.date,
            created_at: this.created_at,
            updated_at: Date.now(),
            address: {
                street: this.address.street,
                city: this.address.city,
                state: this.address.state,
                zipcode: this.address.zipcode,
            },
            location: this.location,
            tags: this.tags,
            isDelete: this.isDelete,
            users:this.users
        }, (err, data) => {
            if (err) throw err;
            resolve(data);
        })
    })
};

eventSchema.statics.searchEvents = function (skip = 0, keyword = null) {
    console.log("searching event " + keyword);

    return new Promise((res, rej) => {
        if (keyword === null || keyword == '') {
            Event.find({}, function (err, data) {
                if (err) rej(err);
                res(data);
            }).limit(perPage).skip(perPage*skip);
        } else {
            console.log("keyword not null");
            Event.find({$or:[
                {"name": new RegExp('.*'+ keyword +'.*', "i")},
                {"description": new RegExp('.*'+ keyword +'.*', "i")}
            ]
                //"name": new RegExp('.*'+ keyword +'.*', "i"),
            }, function (err, data) {
                if (err) rej(err);
                console.log(JSON.stringify(data));
                res(data);
            }).limit(perPage).skip(perPage*skip);
        }
    })
};

eventSchema.statics.registerUser = function (userID = null, eventID = null ) {
    console.log("registering event ");

    return new Promise((res, rej) => {
        if (userID === null || eventID === null) {
           res({ message : "there is no input"});
        } else {
            console.log("keyword not null");
            Event.update({
                "_id": ObjectID(eventID)
            }, {
                "$addToSet": { "users": userID}
            },{
                new:true
            },function (err, data) {
                if (err) rej(err);
                console.log(JSON.stringify(data));
                res(data);
            });
        }
    })
};


let Event = mongoose.model('Event',eventSchema);

module.exports = Event;