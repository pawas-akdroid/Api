const { body, check, validationResult } = require("express-validator")
const { validationError } = require("../responses/Responses")


exports.ApiValidators = [
    check('UP').notEmpty().withMessage("User phone cannot be empty.").bail(),
    check('MC').notEmpty().withMessage('Merchant code cannot be empty.').bail(),
    check('RE').notEmpty().withMessage('Please enter your remarks.').bail()
    .isLength({max: 500 }).withMessage('Remarks should not exceed 500 letters').bail(),
    check('TA').notEmpty().withMessage('Please enter the total amount.').bail().isFloat().withMessage("Total amount should be numeric.").bail(),
    check('SK').notEmpty().withMessage('Please enter the secret key.').bail(),
    async (req, res, next) => {
        const err = validationResult(req)
        if(!err.isEmpty()){
            return validationError(res, err)
        }
        next()
    }
]