import 'module-alias/register';
import * as functions from "firebase-functions";
import Application from "./app/NApplication";
import controllers from '@app/controller/controllers';

const application = new Application(controllers);
const app = functions.https.onRequest(application.start());

export default app;