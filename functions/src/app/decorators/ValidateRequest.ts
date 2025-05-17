/* eslint-disable func-names */
/* eslint-disable no-param-reassign */
import { Request, Response } from "express";
import { ValidationChain, validationResult } from "express-validator";

type AsyncFunction = (...args: any[]) => Promise<any>;

/**
 * Decorator que ejecuta cadenas de validación de express-validator en el Request
 * antes de llamar al método decorado.
 * 
 * @param validationChains - Array de cadenas de validación de express-validator
 * @returns Descriptor de método modificado que incluye validación
 */
function ValidateRequest(validationChains: ValidationChain[]) {
    return function (
        target: any,
        propertyKey: string,
        descriptor: PropertyDescriptor
    ) {
        // Guardamos referencia al método original
        const originalMethod = descriptor.value as AsyncFunction;

        // Reemplazamos el método con nuestra versión que incluye validación
        descriptor.value = async function (req: Request, res: Response, ...args: any[]) {
            try {
                // Ejecutamos cada cadena de validación
                await Promise.all(validationChains.map(chain => chain.run(req)));

                // Verificamos si hay errores después de ejecutar todas las validaciones
                const errors = validationResult(req);

                if (!errors.isEmpty()) {
                    // Si hay errores, respondemos con 400 y la lista de errores
                    return res.status(400).json({
                        status: "error",
                        errors: errors.array().map(err => ({
                            param: err.type,
                            msg: err.msg,
                        }))
                    });
                }

                // Si no hay errores, ejecutamos el método original
                return await originalMethod.apply(this, [req, res, ...args]);
            } catch (error) {
                // En caso de error en la validación misma
                console.error("Validation error:", error);
                return res.status(500).json({
                    status: "error",
                    message: "Internal validation error"
                });
            }
        };

        return descriptor;
    };
}

export default ValidateRequest;