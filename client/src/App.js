import React from "react";

import NavBar from "./components/common/NavBar";
import Footer from "./components/common/Footer";

import { BrowserRouter } from "react-router-dom";

import { ColorModeContext, useMode } from "./theme";

import Router from "./router";

const App = () => {
    const [theme, colorMode] = useMode();
    return (
        <React.Fragment>
            <BrowserRouter>
                <NavBar />
                <ColorModeContext.Provider value={colorMode}>
                    <div id="main-content">
                        <Router />
                    </div>
                </ColorModeContext.Provider>
                <Footer />
            </BrowserRouter>
        </React.Fragment>
    );
};

// const NotFound = () => {
//   return <h1> Not found</h1>
// }
export default App;
