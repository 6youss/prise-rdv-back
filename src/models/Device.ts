import mongoose, { Schema, Document } from "mongoose";

export interface IDevice extends Document {
  user: Schema.Types.ObjectId;
  fcmToken: string;
  platform: string;
}

const DeviceSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  fcmToken: String,
  platform: String
});

const Device = mongoose.model<IDevice>("Device", DeviceSchema);

export default Device;
