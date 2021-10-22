import { Method } from "axios";
import Request from "../../common/Request";

abstract class IMDbRequest extends Request {
    protected baseUrl: string = 'https://data-imdb1.p.rapidapi.com';
    protected headers: Record<string, string> = {
        'x-rapidapi-host': 'data-imdb1.p.rapidapi.com',
        'x-rapidapi-key': 'e4419d5558msh50e9beb850843b8p1f22d7jsn35a93edcbba7'
    };

}

export default IMDbRequest;