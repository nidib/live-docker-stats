import { app } from './app';

const SERVER_PORT = 8080;

app.listen(SERVER_PORT, () => {
	console.log(`Server listening on port ${SERVER_PORT}`);
});
