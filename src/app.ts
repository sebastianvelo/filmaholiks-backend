import express, { Request, Response } from 'express';
import MovieRequest from './api/imdb/request/film/movie/MovieRequest';

const PORT = process.env.PORT || 3000;
const app = express();

app.get('/hello', (req: Request, res: Response) => {
    MovieRequest.upcoming({ page_size: 20 }).then(data => {
        res.send(data);
        console.log(data);
    });
});


app.listen(PORT, () => console.log(`listening on port ${PORT}`));

