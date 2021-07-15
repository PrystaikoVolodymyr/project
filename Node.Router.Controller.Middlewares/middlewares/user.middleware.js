const DB = require('../dataBase/user');
const errorCodes = require('../constant/errorCodes.enum');
const errorMessage = require('../error/error.message');

module.exports = {
    checkIsIdValid: (req,res,next) => {
        try {
            const {userId} = req.params
            const {preferLang = "en"} = req.body
            if(+userId<0 || Number.isNaN(+userId) || !Number.isInteger(+userId)){
                    throw new Error(errorMessage.BAD_ID[preferLang])
            }
            next()
        }catch (e) {
                res.status(errorCodes.BAD_REQUEST).json(e.message)
        }
    },
    checkIsUserValid: async (req,res,next) => {
        try {
            const {name,preferLang = "en"} = req.body;
            for (const user of DB) {
                if (user.name === name){
                throw new Error(errorMessage.BAD_USER[preferLang])
                }
            }
            await next()
        }catch (e) {
            res.status(errorCodes.BAD_REQUEST).json(e.message)
        }

    }
}