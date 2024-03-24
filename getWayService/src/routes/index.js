const express = require('express');
const router = express.Router();
const { services } = require('./routes.json');
const axios = require('../config/axios');

router.all('/api/:apiName/:path', async (req, res) => {
    try {
        const apiName = req.params.apiName;
        const path = req.params.path;
        if (Object.keys(services).includes(apiName)) {
            if (services[apiName].checkAuthorize === true) {
                const authorization = req.headers.authorization;
                const token = authorization ? authorization.split(' ')[1] : null;
                if (!token) {
                    return res.status(401).json({
                        error: 401,
                        message: 'Unauthorized'
                    });
                }
                const result = await axios({
                    method: 'post',
                    url: services['login'].url + 'api/' + 'check',
                    headers: {
                        authorization: token
                    }
                });
                if (result.errCode !== 200) {
                    return res.status(401).json(result);
                }
            }
            const result = await axios({
                method: req.method,
                url: services[apiName].url + 'api/' + apiName + '/' + path,
                data: req.body,
                headers: req.headers
            });
            if (result) {
                res.json(result);
            } else {
                res.status(404).json({
                    error: 404,
                    message: 'Not found'
                });
            }
        } else {
            res.status(404).json({
                error: 404,
                message: 'Not found route'
            });
        }
    } catch (error) {
        return res.status(500).json(error.response.data);
        ;
    }
});

router.post('/api/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                error: 400,
                message: 'Email and password are required'
            });
        }
        const result = await axios({
            method: 'post',
            url: services['login'].url + 'api/' + 'login',
            data: req.body,
        });

        if (result) {
            res.json(result);
        } else {
            res.status(404).json({
                error: 404,
                message: 'Not found'
            });
        }
    } catch (error) {
        return res.status(500).json({
            error: 500,
            message: 'Internal server error',
            detail: error.message
        });
    }
})

router.post('/api/check', async (req, res) => {
    const authorization = req.headers.authorization;
    const token = authorization ? authorization.split(' ')[1] : null;
    if (!token) {
        return res.status(401).json({
            error: 401,
            message: 'Unauthorized'
        });
    }
    try {
        const result = await axios({
            method: 'post',
            url: services['login'].url + 'api/' + 'check',
            headers: {
                authorization: token
            }
        });
        if (result) {
            return res.status(200).json(result);
        } else {
            res.status(404).json({
                error: 404,
                message: 'Not found'
            });
        }
    } catch (error) {
        return res.status(404).json({
            error: 404,
            message: 'Not found'
        });
    }
});

module.exports = router;