import { model, models, Schema } from "mongoose";

export interface IJourney {
  _id: Schema.Types.ObjectId;
  author: Schema.Types.ObjectId;
  start: Date;
  finish: Date;
  church: string;
  vector: string;
  chief: string;
  chiefPhone: string;
  members: string;
  status: "planned" | "progress" | "finished" | "cancelled";
  comment: string;
}

const JourneySchema = new Schema<IJourney>(
  {
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },
    start: { type: Date, required: true },
    finish: { type: Date, required: true },
    church: { type: String, required: true },
    vector: { type: String, required: true },
    chief: { type: String, required: true },
    chiefPhone: { type: String, required: true },
    members: { type: String },

    status: {
      type: String,
      enum: ["planned", "progress", "finished", "cancelled"],
      default: "planned",
    },
    comment: { type: String },
  },
  { timestamps: true }
);

const Journey = models?.Journey || model<IJourney>("Journey", JourneySchema);

export default Journey;
