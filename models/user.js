// import mongoose from "mongoose";

// const { Schema, model, models } = mongoose;

// const userSchema = new Schema(
//     {
//         name: {
//             type: String,
//             required: true,
//         },
//         email: {
//             type: String,
//             required: true,
//             unique: true, // Ensures unique emails
//         },
//         password: {
//             type: String,
//             required: true,
//         },
//     },
//     { timestamps: true } // Fixed key
// );

// // Use `models.User` to avoid model overwrite in development
// const User = models.User || model("User", userSchema);

// export default User;


import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

// Avoid re-defining the model during hot-reloading in development
const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
