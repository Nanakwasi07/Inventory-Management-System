const User = require('../models/user.model');
const bcrypt = require('bcrypt');

class UserService {
    async getAllUsers() {
        try {
            const users = await User.find();
            return { success: true, users };
        } catch (error) {
            return { success: false, message: error.message };
        }
    }

    async getUserById(id) {
        try {
            const user = await User.findById(id);
            if (!user) return { success: false, message: 'User not found', status: 404 };
            return { success: true, user };
        } catch (error) {
            return { success: false, message: error.message };
        }
    }

    async createUser(userData) {
        try {
            const existingUser = await User.findOne({ email: userData.email });
            if (existingUser) {
                return { success: false, message: 'User already exists', status: 400 };
            }

            const salt = await bcrypt.genSalt(Number(process.env.SALT));
            const hashedPassword = await bcrypt.hash(userData.password, salt);
            const newUser = await new User({ ...userData, password: hashedPassword }).save();
            return { success: true, data: newUser, message: 'User created successfully' };
        } catch (error) {
            return { success: false, message: error.message };
        }
    }

    async authenticateUser(email, password) {
        try {
            const user = await User.findOne({ email });
            if (!user) {
                return { success: false, message: 'User not found', status: 404 };
            }

            const validPassword = await bcrypt.compare(password, user.password);
            if (!validPassword) {
                return { success: false, message: 'Invalid password', status: 400 };
            }

            const token = user.generateAuthToken();
            return { success: true, data: { token, user }, message: 'Authentication successful' };
        } catch (error) {
            return { success: false, message: error.message };
        }
    }

    async updateUser(id, userData) {
        try {
            const updatedUser = await User.findByIdAndUpdate(id, userData, { new: true });
            if (!updatedUser) {
                return { success: false, message: 'User not found', status: 404 };
            }
            return { success: true, data: updatedUser, message: 'User updated successfully' };
        } catch (error) {
            return { success: false, message: error.message };
        }
    }

    async deleteUser(id) {
        try {
            const deletedUser = await User.findByIdAndDelete(id);
            if (!deletedUser) {
                return { success: false, message: 'User not found', status: 404 };
            }
            return { success: true, data: deletedUser, message: 'User deleted successfully' };
        } catch (error) {
            return { success: false, message: error.message };
        }
    }
}

module.exports = new UserService();
