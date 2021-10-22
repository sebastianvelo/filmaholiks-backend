export interface IMDbEntity {
    imdb_id: string;
}

export interface Actor extends IMDbEntity {
    name: string;
}

export interface Film extends IMDbEntity {
    title: string;
}

export interface Role {
    role: string;
    actor: Actor;
}

export interface Genre {
    id: number;
    genre: string;
}

export interface Award {
    movie: Film;
    series: Film;
    actor: Actor[];
    event_name: string;
    year: number;
    type: string;
    award_name: string;
    award: string;
}