const userService = require('../services/user.service');
const profileServiceUrl = process.env.PROFILE_SERVICE_URL;
const axios = require('../config/axios');
const handleJWT = require('../jwt/handleJWT');

const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await userService.getUserById(+id);
        if (result && result.errCode === 200) {
            const profileRes = await axios.get(`${profileServiceUrl}/api/profile/${id}`);
            if (profileRes.errcode === 200) {
                result.data.profile = profileRes.data;
            }
            return res.status(200).json(result);
        } else {
            return res.status(result.errCode).send(result.message);
        }
    } catch (error) {
        return res.status(500).send('Internal server error');
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const result = await userService.login(email, password);
        if (result && result.errCode === 200) {
            return res.status(200).json(result);
        } else {
            return res.status(result.errCode).send(result.message);
        }
    } catch (error) {
        return res.status(500).send('Internal server error');
    }
}

const check = (req, res) => {
    try {
        const token = req.headers.authorization;
        const decoded = handleJWT.verifyJWT(token);
        if (!decoded) {
            return res.status(401).json({
                errCode: 401,
                message: 'Unauthorized'
            })
        }
        return res.status(200).json({
            errCode: 200,
            message: 'Success',
            data: decoded.data
        })
    } catch (error) {
        return res.status(401).json({
            errCode: 401,
            message: 'Unauthorized'
        })
    }

}

module.exports = {
    getUserById,
    login,
    check
}