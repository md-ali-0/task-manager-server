import http from "http";
import App from "./app";
import config from "./config";

class Server {
  private server?: http.Server;
  private readonly port: number;

  constructor(port: number) {
    this.port = port;
  }

  public start(): void {
    const application = new App().getInstance();

    this.server = application.listen(this.port, () => {
      console.log(`🚀 Application is running on http://localhost:${this.port}`);
    });

    this.handleProcessEvents();
  }

  private handleProcessEvents(): void {
    const exitHandler = () => {
      if (this.server) {
        this.server.close(() => {
          console.info("Server closed!");
        });
      }
      process.exit(1);
    };

    process.on("uncaughtException", (error) => {
      console.error("Uncaught Exception:", error);
      exitHandler();
    });

    process.on("unhandledRejection", (error) => {
      console.error("Unhandled Rejection:", error);
      exitHandler();
    });
  }
}

const server = new Server(Number(config.port) || 5000);
server.start();
