import { Document } from "mongoose";
import { IUser } from "../models/userModel";

export const mapUserDocumentToUser = (userDoc: IUser) => {
  const userObj = userDoc.toObject<IUser>();
  return {
    // id: userObj._id.toString(),
    name: userObj.name,
    email: userObj.email,
    password: userObj.password,
    role: userObj.role,
    avatar: {
      public_id: userObj.avatar.public_id,
      url: userObj.avatar.url,
    },
    position: userObj.position,
    rating: userObj.rating,
  };
};
