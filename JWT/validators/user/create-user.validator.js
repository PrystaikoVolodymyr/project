const Joi = require('joi');
const { regexpEnum, constant } = require('../../constants');

const carSubSchema = Joi.array().items({
    model: Joi.string(),
    year: Joi.number()
});

module.exports = Joi.object({
    name: Joi
        .string()
        .alphanum()
        .min(2)
        .max(50)
        .required(),
    email: Joi
        .string()
        .regex(regexpEnum.EMAIL_REGEXP)
        .required(),
    password: Joi
        .string()
        .regex(regexpEnum.PASSWORD_REGEXP)
        .required(),
    yearOfBorn: Joi
        .number()
        .integer()
        .min(constant.CURRENT_YEAR - 100)
        .max(constant.CURRENT_YEAR)
        .required(),
    work: Joi
        .boolean()
        .default(false)
        .optional(),
    car: carSubSchema.when('work', { is: true, then: Joi.required() })
});
