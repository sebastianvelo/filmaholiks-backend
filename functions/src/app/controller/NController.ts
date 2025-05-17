import { ControllerEndpoints, ControllerMiddlewares, ControllerRoutes, HTTPVerb, Route } from "@app/common";

abstract class Controller<I> {
    protected abstract endpoints: ControllerEndpoints<I>;
    protected abstract middlewares: ControllerMiddlewares<I>;
    protected abstract routes: ControllerRoutes<I>;

    getEndpoints() {
        return Object.entries(this.routes.endpointRoute).map((entry: [string, any]) => {
            const functionName = entry[0] as keyof typeof this.routes.endpointRoute;
            const endpointRoute = entry[1] as Route;
            return {
                method: endpointRoute.method.toLowerCase() as HTTPVerb,
                path: this.routes.basePath + endpointRoute.path,
                endpoint: this.endpoints[functionName],
                middleware: this.middlewares[functionName]
            }
        });
    }

}

export default Controller;