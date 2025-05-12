import { Request, Response, NextFunction } from 'express';
import * as admin from 'firebase-admin';

// Middleware para verificar si el usuario está autenticado (versión original)
export const isAuthenticated = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ error: 'Unauthorized: No token provided' });
        }

        const token = authHeader.split('Bearer ')[1];

        try {
            const decodedToken = await admin.auth().verifyIdToken(token);
            req.user = decodedToken; // Añade el usuario decodificado a la request
            next();
        } catch (error) {
            return res.status(401).json({ error: 'Unauthorized: Invalid token' });
        }
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error during authentication' });
    }
};

// Middleware para verificar si el usuario tiene acceso a un recurso (versión original)
export const hasResourceAccess = (resourceParamName: string) => (
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            if (!req.user) {
                return res.status(401).json({ error: 'Unauthorized: Authentication required' });
            }

            const resourceOwnerId = req.params[resourceParamName];

            if (req.user.uid === resourceOwnerId || req.user.role === 'admin') {
                next();
            } else {
                return res.status(403).json({ error: 'Forbidden: Insufficient permissions' });
            }
        } catch (error) {
            return res.status(500).json({ error: 'Internal server error during authorization' });
        }
    }
);

// NUEVA FUNCIÓN: Middleware para verificar el acceso sin requerir autenticación previa
export const checkOptionalResourceAccess = (resourceParamName: string) => (
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            // Inicializar el resultado por defecto
            req.hasAccess = false;

            const authHeader = req.headers.authorization;

            // Si no hay token, simplemente continuamos sin acceso
            if (!authHeader || !authHeader.startsWith('Bearer ')) {
                return next();
            }

            const token = authHeader.split('Bearer ')[1];

            try {
                // Intentar verificar el token
                const decodedToken = await admin.auth().verifyIdToken(token);
                req.user = decodedToken;

                // Verificar si tiene acceso al recurso
                const resourceOwnerId = req.params[resourceParamName];

                if (req.user.uid === resourceOwnerId || req.user.role === 'admin') {
                    req.hasAccess = true;
                }

                next();
            } catch (error) {
                // Si el token es inválido, continuamos sin acceso
                next();
            }
        } catch (error) {
            // En caso de error del servidor, continuamos sin acceso en lugar de devolver un error
            console.error('Error checking optional resource access:', error);
            next();
        }
    }
);

export const detectAuthentication = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return next();
        }

        const token = authHeader.split('Bearer ')[1];

        try {
            const decodedToken = await admin.auth().verifyIdToken(token);
            req.user = decodedToken;
        } catch (error) {
            // Ignora errores de token
        }

        next();
    } catch (error) {
        next();
    }
};

// Ampliar la interfaz de Request para incluir el usuario y el estado de acceso
declare global {
    namespace Express {
        interface Request {
            user?: admin.auth.DecodedIdToken;
            hasAccess?: boolean;
        }
    }
}