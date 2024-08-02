import React from "react";
import { Outlet } from "react-router-dom";
import ThemeContext from "../contexts/ThemeContext";
import useTheme from "../hooks/useTheme";
import Navbar from "../components/Navbar";
import FooterBar from "../components/FooterBar";
import { AuthProvider } from "../contexts/AuthContext";

export default function Layout() {
    const [theme, toggleTheme] = useTheme();

    return (
        <AuthProvider>
            <div
                className={`hero is-fullheight is-flex is-flex-direction-column`}
            >
                <ThemeContext.Provider value={{ theme, toggleTheme }}>
                    <Navbar appName={"React Examples"} />
                    <div className={`container`}>
                        <Outlet />
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
        </AuthProvider>
    );
}

/*import React from "react";
import { Outlet } from "react-router-dom";
import  AuthProvider  from "../contexts/AuthContext";
import ThemeContext from "../contexts/ThemeContext";


export default function Layout() {
    return (
        <AuthProvider>
            <div
                className={`hero is-fullheight is-flex is-flex-direction-column`}
            >
                <ThemeContext>
                    <Outlet />
                </ThemeContext>
            </div>
        </AuthProvider>
    );
}*/