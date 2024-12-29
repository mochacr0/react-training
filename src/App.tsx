import { RouterProvider } from "react-router";
import appRouter from "./routes/app.router";
import { CurrentUserProvider } from "./shared/CurrentUserProvider";
import { Provider } from "react-redux";
import { store } from "./redux/store";

function App() {
    return (
        <Provider store={store}>
            <CurrentUserProvider>
                <RouterProvider router={appRouter} />
            </CurrentUserProvider>
        </Provider>
    );
}

export default App;
