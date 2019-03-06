const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const ProfileSchema = new Schema ({
    
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    handle: {
        type: String,
        required: true,
        max: 40
    },
    company : {
        type: String
    },
    website: {
        type: String
    },
    location: {
        type: String
    },
    status: {
        type: String
    },
    skills: {
        type:[String]
    },
    bio : {
        type: String
    },
    githubusername: {
        type: String
    },
    expirience: [

        {
            title: {
                type: String
            },
            company : {
                type: String
            },
            location: {
                type: String
            },
            from : {
                type : Date
            },
            to: {
                type: Date
            },
            current : {
                type: Boolean,
                default: false
            },
            description: {
                type: String,

            },
        }
    ],

    expirience: [
        
        {
            school: {
                type: String
            },
            degree : {
                type: String
            },
            fieldofstudy: {
                type: String
            },
            from : {
                type : Date
            },
            to: {
                type: Date
            },
            current : {
                type: Boolean,
                default: false
            },
            description: {
                type: String,

            },
        }
    ],
    social: {
        youtube: {
            type: String
        },
        twitter: {
            type: String
        },
        facebook: {
            type: String
        },
        linkedin: {
            type: String
        },
        instagram: {
            type: String
        },
        date: {
            type: Date,
            default: Date.now
        }
    }


});

module.exports = Profile = mongoose.model('profiles', ProfileSchema);