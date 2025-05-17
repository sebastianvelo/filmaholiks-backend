import { NextFunction, Request, Response } from 'express';
import { ValidationChain, validationResult } from 'express-validator';

/**
 * Middleware factory that runs express-validator validation chains
 * and returns 400 with validation errors if validation fails
 */
const requestValidationMiddleware = (validations: ValidationChain[]) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        // Execute all validations
        await Promise.all(validations.map(validation => validation.run(req)));

        // Check if there are validation errors
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            // If validation fails, return 400 with error details
            return res.status(400).json({
                status: 'error',
                message: 'Validation failed',
                errors: errors.array()
            });
        }

        // If validation passes, continue to the next middleware/controller
        return next();
    };
};

export default requestValidationMiddleware;