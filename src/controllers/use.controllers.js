import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponce } from "../utils/ApiResponce.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.models.js";

const generateAccessAndRefreshToken = async (userId) => {
    try {
        const user = await User.findById(userId);
        if (!user) {
            throw new ApiError(404, "user not found whille generating token")
        }
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false });

        return { accessToken, refreshToken };
    }
    catch (error) {
        throw new ApiError(500, "sonthing went wrong while generating assess and refresh token")
    }
}
const registerUser = asyncHandler(async (req, res) => {

    //register user controller algorithm
    //1.get data form req.body 
    //2.validate the data

    // Debug: log incoming headers and body to diagnose empty req.body
    // console.log("[registerUser] headers:", req.headers);
    // console.log("[registerUser] body:", req.body);

    const { username, email, password } = req.body;

    // console.log(req.body);

    if (!username) {
        throw new ApiError(404, "User name is requare !")
    }
    if (!email) {
        throw new ApiError(404, "Chaek your email (place enter the email)")
    }
    if (!email.includes("@")) {
        throw new ApiError(404, "Ee-Enter the email (@) missing")
    }

    if (!password || password.length < 6) {
        throw new ApiError(404, "RE-enter your password or encrease its character counts")
    }

    const userExistOrNot = await User.findOne(
        {
            $or:
                [
                    { email: email },
                    { username: username }
                ]
        }
    )
    if (userExistOrNot) {
        throw new ApiError(404, "user allredy exist")
    }



    const user = await User.create({
        username: username.toLowerCase(),
        email,
        password,

    });

    const createdUser = await User.findById(user._id).select("-password");

    if (!createdUser) {
        throw new ApiError(500, "user not created successfully")
    }

    return res.status(201).json(new ApiResponce(201, createdUser, "user created successfully"))


});
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    // console.log("email,password:", email, password);
    if (!email) {
        throw new ApiError(401, "place enter the user email");
    }
    if (!password) {
        throw new ApiError(401, "place enter the user password");
    }

    const userAlreadyRegisterOrNot = await User.findOne(
        {
            $or:
                [
                    { email: email },
                ]
        }
    )
    // console.log("SEE HEAR",userAlreadyRegisterOrNot)
    if (!userAlreadyRegisterOrNot) {
        throw new ApiError(401, "You are not regester yat to login register fist")
    }



    const chackPasswordIscorrectOrNot = await userAlreadyRegisterOrNot.isPasswordCorrect(password);

    if (!chackPasswordIscorrectOrNot) {
        throw new ApiError(401, "Your enterd password is not correct")
    }

    const { refreshToken, accessToken } = await generateAccessAndRefreshToken(userAlreadyRegisterOrNot._id)

    const loggedInUserAndDetails = await User.findById(User._id).select("-password -refreshToken")

    const option = {
        httpOnly: true,
        secure: true
    }

    return res
        .status(200)
        .cookie("accessToken", accessToken, option)
        .cookie("refreshToken", refreshToken, option)
        .json(
            new ApiResponce(200, { User: loggedInUserAndDetails, accessToken }, "User login succesfully")
        )
})
const logoutUser = asyncHandler(async (req, res) => {
    await User.findByIdAndUpdate(req.user._id, {
        $set: {
            refreshToken: undefined
        }
    }, { new: true })
    const option = {
        httpOnly: true,
        secure: true
    }

    return res.status(200)
        .clearCookie("accessToken", option)
        .clearCookie("refreshToken", option)
        .json(
            new ApiResponce(200, {}, "User logout succesfully")
        )
})

export { registerUser, loginUser, logoutUser };
