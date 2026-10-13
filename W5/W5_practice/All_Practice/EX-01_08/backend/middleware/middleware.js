// Middleware configuration
import cors from "cors";
import bodyParser from "body-parser";

export const setupMiddleware = (app) => {
  // CORS middleware - allow localhost:3000 -> backend localhost:5000
  app.use(cors());

  // Body parser middleware
  app.use(bodyParser.json());
};
