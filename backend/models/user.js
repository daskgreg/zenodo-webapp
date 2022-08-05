const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
    },
    name:{
        type:String,
        required:true,
    },
    surname:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    passwordHash:{
        type:String,
        required: true,
    },
    phone:{
        type:String,
        required:true
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    isAccepted:{
        type:Boolean,
        default:false
    },
    occupation:{
        type:String,
        default:false
    },
    company:{
        type:String,
        default:false
    }
})

userSchema.virtual('id').get(function() {
    return this._id.toHexString();
});

userSchema.set('toJSON', {
    virtuals:true,
})

exports.User = mongoose.model('User', userSchema);
exports.userSchema = userSchema;