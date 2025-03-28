import User from "../models/user.model";

export const checkFriendShip = async (req, res, next) => {
    const { id:friendId } = req.params;
    const userId = req.user._id;
    try{
        const user = await User.findById(userId);
        if (!user.friends.includes(friendId)){
            return res.status(400).json({ message: "Not a friend" });
            
        }
    }catch(error){
        res.status(500).json({ message: "Error checking friendship" });
    }
}