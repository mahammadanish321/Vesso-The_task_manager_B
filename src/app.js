import express from "express";
import cors from "cors"
import cookieparser from "cookie-parser"


const app = express();


const allowedOrigins = process.env.CORS_ORIGIN
  ? process.env.CORS_ORIGIN.split(",")
  : [];
app.use(
  cors({
    origin: (origin, callback) => {
      // allow server-to-server & tools like Postman
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);
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



















// // app.js
// import express from "express";
// import cors from "cors";
// import cookieParser from "cookie-parser"; // note camelCase variable name

// const app = express();

// // use an explicit default for local dev.
// // IMPORTANT: make this exact to what the browser shows (protocol+host+port).
// const DEFAULT_FRONTEND = "http://127.0.0.1:3000";
// const FRONTEND_ORIGIN = process.env.CORS_ORIGIN || DEFAULT_FRONTEND;

// // If you might have multiple allowed origins, you can create a small whitelist function:
// // const whitelist = [process.env.CORS_ORIGIN, "http://localhost:3000"].filter(Boolean);
// // then use the function below in `cors` options.

// app.use(
//   cors({
//     origin: (incomingOrigin, callback) => {
//       // allow requests with no origin (like mobile apps, curl) or exact match
//       if (!incomingOrigin || incomingOrigin === FRONTEND_ORIGIN) {
//         return callback(null, true);
//       }
//       // otherwise block
//       callback(new Error("CORS policy: Origin not allowed"), false);
//     },
//     credentials: true, // allow cookies to be sent/received
//     methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
//     allowedHeaders: ["Content-Type", "Authorization"]
//   })
// );

// // Respond to preflight requests for all routes (explicitly)
// app.options("*", cors({ origin: FRONTEND_ORIGIN, credentials: true }));

// // body parsers
// app.use(express.json({ limit: "16kb" }));
// app.use(express.urlencoded({ extended: true, limit: "16kb" }));

// // static + cookies
// app.use(express.static("public"));
// app.use(cookieParser());

// // routes
// import routes from "./routes/user.routes.js";
// import taskRoutes from "./routes/task.routes.js";

// app.use("/api/v1/users", routes);
// app.use("/api/v1/task", taskRoutes);

// export { app };























// import express from "express";
// import cors from "cors";
// import cookieParser from "cookie-parser";

// const app = express();

// app.use(cors({
//   origin: process.env.CORS_ORIGIN,
//   credentials: true
// }));

// app.options("*", cors({
//   origin: process.env.CORS_ORIGIN,
//   credentials: true
// }));

// app.use(express.json({ limit: "16kb" }));
// app.use(express.urlencoded({ extended: true, limit: "16kb" }));
// app.use(express.static("public"));
// app.use(cookieParser());

// import routes from "./routes/user.routes.js";
// import taskRoutes from "./routes/task.routes.js";

// app.use("/api/v1/users", routes);
// app.use("/api/v1/task", taskRoutes);

// export { app };
