import {createBrowserRouter, RouterProvider} from "react-router-dom";
import HomeView from "../views/HomeView.tsx";

export default function Router() {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <HomeView />
        }
    ])
    return <>
        <RouterProvider router={router} />
    </>
}