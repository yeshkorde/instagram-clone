import mongoose from "mongoose";

const commentSchema = mongoose.Schema({
    postId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"post"
    },
    userId:{
     type:mongoose.Schema.Types.ObjectId,
     ref:"user"
    },
    text:{
        type:String,
    },
    likes:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"user"
        }
    ],
    
},{ timestamps: true })


export default mongoose.models.Comment || mongoose.model("Comment",commentSchema)