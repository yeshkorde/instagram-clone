import mongoose from "mongoose";

const reelsSchema = mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
    caption:{
        type:String
    },
    videoUrl:{
        type:String
    },
    description:{
        type:String
    },
    likes:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"user"
        }
    ],
    comments:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"comment"
        }
    ],

    saves:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    }],

},{ timestamps: true })


export default  mongoose.models.reels || mongoose.model("reels",reelsSchema);