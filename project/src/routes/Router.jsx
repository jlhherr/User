
import { createBrowserRouter } from 'react-router-dom';
import Home from '../components/Home';
import Login from '../components/Auth/Login';
import SongList from '../components/MusicPlayer/SongList';
import Layout from './Layout';
import Profile from '../components/Auth/Profile';
import ProtectedRoute from './ProtectedRoute';
import NotFound from '../components/NotFound';

const Router = createBrowserRouter([
    {
        element: <Layout />,
        children: [
            {
                index: true, 
                //path: "/",
                element: <Home />,
            },
            {
                path: "login",
                element: <Login />,
            },
            {
                path: "songs",
                element: (
                    <ProtectedRoute>
                        <SongList />
                    </ProtectedRoute>
                ),
            },
            {
                path: "profile",
                element: <Profile />,
            },
        ],
    },
    {
        path: "*",
        element: <NotFound />,
    },
]);

export  {Router};
