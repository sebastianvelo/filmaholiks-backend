import express from "express";

const setGlobalErrorHandling = (app: express.Application) => {
    app.use((req, res, next) => {
        res.status(404).json({ error: "Endpoint not found" });
    });

    app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
        console.error(err.stack);
        res.status(500).json({ error: "Something went wrong" });
    });
};

export default setGlobalErrorHandling;