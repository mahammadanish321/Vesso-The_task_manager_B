import dotenv from "dotenv";
import connectDB from "./db/index.js";
import { app } from "./app.js";



dotenv.config({
    path: './.env'
});

const port = process.env.PORT || 8000;

connectDB()

    .then(() => {
        app.listen(port, () => {
            // console.log(`\nServer is running at http://localhost:${port}`);
        })

        
    })
    .catch((error) => {
        console.log(`mongoDB connetion feld:${error}`);
        process.exit(1);
    })





