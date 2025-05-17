import 'module-alias/register';
import * as functions from "firebase-functions";
import controllers from '@app/controller/controllers';
import Application from "./app/Application";

const application = new Application(controllers);
const app = functions.https.onRequest(application.start());

export default app;