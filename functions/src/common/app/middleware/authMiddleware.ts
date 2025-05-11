import { Request, Response, NextFunction } from 'express';
import * as admin from 'firebase-admin';

// Middleware para verificar si el usuario está autenticado
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

// Middleware para verificar si el usuario tiene acceso a un recurso específico
export const hasResourceAccess = (resourceParamName: string) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            if (!req.user) {
                return res.status(401).json({ error: 'Unauthorized: Authentication required' });
            }

            const resourceOwnerId = req.params[resourceParamName];

            // Si el usuario es el dueño del recurso o tiene rol de admin
            if (req.user.uid === resourceOwnerId || req.user.role === 'admin') {
                next();
            } else {
                return res.status(403).json({ error: 'Forbidden: Insufficient permissions' });
            }
        } catch (error) {
            return res.status(500).json({ error: 'Internal server error during authorization' });
        }
    };
};

// Ampliar la interfaz de Request para incluir el usuario
declare global {
    namespace Express {
        interface Request {
            user?: admin.auth.DecodedIdToken;
        }
    }
}