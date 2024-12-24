import pagesRoutes from "./pages.routes";
import { createBrowserRouter } from "react-router-dom";

const appRouter = createBrowserRouter([...pagesRoutes]);

export default appRouter;
