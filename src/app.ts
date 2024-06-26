import * as express from "express";
import { Request, Response } from "express";
import { userRouter } from "./routes/user.routes";
import { templatesRouter } from "./routes/templates.routes";
import { errorHandler } from "./middleware/errorHandler";
import "reflect-metadata";

const app = express();

app.use(express.json());
app.use(errorHandler);

app.use('/auth', userRouter);
app.use('/templates', templatesRouter);

app.get("*", (req: Request, res: Response) => {
    res.status(505).json({message: "Bad request"});
});

export {app};

