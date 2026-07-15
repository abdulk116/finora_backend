// import User from "./models/User.js";
import User from "../models/Users.js";
import ApiError from "../utils/ApiError.js";
import generateToken from "../utils/generateToken.js";

class AuthService {
  async register({ fullName, email, password }) {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw new ApiError(409, "Email already exists");
    }

    const user = await User.create({
      fullName,
      email,
      password,
    });

    const token = generateToken(user._id);

    return {
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
      },
      token,
    };
  }

  async login({ email, password }) {
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      throw new ApiError(401, "Invalid email or password");
    }

    const isPasswordValid = await user?.password === password;

    if (!isPasswordValid) {
      throw new ApiError(401, "Invalid email or password");
    }

    const token = generateToken(user._id);

    return {
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
      },
      token,
    };
  }
}

export default new AuthService();