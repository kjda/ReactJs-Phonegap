var MG = require('mongoose');
var check = require('validator').check;
var validate = require('mongoose-validator');
var async = require('async');
var bcrypt = require('bcrypt');

function hashPassword(password){
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
}

var Model = null;

var Schema = new MG.Schema({
    email: {
        type: String, 
        required: true, 
        lowercase: true, 
        trim: true, 
        validate: [
            validate({
                validator: 'isEmail',
                message: "e.email.invalid"
            })
        ]
    },
    name: {
        type: String, 
        required: true, 
        validate: [
            validate({
                validator: "isLength",
                arguments: [4, 24],
                message: "e.name.length"
            })
        ]
    },
    password: {
        type:String, 
        required: true, 
        set: hashPassword, 
        validate:[
            validate({
                validator: "isLength",
                arguments: [6, 255],
                message: "e.password.length"
            })
        ]
    },
    picture: {
        type: String,
        default: null
    },
    meta: {
        emailVerified: {
            type: Boolean, 
            default: false
        },
        memberSince: {
            type: Date, 
            default: null
        },
        lastUpdate: {
            type: Date, 
            default: null
        }
    }
}, {
    collection: 'user'
});


Schema.pre('save',  function(next) {
    if ( !this.meta.memberSince ) {
        this.meta.memberSince = new Date();
    }    
    this.meta.lastUpdate = new Date();
    next();
});

Schema.path('email').validate(function(value, next) {
    var cond = {email: value.toLowerCase()};
    if (!!this._id) {
        cond["_id"] = {$ne: this._id};
    }
    Model.findOne(cond, function(err, doc) {
        next(!doc);
    });
}, "e.email.exists");


Schema.methods.isPassword = function(password){
    return (this.password === hashPassword(password) ); 
}

Schema.methods.expose = function() {
    return {
        _id: this._id,
        username: this.username,
        email: this.email,
        name: this.name,
        picture: this.picture
    };
};

Schema.methods.exposeToSelf = function() {
    var obj = this.expose();
    return obj;
};

Schema.methods.isPassword = function(candidatePass) {
    return (this.pass === hashPassword(candidatePass));
};

Schema.statics.emailExists = function(email, cb) {
    this.findOne({email: email}, function(e, user) {
        cb(e, !!user);
    });
};

Model = MG.model('User', Schema);
module.exports = Model;