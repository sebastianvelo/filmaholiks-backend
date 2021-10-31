import * as functions from "firebase-functions";
import Application from "./common/app/Application";

const PORT = process.env.PORT || 5000;
const application = new Application(PORT);
const app = functions.https.onRequest(application.init());

export default app;