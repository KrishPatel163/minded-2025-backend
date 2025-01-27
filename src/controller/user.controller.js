import { cookieOptions } from "../constant.js";
import { User } from "../models/user.model.js";
import ResponseHandler from "../utils/ResponseHandler.js";

const logInUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email && !password) {
            const error = new Error("All fields are required!");
            error.status = 400;
            return next(error);
        }

        const user = await User.findOne({ email });
        if (!user) {
            const error = new Error("No user found with this email");
            error.status = 400;
            return next(error);
        }

        const correctPassword = user.isCorrectPassword(password);
        if (!correctPassword) {
            const error = new Error("The provided password is not correct");
            error.status = 400;
            return next(error);
        }

        const { accessToken, refreshToken } =
            user.generateAccessAndRefreshToken();

        user.refreshToken = refreshToken;
        user.save({ validateBeforeSave: false });
        res.cookie("accessToken", accessToken, cookieOptions);
        return ResponseHandler.SuccessResponse(
            res,
            "User Logged Successfully!",
            {
                user,
                accessToken,
            },
            200
        );
    } catch (error) {
        next(error);
    }
};

const registerUser = async (req, res, next) => {
    try {
        const { fullName, email, password } = req.body;

        if (!fullName || !email || !password) {
            const error = new Error("All fields are required");
            error.status = 400;
            return next(error);
        }
        const existing_user = await User.findOne({ email });
        if (existing_user) {
            const error = new Error("User with same email already exists.");
            error.status = 400;
            return next(error);
        }

        const created_user = await User.create({
            fullName,
            email,
            password,
        });
        if (!created_user) {
            const error = new Error(
                "there was some problem with creating the user."
            );
            error.status = 501;
            return next(error);
        }

        return ResponseHandler.SuccessResponse(
            res,
            "User created successfully.",
            { user: created_user },
            201
        );
    } catch (error) {
        next(error);
    }
};

export { logInUser, registerUser };
