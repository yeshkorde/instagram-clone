
import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    username:{
        type:String
    },
    email:{
        type:String
    },
    password:{
        type:String
    },
    bio:{
        type:String
    },
    profileImage:{
        type:String,
    },
    followers:[
        {
            type:mongoose.Schema.ObjectId,
            ref:"User"
        }
    ],
    following:[
        {
              type:mongoose.Schema.ObjectId,
            ref:"User"
        }
    ],
    posts:[
        {
            type:mongoose.Schema.ObjectId,
            ref:"post"
        }
    ],
    saved:[
        {
            type:mongoose.Schema.ObjectId,
            ref:"post"
        }
    ],
    liked:[
        {
            type:mongoose.Schema.ObjectId,
            ref:"post"
        }
    ],
    store:[
        {
            type:mongoose.Schema.ObjectId,
            ref:'store'
        }
    ],
    reels:[
        {
            type:mongoose.Schema.ObjectId,
            ref:'reels'
        }
    ],
    notifications:[
        {
            type:mongoose.Schema.ObjectId,
            ref:'notifications'
        }
    ]
},{ timestamps: true })

export default mongoose.models.User || mongoose.model('User', userSchema);
