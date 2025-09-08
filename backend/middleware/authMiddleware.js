const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET || 'your-super-secret-key-that-should-be-in-an-env-file';

const authMiddleware = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];

            if (!jwtSecret) {
                console.error('JWT_SECRET is not defined!');
 return res.status(500).json({ message: 'Server configuration error' });
            }
            const decoded = jwt.verify(token, jwtSecret);

            req.user = decoded;

            next();
        } catch (error) {
            console.error('Token verification failed:', error.message);
            res.status(401).json({ message: 'Not authorized, token failed' });
        }
    }

    if (!token) {
        res.status(401).json({ message: 'Not authorized, no token' });
    }
};

module.exports = authMiddleware;