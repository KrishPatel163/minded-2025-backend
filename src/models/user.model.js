import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
    {
        fullName: {
            type: String,
            required: true,
            min: 5,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            min: 5,
            trim: true,
            unique: true,
            index: true,
        },
        password: {
            type: String,
            required: true,
            min: 10,
        },
        refreshToken: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

userSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        const salt = await bcrypt.genSalt(10);
        return (this.password = await bcrypt.hash(this.password, salt));
    }
    next();
});

userSchema.methods.isCorrectPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessAndRefreshToken = function () {
    const accessToken = jwt.sign(
        {
            _id: this._id,
            email: this._email,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
        }
    );
    const refreshToken = jwt.sign(
        {
            _id: this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
        }
    );
    return {
        access_token: accessToken,
        refresh_token: refreshToken,
    };
};

export const User = mongoose.model("User", userSchema);