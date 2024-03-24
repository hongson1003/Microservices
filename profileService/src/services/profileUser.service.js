const db = require('../config/models');

const getProfileById = async (id) => {
    try {
        const profile = await db.InfoUser.findByPk(id);
        if (!profile) {
            return {
                errcode: 404,
                message: 'Profile not found'
            }
        }
        return {
            errcode: 200,
            data: profile
        };
    } catch (error) {
        return {
            errcode: 500, message: error.message
        }
    }
}

module.exports = {
    getProfileById
}