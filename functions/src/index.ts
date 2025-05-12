import * as functions from "firebase-functions";
import registerPaths from "registerPaths";
import Application from "./app/Application";

const PORT = process.env.PORT || 5000;

const application = new Application(PORT);
const app = functions.https.onRequest(application.init());

export default app;