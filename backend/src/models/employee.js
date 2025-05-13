import { Schema, model } from "mongoose";

const employeeSchema = new Schema(
  {
    name: {
      type: String,
      require: true,
    },

    email: {
      type: String,
    },

    telephone: {
      type: String,
      require: true,
    },

    address: {
      type: String,
    },

    password: {
      type: String,
      require: true,
    },

    position: {
      type: String,
    },
    
    hireDate: {
      type: Date,
    },

    salary: {
      type: Number,
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

export default model("employee", employeeSchema);
