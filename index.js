import "dotenv/config.js";
import { connectToDB } from "./src/DB/index.js";
import { app } from "./src/app.js";

connectToDB()
    .then(() => {
        app.on("error", (error) => {
            console.log(`Server ran into a Error: ${error}`);
        });
        app.listen(process.env.PORT || 3000, () => {
            console.log(`Server is running on: ${process.env.PORT || 3000}`);
        });
    })
    .catch((err) => {
        console.log(`Application couldnt connect to DB: ${err}`);
    });
