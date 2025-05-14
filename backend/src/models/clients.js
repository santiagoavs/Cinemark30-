import { Schema, model } from "mongoose";

const clientsSchema = new Schema(
  {
    name: {
      type: String,
      require: true,
    },

    email: {
      type: String,
    },

    password: {
      type: String,
    },

    telephone: {
      type: String,
      require: true,
    },

    address: {
      type: String,
    },

    isActive: {
      type: Boolean,
    },
  },
  {
    timestamps: true,
    strict: false,
  }
);

export default model("clients", clientsSchema);
