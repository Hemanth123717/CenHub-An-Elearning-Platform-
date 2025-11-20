import React, { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'

const ServerLayout = () => {
    const location = useLocation();

    useEffect(() => {
        const root = document.getElementById("root");
        if (location.pathname === "/") {
            document.body.className = "body";
            root.className = "homeRoot";

        } else if (location.pathname === "/login" || location.pathname === "/register") {
            document.body.className = "loginBody";
        } else {
            document.body.className = "";
        }
    }, [location.pathname]);

    return <Outlet />;
}

export default ServerLayout