import mongoose from "mongoose";
const { Schema } = mongoose;

const chatSchema = new Schema({
    SentBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        require: true,
      },
      SentTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        require: true,
      },
      message:{
        type:String,
        require:true,
      }
},
{timestamps:true}
);

const ChatModel = mongoose.model("chat", chatSchema);
export default ChatModel;