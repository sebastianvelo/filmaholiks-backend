import express from 'express';
import * as http from 'http';

const setServer = (app: express.Application, port: number | string) => {
    const server: http.Server = http.createServer(app);
    server.listen(port, () => {
        console.log(`Server running at http://localhost:${port}`);
    });
}

export default setServer;