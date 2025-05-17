import { Request, Response, NextFunction } from "express";
import { ValidationChain, validationResult } from "express-validator";

/**
 * Middleware de validación que ejecuta cadenas de validación de express-validator
 * y maneja los errores de forma consistente.
 * 
 * @param validationChains - Array de cadenas de validación de express-validator
 * @returns Middleware de Express
 */
export const validate = (validationChains: ValidationChain[]) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            // Ejecutar todas las validaciones en paralelo
            await Promise.all(validationChains.map(chain => chain.run(req)));

            // Verificar si hay errores
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    status: "error",
                    errors: errors.array().map(err => ({
                        param: err.type,
                        msg: err.msg,
                    }))
                });
            }

            // Continuar con el siguiente middleware/controlador
            next();
        } catch (error) {
            console.error("Validation error:", error);
            return res.status(500).json({
                status: "error",
                message: "Internal validation error"
            });
        }
    };
};

export default validate;