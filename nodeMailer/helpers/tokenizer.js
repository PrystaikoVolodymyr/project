const JWT = require('jsonwebtoken');

module.exports = () => {
    const access_token = JWT.sign({}, 'ACCESS_KEY', { expiresIn: '10m' });
    const refresh_token = JWT.sign({}, 'REFRESH_KEY', { expiresIn: '30d' });

    return {
        access_token,
        refresh_token
    };
};
