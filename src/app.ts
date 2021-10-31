import Application from './common/app/Application';

const PORT = process.env.PORT || 5000;
const application = new Application(PORT);
application.init();

export default application;