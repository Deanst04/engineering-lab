import express from "express";
import cors from "cors";
import routes from "./routes/index.routes";
import notFound from "./middlewares/errors/not-found.middleware";
import globalError from "./middlewares/errors/global-error.middleware";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", routes);

app.use(notFound);
app.use(globalError);

export default app;