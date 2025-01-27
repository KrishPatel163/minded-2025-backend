import ResponseHandler from "../utils/ResponseHandler.js";

export const ErrorMiddleware = (err, req, res, next) => {
    console.error(err);
    ResponseHandler.ErrorResponse(
        res,
        err.message || "Internal Server Error",
        err.status || 500,
        {
            stack: process.env.NODE_ENV === "dev" ? err.stack : undefined,
            details: err.details || null,
        }
    );
};
