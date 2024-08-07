// routes/Router.js
import { createBrowserRouter } from 'react-router-dom';
import Home from '../components/Home';
import Login from '../components/Auth/Login';
import SongList from '../components/MusicPlayer/SongList';
import Layout from './Layout';
import AboutPage from '../components/AboutPage';
import ProtectedRoute from '../routes/ProtectedRoute';
import NotFound from '../components/NotFound';

const Router = createBrowserRouter([
    {
        element: <Layout />,
        children: [
            {
                index: true,
                path: "/",
                element: <Home />,
            },
            {
                path: "login",
                element: <Login />,
            },
            {
                path: "songs",
                element: 
                     <SongList  />
            
            },
            {
                path: "about",
                element: <AboutPage />,
            },
        ],
    },
    {
        path: "*",
        element: <NotFound />,
    },
]);

export { Router };
