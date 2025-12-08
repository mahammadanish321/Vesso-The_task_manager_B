import express from "express";
import cors from "cors"
import cookieparser from "cookie-parser"


const app = express();



app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))




app.use(express.json
    ({ limit: "16kb" }))

app.use(express.urlencoded
    ({ extended: true, limit: "16kb" }))

app.use(express.static("public"))

app.use(cookieparser())


import routes from "./routes/user.routes.js";
import taskRoutes from "./routes/task.routes.js";

app.use("/api/v1/users", routes)
app.use("/api/v1/task", taskRoutes)

export { app };