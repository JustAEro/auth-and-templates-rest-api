import * as express from "express";
import { TemplatesController } from "../controllers/templates.controller";
const Router = express.Router();

Router.get(
    "/get-pdf",
    TemplatesController.getPdf
);

export { Router as templatesRouter };