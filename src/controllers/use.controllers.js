import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponce } from "../utils/ApiResponce.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.models.js";

const generateAccessAndRefreshToken = async (userId) => {
  const user = await User.findById(userId);
  if (!user) throw new ApiError(404, "User not found");

  const accessToken = user.generateAccessToken();
  const refreshToken = user.generateRefreshToken();

  user.refreshToken = refreshToken;
  await user.save({ validateBeforeSave: false });

  return { accessToken, refreshToken };
};

const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password)
    throw new ApiError(400, "All fields required");

  const exist = await User.findOne({
    $or: [{ email }, { username }],
  });

  if (exist) throw new ApiError(409, "User already exists");

  const user = await User.create({
    username: username.toLowerCase(),
    email,
    password,
  });

  const safeUser = await User.findById(user._id).select("-password");

  res.status(201).json(
    new ApiResponce(201, safeUser, "User registered successfully")
  );
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    throw new ApiError(401, "Email and password required");

  const user = await User.findOne({ email });
  if (!user) throw new ApiError(401, "User not registered");

  const isValid = await user.isPasswordCorrect(password);
  if (!isValid) throw new ApiError(401, "Incorrect password");

  const { accessToken, refreshToken } =
    await generateAccessAndRefreshToken(user._id);

  const safeUser = await User.findById(user._id)
    .select("-password -refreshToken");

  const cookieOptions = {
    httpOnly: true,
    secure: true,        // REQUIRED (HTTPS)
    sameSite: "none",    // REQUIRED (cross-site)
    path: "/",
  };

  res
    .status(200)
    .cookie("accessToken", accessToken, cookieOptions)
    .cookie("refreshToken", refreshToken, cookieOptions)
    .json(
      new ApiResponce(
        200,
        { user: safeUser },
        "Login successful"
      )
    );
});

const logoutUser = asyncHandler(async (req, res) => {
  const options = {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    path: "/",
  };

  res
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .status(200)
    .json(new ApiResponce(200, {}, "Logout successful"));
});

const getUser = asyncHandler(async (req, res) => {
  res.status(200).json(
    new ApiResponce(200, req.user, "User fetched")
  );
});

export { registerUser, loginUser, logoutUser, getUser };



































































// import { asyncHandler } from "../utils/asyncHandler.js";
// import { ApiResponce } from "../utils/ApiResponce.js";
// import { ApiError } from "../utils/ApiError.js";
// import { User } from "../models/user.models.js";

// const generateAccessAndRefreshToken = async (userId) => {
//     try {
//         const user = await User.findById(userId);
//         if (!user) {
//             throw new ApiError(404, "user not found whille generating token")
//         }
//         const accessToken = user.generateAccessToken();
//         const refreshToken = user.generateRefreshToken();

//         user.refreshToken = refreshToken;
//         await user.save({ validateBeforeSave: false });

//         return { accessToken, refreshToken };
//     }
//     catch (error) {
//         throw new ApiError(500, "sonthing went wrong while generating assess and refresh token")
//     }
// }
// const registerUser = asyncHandler(async (req, res) => {
//     const { username, email, password } = req.body;
//     // console.log("==========>",username, email, password);

//     if (!username) {
//         throw new ApiError(404, "User name is requare !")
//     }
//     if (!email) {
//         throw new ApiError(404, "Chaek your email (place enter the email)")
//     }
//     if (!email.includes("@")) {
//         throw new ApiError(404, "Ee-Enter the email (@) missing")
//     }
//     if (!password || password.length < 6) {
//         throw new ApiError(404, "RE-enter your password or encrease its character counts")
//     }
//     const userExistOrNot = await User.findOne(
//         {
//             $or:
//                 [
//                     { email: email },
//                     { username: username }
//                 ]
//         }
//     )
//     if (userExistOrNot) {
//         throw new ApiError(404, "user allredy exist")
//     }
//     const user = await User.create({
//         username: username.toLowerCase(),
//         email,
//         password,

//     });
//     const createdUser = await User.findById(user._id).select("-password");
//     if (!createdUser) {
//         throw new ApiError(500, "user not created successfully")
//     }
//     return res.status(201).json(new ApiResponce(201, createdUser, "user created successfully"))
// });
// const loginUser = asyncHandler(async (req, res) => {
//   const { email, password } = req.body;

//   if (!email || !password) {
//     throw new ApiError(401, "Email and password required");
//   }

//   const user = await User.findOne({ email });
//   if (!user) {
//     throw new ApiError(401, "User not registered");
//   }

//   const isValid = await user.isPasswordCorrect(password);
//   if (!isValid) {
//     throw new ApiError(401, "Incorrect password");
//   }

//   const { accessToken, refreshToken } =
//     await generateAccessAndRefreshToken(user._id);

//   const safeUser = await User.findById(user._id)
//     .select("-password -refreshToken");

//   const cookieOptions = {
//     httpOnly: true,
//     secure: true,
//     sameSite: "none",
//     path: "/",
//     domain: ".onrender.com"
//   };

//   return res
//     .status(200)
//     .cookie("accessToken", accessToken, cookieOptions)
//     .cookie("refreshToken", refreshToken, cookieOptions)
//     .json(new ApiResponce(
//       200,
//       { user: safeUser },
//       "User login successfully"
//     ));
// });

// const logoutUser = asyncHandler(async (req, res) => {
//     await User.findByIdAndUpdate(req.user?._id, {
//         $set: {
//             refreshToken: null
//         }
//     }, { new: true })
//     const option = {
//         httpOnly: true,
//         secure: true
//     }
//     return res.status(200)
//         .clearCookie("accessToken", option)
//         .clearCookie("refreshToken", option)
//         .json(
//             new ApiResponce(200, {}, "User logout succesfully")
//         )
// })
// const getUser = asyncHandler(async (req, res) => {
//     const userId = req.user?._id
//     const username = await User.findById(userId).select("-password -binHistory -email -refreshToken")

//     return res
//         .status(200)
//         .json(
//             new ApiResponce(200, username, "user name flatch succefully")
//         )
// })
// export { registerUser, loginUser, logoutUser, getUser };
