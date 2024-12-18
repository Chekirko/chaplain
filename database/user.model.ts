import { model, models, Schema } from "mongoose";

export interface IUser {
  _id: Schema.Types.ObjectId;
  name: string;
  username: string;
  email: string;
  image?: string;
  role: "user" | "admin" | "editor";
}

// export interface IUserDoc extends IUser, Document {}
const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    image: { type: String },
    role: { type: String, enum: ["user", "admin", "editor"], default: "user" },
  },
  { timestamps: true }
);

const User = models?.User || model<IUser>("User", UserSchema);

export default User;
