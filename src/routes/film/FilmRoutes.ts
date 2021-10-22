import express, { Request, Response } from 'express';
import MovieRequest from '../../api/imdb/request/film/movie/MovieRequest';
import CommonRoutesConfig from '../CommonRoutesConfig';

export class FilmRoutes extends CommonRoutesConfig {
    constructor(app: express.Application) {
        super(app, 'FilmRoutes');
    }

    configureRoutes() {
        this.app.route('hello').get((req: Request, res: Response) => {
            MovieRequest.upcoming({ page_size: 20 }).then(data => {
                res.send(data);
                console.log(data);
            });
        })
        return this.app;
    }

}