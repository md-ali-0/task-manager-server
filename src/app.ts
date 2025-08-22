import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Application, NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import router from "./app/routes";
import config from "./config";

class App {
  public app: Application;

  constructor() {
    this.app = express();
    this.initializeMiddlewares();
    this.initializeRoutes();
    this.initializeErrorHandling();
  }

  private initializeMiddlewares(): void {
    this.app.use(
      cors({
        origin: [config.client_url as string, "http://localhost:3000"],
        credentials: true,
      })
    );
    this.app.use(cookieParser());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  private initializeRoutes(): void {
    this.app.get("/", (req: Request, res: Response) => {
      res.send({
        message: "Ecommerce Backend Running..",
      });
    });

    this.app.use("/api", router);
  }

  private initializeErrorHandling(): void {
    this.app.use(globalErrorHandler);

    this.app.use((req: Request, res: Response, _next: NextFunction) => {
      res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: "API NOT FOUND!",
        error: {
          path: req.originalUrl,
          message: "Your requested path is not found!",
        },
      });
    });
  }

  public getInstance(): Application {
    return this.app;
  }
}

export default App;
