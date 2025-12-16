
import { asyncHandler } from "../utils/asyncHandler.js";
import  jwt  from "jsonwebtoken"
import { User } from "../models/user.models.js";
import { ApiError } from "../utils/ApiError.js";

export const varifyJWT = asyncHandler(async (req, _, next) => {
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")

        if (!token) {
            throw new ApiError(401, "unauthorize request - no token provided ")
        }
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)

        const user = await User.findById(decodedToken?._id).select("-password -refreshToken")

        if (!user) {
            throw new ApiError(401, "invalid token -user not found")
        }

        req.user = user;
        next();
    } catch (error) {
          if (error.name === 'JsonWebTokenError') {
            throw new ApiError(401, "Invalid token format")
        }
        if (error.name === 'TokenExpiredError') {
            throw new ApiError(401, "Token has expired")
        }
        throw new ApiError(401, error?.message || "Invalid access token")
    }
})