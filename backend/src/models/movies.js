import { Schema, model } from "mongoose";

const moviesSchema = new Schema(
  {
    title: {
      type: String,
      require: true,
    },

    description: {
      type: String,
    },

    director: {
      type: String,
    },

    genre: {
      type: String,
    },

    year: {
      type: Number,
    },

    time: {
      type: Number,
    },

    image: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: true,
    strict: false,
  }
);

export default model("movies", moviesSchema);
