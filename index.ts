import express, { Request, Response } from 'express';
import bodyParser from "body-parser"
import mysql from "mysql2/promise";

const app = express();
app.use(bodyParser.json());
const port = 3000;


 
export const DB = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "rootpassword",
    database: "appdb",
    waitForConnections: true,
    connectionLimit: 10,
});


app.get('/', (req: Request, res: Response) => {
    res.send('Hello World with Express and TypeScript!');
});
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
