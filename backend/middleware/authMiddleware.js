const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET;

const authMiddleware = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Get token from header
            token = req.headers.authorization.split(' ')[1];

            // Verify token. Use a check for jwtSecret existence.
 if (!jwtSecret) {
                console.error('JWT_SECRET is not defined!');
 return res.status(500).json({ message: 'Server configuration error' });
            }
            const decoded = jwt.verify(token, jwtSecret);

            // Attach user from payload to request
            req.user = decoded; // The payload should contain user information like user_id and role

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