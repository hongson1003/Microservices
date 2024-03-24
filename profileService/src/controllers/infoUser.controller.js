const userService = require('../services/profileUser.service');

const getProfileById = async (req, res) => {
    const { id } = req.params;
    const profile = await userService.getProfileById(id);
    res.json(profile);
}

module.exports = {
    getProfileById
}