import { Request, Response } from "express";

export type HTTPVerb = "get" | "post" | "put" | "delete" | "patch" | "head" | "options" | "all";

export type Route = {
    path: string;
    method: HTTPVerb;
};

export type EndpointMethod = (req: Request, res: Response) => Promise<any>;

export type EndpointErrorReason = {
    [key: string]: string;
}

export type EndpointRoutes<T> = {
    [K in keyof T]: Route;
}

export type ErrorMessage<T> = {
    [K in keyof T]: EndpointErrorReason;
};

export type ControllerRoutes<T> = {
    basePath: string;
    endpointRoutes: EndpointRoutes<T>;
};

export type ControllerEndpoints<T> = {
    [K in keyof T]: EndpointMethod;
};

export type ControllerMiddlewares<T> = {
    [K in keyof T]: any[];
};

export type HTTPMethod = {
    at: (path?: string) => { use: (endpoint: EndpointMethod, middlewares: any[]) => void };
};

