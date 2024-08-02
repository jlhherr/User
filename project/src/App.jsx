

/*import useTheme from "./hooks/useTheme";
import Navbar from "./components/Navbar";
import FooterBar from "./components/FooterBar";
import SongList from "./components/MusicPlayer/SongList";

import ThemeContext from "./contexts/ThemeContext";

import LoginPage from "./components/Auth/LoginPage";
import { useAuth } from "./contexts/AuthContext";
import { useState, useEffect } from "react";

function App() {
    const [theme, toggleTheme] = useTheme();

    const { isAuthenticated, token } = useAuth("state");

    const [currentPath, setCurrentPath] = useState(window.location.pathname);

    useEffect(() => {
       if (isAuthenticated) {
         setCurrentPath("/songs");
      } else {
           setCurrentPath("/login");
       }
    }, [isAuthenticated]);

    console.log("Authenticated:", isAuthenticated);
    console.log("Token", token);

    
  
  return (
        <div className={`hero is-fullheight is-flex is-flex-direction-column`}>
            <ThemeContext.Provider value={{ theme, toggleTheme }}>
                <Navbar appName={"hARMONYhUB"} />
                <div className={`container`}>

                    {currentPath === "/Home" ? <LoginPage /> : <SongList />}
                </div>
                <FooterBar
                    appName={"React Examples"}
                    socialNetworks={[
                        { name: "facebook", url: "https://facebook.com" },
                        { name: "twitter", url: "https://twitter.com" },
                        { name: "instagram", url: "https://instagram.com" },
                    ]}
                />
            </ThemeContext.Provider>
        </div>
    );
}

export default App;*/


/*import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import useTheme from "./hooks/useTheme";
import Navbar from "./components/Navbar";
import FooterBar from "./components/FooterBar";
import SongList from "./components/MusicPlayer/SongList";
import LoginPage from "./components/Auth/LoginPage";
import ThemeContext from "./contexts/ThemeContext";
import { useAuth } from "./contexts/AuthContext";

import Home from "./components/Home";
function App() {
    const [theme, toggleTheme] = useTheme();
    const { isAuthenticated } = useAuth("state");

    return (
        <Router>
            <ThemeContext.Provider value={{ theme, toggleTheme }}>
                <div className={`hero is-fullheight is-flex is-flex-direction-column`}>
                    <Navbar appName={"Harmoni-hub"} />
                    <div className={`container`}>
                        <Routes>
                            <Route path="/" element={<Navigate to={isAuthenticated ? "/login" : "/songs"} />} />
                            <Route path="/login" element={<LoginPage />} />
                            <Route path="/songs" element={<SongList />} />
                            <Route path="/home" element={<Home/>} />
                            {/* Agrega otras rutas aquí */
                        /*}
                        </Routes>
                    </div>
                    <FooterBar
                        appName={"React Examples"}
                        socialNetworks={[
                            { name: "facebook", url: "https://facebook.com" },
                            { name: "twitter", url: "https://twitter.com" },
                            { name: "instagram", url: "https://instagram.com" },
                        ]}
                    />
                </div>
            </ThemeContext.Provider>
        </Router>
    );
}

export default App;*/
