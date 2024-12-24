import { RouterProvider } from "react-router";
import appRouter from "./routes/app.router";
import { CurrentUserProvider } from "./shared/CurrentUserProvider";

function App() {
    return (
        <CurrentUserProvider>
            <RouterProvider router={appRouter} />
        </CurrentUserProvider>
    );
}

export default App;
