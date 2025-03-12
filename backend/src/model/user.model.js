import mongoose from "mongoose";
import { Schema } from "mongoose";

const userSchema = mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
  profilePic: { type: String, default: "" },
  friends: [{ 
    type: Schema.Types.ObjectId, 
    ref: "User" 
}],
  friendsRequest: [{ 
    type: Schema.Types.ObjectId, 
    ref: "User" 
}],
},{
    timestamps: true
}
);

const User = mongoose.model("User", userSchema);
export default User;
