import User from "../models/account.js";
// Create
const create = async ({
  username,
  email,
  password,
  dob,
  gender,
  phoneNumber,
  avatar,
  role_id,
}) => {
  try {
    // Create new account
    const newAccount = await User.create({
      username,
      email,
      password,
      dob,
      gender,
      phoneNumber,
      avatar,
      role_id,
    });
    // Return newAccount object
    return newAccount._doc;
  } catch (error) {
    throw new Error(error.toString());
  }
};
// Get all accounts
const list = async () => {
  try {
    return await User.find({}).exec();
  } catch (error) {
    throw new Error(error.toString());
  }
};

const getById = async (id) => {
  try {
    return await User.findOne({ _id: id }).exec();
  } catch (error) {
    throw new Error(error.toString());
  }
};


const loginAccount = async (username) => {
  try {
    const user = await User.findOne({ username }).exec();
    return user;
  } catch (error) {
    throw new Error(error);
  }
};
const edit = async (
  id,
  { username, email, password, dob, gender, phoneNumber, avatar,role_id }
) => {
  try {
    const updatedAccount = await User.findByIdAndUpdate(
      { _id: id },
      { username, email, password, dob, gender, phoneNumber, avatar, role_id },
      { new: true }
    );

    if (!updatedAccount) {
      throw new Error("Account not found");
    }

    return updatedAccount;
  } catch (error) {
    throw new Error(error.toString());
  }
};

const deleteAccount = async (id) => {
  try {
    return await User.findByIdAndDelete({ _id: id });
  } catch (error) {
    throw new Error(error.toString());
  }
};
const removeRefreshToken = async (userId) => {
  try {
    // Xóa refreshToken của người dùng trong database
    await User.updateOne({ _id: userId }, { $unset: { refreshToken: 1 } });
  } catch (error) {
    throw new Error(error.toString());
  }
};

export default {
  create,
  list,
  getById,
  edit,
  deleteAccount,
  getById,
  loginAccount,
  removeRefreshToken,
};
