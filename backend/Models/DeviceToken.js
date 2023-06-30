import mongoose, { Schema } from "mongoose";

const deviceTokenSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    deviceToken: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const deviceTokenModel = mongoose.model("deviceTokens", deviceTokenSchema);
export default deviceTokenModel;
