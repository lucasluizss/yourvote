import app from './src/';
import http from 'http';

const port = process.env.PORT || 3333;

const server = http.createServer(app);

server.listen(port, () => console.log(`🚀 Server is running on ${port}!`));
