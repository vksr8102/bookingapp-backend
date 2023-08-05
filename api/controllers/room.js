import Hotel from "../modles/Hotel.js";
import Room from "../modles/Room.js";


export const createRoom=async(req,res,next)=>{
    const hotelId = req.params.hotelid;
    const newRoom = new Room(req.body);
    try {
       const saveRoom =await newRoom.save();
       try {
        await Hotel.findByIdAndUpdate(hotelId,{$push:{rooms:saveRoom._id}})
       } catch (error) {
        next(error)
       } 
       res.status(200).json(saveRoom)
    } catch (error) {
        next(error)
    }
}
export const updateRoom =async(req,res,next)=>{
    try {
        const updateRoom =await Room.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true})
 res.status(200).json(updateRoom)
    } catch (error) {
     next(error)
    }
}
export const deleteRoom =async(req,res,next)=>{
    try {
        await Room.findByIdAndDelete(req.params.id,)
 res.status(200).json("Room has been deleted")
    } catch (error) {
     next(error)
    }
}
export const getRoom =async(req,res,next)=>{
    try {
        const Room = await Room.findById(req.params.id)
   res.status(200).json(Room)
    } catch (error) {
     next(error)
    }
}
export const getRooms =async(req,res,next)=>{
    try {
        const Rooms = await Room.find()
   res.status(200).json(Rooms)
      } catch (error) {
       next(error)
      }
}