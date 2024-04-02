import http from 'http';
import app from './App/app.js';



// create the server
// npm run start

const PORT = process.env.PORT ;
const server = http.createServer(app);
server.listen(PORT, console.log(`Server is running on ${PORT}`));
