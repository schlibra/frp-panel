import {createBrowserRouter} from "react-router-dom";
import HomeView from "../views/HomeView.tsx";
import NodeListView from "../views/NodeListView.tsx";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <HomeView />,
    },
    {
        path: "/nodeList",
        element: <NodeListView />
    }
])
