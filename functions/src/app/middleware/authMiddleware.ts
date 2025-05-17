import { Request, Response, NextFunction } from 'express';
import * as admin from 'firebase-admin';

export const isAuthenticated = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ error: 'Unauthorized: No token provided' });
        }

        const token = authHeader.split('Bearer ')[1];

        try {
            const decodedToken = await admin.auth().verifyIdToken(token);
            req.user = decodedToken; 
            next();
        } catch (error) {
            return res.status(401).json({ error: 'Unauthorized: Invalid token' });
        }
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error during authentication' });
    }
};

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

export const checkOptionalResourceAccess = (resourceParamName: string) => (
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            req.hasAccess = false;

            const authHeader = req.headers.authorization;

            if (!authHeader || !authHeader.startsWith('Bearer ')) {
                return next();
            }

            const token = authHeader.split('Bearer ')[1];

            try {
                const decodedToken = await admin.auth().verifyIdToken(token);
                req.user = decodedToken;

                const resourceOwnerId = req.params[resourceParamName];

                if (req.user.uid === resourceOwnerId || req.user.role === 'admin') {
                    req.hasAccess = true;
                }

                next();
            } catch (error) {
                next();
            }
        } catch (error) {
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

declare global {
    namespace Express {
        interface Request {
            user?: admin.auth.DecodedIdToken;
            hasAccess?: boolean;
        }
    }
}