const allowAccessFroms = JSON.parse(process.env.ALLOW_ACCESS_FROM);

const BlockCorsMiddleware = (req, res, next) => {
    const origin = req.headers.origin;
    if (!origin) {
        return res.status(403).json({
            errCode: 403,
            message: 'Forbidden'
        })
    }
    if (allowAccessFroms.indexOf(origin) === -1) {
        return res.status(403).json({
            errCode: 403,
            message: 'Forbidden'
        })
    }
    next();
}

module.exports = BlockCorsMiddleware;