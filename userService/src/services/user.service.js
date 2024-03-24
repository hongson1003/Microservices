const db = require('../config/models');
const handleJwt = require('../jwt/handleJWT');
const { v4: uuidv4 } = require('uuid');

const getUserById = async (id) => {
    try {
        const user = await db.User.findByPk(id);
        if (!user) {
            return {
                errCode: 404,
                message: 'User not found'
            }
        }
        return {
            errCode: 200,
            message: 'Success',
            data: user
        }
    } catch (error) {
        return {
            errCode: 500,
            message: 'Error from database'
        }
    }
}

const login = async (email, password) => {
    try {
        const user = await db.User.findOne({
            where: {
                email,
                password
            },
            attributes: ['id', 'email', 'name']
        });
        const token = handleJwt.signJWT(user);
        const access_token = uuidv4();
        if (!user) {
            return {
                errCode: 404,
                message: 'Email or password is incorrect'
            }
        }
        return {
            errCode: 200,
            message: 'Success',
            data: {
                user,
                token,
                access_token
            }
        }
    } catch (error) {
        return {
            errCode: 500,
            message: 'Error from database'
        }
    }
}

module.exports = {
    getUserById,
    login,
}