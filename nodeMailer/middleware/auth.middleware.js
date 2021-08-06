const jwt = require('jsonwebtoken');
const ErrorHandler = require('../error/ErrorHandler');
const errorMessage = require('../error/error.message');
const { ACCESS_KEY, REFRESH_KEY } = require('../configs/config');
const { statusCodesEnum, constant } = require('../constants');
const { authService } = require('../service');

module.exports = {
    checkIsTokenValid: async (req, res, next) => {
        try {
            const access_token = req.get(constant.AUTHORIZATION);
            if (!access_token) {
                throw new ErrorHandler(statusCodesEnum.BAD_REQUEST, errorMessage.NO_TOKEN);
            }

            const tokens = await authService.findToken({ access_token }).populate('user');
            if (!tokens) {
                throw new ErrorHandler(statusCodesEnum.BAD_REQUEST, errorMessage.NO_TOKEN);
            }

            await jwt.verify(access_token, ACCESS_KEY, (err) => {
                if (err) {
                    throw new ErrorHandler(statusCodesEnum.BAD_REQUEST, errorMessage.WRONG_TOKEN);
                }
            });

            req.tokenInfo = tokens;
            await next();
        } catch (e) {
            next(e);
        }
    },
    checkIsRefreshTokenValid: async (req, res, next) => {
        try {
            const refresh_token = req.get(constant.AUTHORIZATION);
            if (!refresh_token) {
                throw new ErrorHandler(statusCodesEnum.BAD_REQUEST, errorMessage.NO_TOKEN);
            }
            const tokens = await authService.findToken({ refresh_token }).populate('user');
            if (!tokens) {
                throw new ErrorHandler(statusCodesEnum.BAD_REQUEST, errorMessage.NO_TOKEN);
            }
            await jwt.verify(refresh_token, REFRESH_KEY, (err) => {
                if (err) {
                    throw new ErrorHandler(statusCodesEnum.BAD_REQUEST, errorMessage.WRONG_TOKEN);
                }
            });
            req.tokenInfo = tokens;
            await next();
        } catch (e) {
            next(e);
        }
    }
};
