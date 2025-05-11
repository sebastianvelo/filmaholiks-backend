import cors from "cors";
import express from "express";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import Logger from "../../log/Logger";

const setMiddlewares = (app: express.Application) => {
    // Configuración básica
    app.use(express.json());
    app.use(cors());

    // Middleware de seguridad
    app.use(helmet()); // Mejora la seguridad con encabezados HTTP adecuados

    // Limitador de tasa para prevenir ataques de fuerza bruta
    const limiter = rateLimit({
        windowMs: 15 * 60 * 1000, // 15 minutos
        max: 100, // límite de 100 solicitudes por ventana
        standardHeaders: true,
        legacyHeaders: false,
    });
    app.use(limiter);

    // Logging
    app.use(Logger);
};

export default setMiddlewares;