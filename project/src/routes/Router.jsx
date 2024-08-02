import React from "react";
import { createBrowserRouter } from "react-router-dom";
import LoginPage from "../components/Auth/LoginPage";
import SongList from "../components/MusicPlayer/SongList";
import Layout from "./Layout";
import AboutPage from "../components/AboutPage";
import ProtectedRoute from "./ProtectedRoute";
import NotFound from "../components/NotFound";
import Home from "../components/Home";
import Profile from "../components/Auth/Profile";

const Router = createBrowserRouter(
    [
        {
            element: <Layout />,
            children: [
                {
                    path: "/",
                    element: <Home />,
                },
                {

                

                path: "login",
                element: <LoginPage />,
            },
            {
                path: "songs",
                element: <SongList />,
            },
            {
                path: "profile",
                element: (
                    <ProtectedRoute>
                        <Profile />
                    </ProtectedRoute>
                ),
            },
            {
                path: "aboutPage",
                element: <AboutPage />,
                },
               
        ],
    },
    {
        path: "*",
        element: <NotFound/>,
    },
]);
export { Router };