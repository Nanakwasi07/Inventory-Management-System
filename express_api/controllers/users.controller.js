const userService = require('../services/userService');

const getUsers = async (req, res) => {
    const result = await userService.getAllUsers();
    if (!result.success) return res.status(500).json({ message: result.message });
    res.status(200).json({ users: result.users });
};

const getUserById = async (req, res) => {
    const { id } = req.params;
    const result = await userService.getUserById(id);
    if (!result.success) return res.status(result.status || 500).json({ message: result.message });
    res.status(200).json({ user: result.user });
};

const createUser = async (req, res) => {
    const result = await userService.createUser(req.body);
    if (!result.success) return res.status(result.status || 500).json({ message: result.message });
    res.status(200).json({ data: result.data, message: result.message });
};

const authUser = async (req, res) => {
    const { email, password } = req.body;
    const result = await userService.authenticateUser(email, password);
    if (!result.success) return res.status(result.status || 500).json({ message: result.message });
    res.status(200).json({ data: result.data.token, user: result.data.user, message: result.message });
};

const updateUser = async (req, res) => {
    const { id } = req.params;
    const result = await userService.updateUser(id, req.body);
    if (!result.success) return res.status(result.status || 500).json({ message: result.message });
    res.status(200).json({ user: result.data, message: result.message });
};

const deleteUser = async (req, res) => {
    const { id } = req.params;
    const result = await userService.deleteUser(id);
    if (!result.success) return res.status(result.status || 500).json({ message: result.message });
    res.status(200).json({ message: result.message });
};

module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    authUser
}