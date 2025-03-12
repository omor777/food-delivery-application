import mongoose, { Document, model, Schema, models } from "mongoose";

export interface IProfile extends Document {
  _id: mongoose.Types.ObjectId;
  user: mongoose.Types.ObjectId;
  name?: string;
  gender?: "male" | "female" | "other";
  dateOfBirth?: Date;
  phone?: string;
  profileImage?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const profileSchema = new Schema<IProfile>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
    },
    gender: {
      type: String,
      enum: ["male", "female", "other"],
    },
    dateOfBirth: {
      type: Date,
    },
    phone: {
      type: String,
    },
    profileImage: {
      type: String,
    },
  },
  { timestamps: true }
);

const Profile = models.Profile || model<IProfile>("Profile", profileSchema);

export default Profile;
