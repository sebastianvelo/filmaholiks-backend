import { Request, Response } from "express";

export type Validator = (req: Request) => string | null;
/**
 * Decorator que ejecuta una función de validación sobre el Request antes de llamar al método.
 * Si la validación devuelve un string (mensaje de error), se responde con status 400 y no se llama al método.
 */
function ValidateRequest(validator: Validator) {
    return function (
        target: any,
        propertyKey: string,
        descriptor: PropertyDescriptor
    ) {
        const originalMethod = descriptor.value;
        descriptor.value = async function (req: Request, res: Response, ...args: any[]) {
            const errorMessage = validator(req);
            if (errorMessage) {
                return res.status(400).json({ error: errorMessage });
            }
            return originalMethod.apply(this, [req, res, ...args]);
        };
    };
}

export default ValidateRequest;