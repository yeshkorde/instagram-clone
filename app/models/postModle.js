import mongoose from "mongoose";

const postSchema = mongoose.Schema({
    userId :{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    images:[

    ],
    caption:{
        type:String
    },
    discripation:{
        type:String
    },
    Likes:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'user'
        }
    ],
    comments:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"comment"
        }
    ],
},{ timestamps: true })

export default mongoose.models.Posts || mongoose.model("Posts",postSchema)

