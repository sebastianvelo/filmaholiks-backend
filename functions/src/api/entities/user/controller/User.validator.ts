import { body, param, ValidationChain } from "express-validator";

const validateUserName: ValidationChain = param("userName")
    .isString().withMessage("Username must be a string")
    .notEmpty().withMessage("Username is required");

const validateEmail: ValidationChain = param("email")
    .isEmail().withMessage("Valid email is required");

const validateEmailInBody: ValidationChain = body("email")
    .isEmail().withMessage("Valid email is required");

const UserValidator = {
    getByUserName: [
        validateUserName
    ],
    getByEmail: [
        validateEmail
    ],
    create: [
        validateEmailInBody
    ],
    update: [
        validateUserName,
        body().notEmpty().withMessage("User data is required"),
        body().isObject().withMessage("User data must be an object")
    ],
    delete: [
        validateUserName
    ]
};

export default UserValidator;